import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { perlRegexCategories } from "../../src/data/perlRegex";
import { hasCLI, report } from "./utils";

console.log("Testing Perl...");
if (!hasCLI("perl --version")) {
  console.log("  ⚠️ Perl CLI not found, skipping.");
  process.exit(0);
}

const tempDir = path.join(process.cwd(), "temp_regex_tests");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
const scriptPath = path.join(tempDir, "test_perl.pl");

let plCode = `
my $str = "test string";
my $pat = qr/\\d+/;
my $repl = "-";
my $passed = 0;
my $failed = 0;

sub run_test {
    my ($original, $code, $is_regex) = @_;
    
    # Intercept generic documentation pseudo-code and provide a compilable equivalent
    if ($code eq '$str =~ s/pattern/replacement/flags') {
        $code = '$str =~ s/pattern/replacement/ig';
    } elsif ($code eq '$str =~ tr/SEARCH/REPLACE/flags') {
        $code = '$str =~ tr/A/B/d';
    } elsif ($code eq 'qr/pattern/flags') {
        $code = 'qr/pattern/i';
    } elsif ($code eq 'split(/pattern/, $str [, limit])') {
        $code = 'split(/pattern/, $str, 2)';
    } elsif ($code eq '$1, $2, $3 ...') {
        $code = '$1';
    } elsif (index($code, '$& (or') == 0) {
        $code = '$&';
    } elsif (index($code, '$' . chr(96) . ' and $') == 0) {
        $code = '$' . chr(96);
    } elsif (index($code, '$+ (or') == 0) {
        $code = '$+';
    }

    # Intercept dependent regex fragments
    if ($code eq '\\g{1}') { $code = '(a)\\g{1}'; }
    elsif ($code eq '\\g{-1}') { $code = '(a)\\g{-1}'; }
    elsif ($code eq '\\g{name}') { $code = '(?<name>a)\\g{name}'; }
    elsif ($code eq '\\k<name>') { $code = '(?<name>a)\\k<name>'; }
    elsif ($code eq '(?>pattern)') { $code = '(?>pattern)'; }
    elsif ($code eq '*+') { $code = 'a*+'; }
    elsif ($code eq '++') { $code = 'a++'; }
    elsif ($code eq '?+') { $code = 'a?+'; }
    elsif ($code eq '(?|pattern1|pattern2)') { $code = '(?|a|b)'; }
    elsif ($code eq '(?(condition)yes-pattern|no-pattern)') { $code = '(?(1)yes|no)'; }
    elsif ($code eq '(?R)') { $code = '(?R)'; }
    elsif ($code eq '(?0)') { $code = '(?0)'; }
    elsif ($code eq '(?1)') { $code = '((?1))'; }
    elsif ($code eq '(?&name)') { $code = '(?<name>(?&name))'; }
    elsif ($code eq '(*SKIP)(*FAIL)') { $code = '(*SKIP)(*FAIL)'; }
    elsif ($code eq '(*SKIP)(*F)') { $code = '(*SKIP)(*F)'; }
    elsif ($code eq '(?{ code })') { $code = '(?{ 1 })'; }
    elsif ($code eq '(??{ code })') { $code = '(??{ "a" })'; }
    elsif ($code eq '\\P{Property}') { $code = '\\P{L}'; }

    eval {
        if ($is_regex == 1) {
            eval 'use re "eval"; qr{' . $code . '};';
            die $@ if $@;
        } elsif ($is_regex == 2) {
            my $flag = $code;
            $flag =~ s{^/}{}; # strip leading slash
            # /g is only valid on m//, /e and /r are only valid on s///
            if ($flag eq 'g') {
                eval '"test" =~ m{test}g';
            } elsif ($flag eq 'e') {
                eval '$str =~ s{test}{"ok"}e';
            } elsif ($flag eq 'r') {
                eval '$str =~ s{test}{ok}r';
            } else {
                eval "qr{test}$flag";
            }
            die $@ if $@;
        } else {
            eval $code;
            die $@ if $@;
        }
    };
    if ($@) {
        print "FAIL: $original -> $@\\n";
        $failed++;
    } else {
        $passed++;
    }
}
`;

// Categories that contain regex fragments to compile with qr{}
const REGEX_FRAGMENT_CATS = new Set(["advanced-constructs", "character-classes"]);
// Category that contains flags to test as modifiers
const FLAG_CATS = new Set(["regex-modifiers"]);
// Categories whose syntax is executable Perl code (eval as-is)
const CODE_CATS = new Set(["pattern-operators", "special-variables"]);

// Split delimiters: " / ", ", ", " and ", " or "
const SPLIT_RE = /\s+\/\s+|,\s+|\s+and\s+|\s+or\s+/;
const SKIP_TOKENS = new Set(["and", "or"]);

for (const cat of perlRegexCategories) {
  // Skip recipe categories — they are full Perl programs, not snippets
  if (cat.id.startsWith("recipe-")) continue;

  for (const entry of cat.entries) {
    const safeStr = "'" + entry.syntax.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";

    if (REGEX_FRAGMENT_CATS.has(cat.id)) {
      // Split combined doc strings like "\g{1}, \g{-1}, \g{name}, \k<name>"
      const variants = entry.syntax.split(SPLIT_RE).filter(v => !SKIP_TOKENS.has(v.trim()) && v.trim() !== "");
      for (const variant of variants) {
        const safeVar = "'" + variant.trim().replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
        plCode += `run_test(${safeVar}, ${safeVar}, 1);\n`;
      }
    } else if (FLAG_CATS.has(cat.id)) {
      // Split combined entries like "/x and /xx", "/a and /aa"
      const variants = entry.syntax.split(SPLIT_RE).filter(v => !SKIP_TOKENS.has(v.trim()) && v.trim() !== "");
      for (const variant of variants) {
        const safeVar = "'" + variant.trim().replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
        plCode += `run_test(${safeVar}, ${safeVar}, 2);\n`;
      }
    } else if (CODE_CATS.has(cat.id)) {
      plCode += `run_test(${safeStr}, ${safeStr}, 0);\n`;
    }
    // else: unknown category — skip silently
  }
}
plCode += `\nexit($failed);\n`;
fs.writeFileSync(scriptPath, plCode);

function countTests(): number {
  let total = 0;
  for (const cat of perlRegexCategories) {
    if (cat.id.startsWith("recipe-")) continue;
    if (REGEX_FRAGMENT_CATS.has(cat.id)) {
      total += cat.entries.reduce(
        (sum, e) => sum + e.syntax.split(SPLIT_RE).filter(v => !SKIP_TOKENS.has(v.trim()) && v.trim() !== "").length,
        0,
      );
    } else if (FLAG_CATS.has(cat.id)) {
      total += cat.entries.reduce(
        (sum, e) => sum + e.syntax.split(SPLIT_RE).filter(v => !SKIP_TOKENS.has(v.trim()) && v.trim() !== "").length,
        0,
      );
    } else if (CODE_CATS.has(cat.id)) {
      total += cat.entries.length;
    }
  }
  return total;
}

try {
  const out = execSync(`perl ${scriptPath}`).toString();
  if (out.trim()) console.log(out.trim());
  report("Perl", countTests(), 0);
} catch (e: any) {
  const output = e.stdout?.toString() || e.message;
  console.log(output);
  const failedCount = (output.match(/FAIL:/g) || []).length;
  report("Perl", countTests() - failedCount, failedCount);
  process.exit(1);
} finally {
  fs.rmSync(scriptPath, { force: true });
}
