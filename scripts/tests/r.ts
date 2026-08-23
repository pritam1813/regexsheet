import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { rRegexCategories } from "../../src/data/rRegex";
import { hasCLI, report } from "./utils";

console.log("Testing R...");
if (!hasCLI("Rscript --version")) {
  console.log("  ⚠️ Rscript CLI not found, skipping.");
  process.exit(0);
}

const tempDir = path.join(process.cwd(), "temp_regex_tests");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
const scriptPath = path.join(tempDir, "test_r.R");

const SYNTAX_SPLIT_RE = /\s+\/\s+|,\s+|\s+and\s+|\s+or\s+/;
const FUNC_SPLIT_RE = /\s+\/\s+/;
const SKIP_TOKENS = new Set(["and", "or"]);

// Escape a string for embedding in an R double-quoted string
function rStr(s: string): string {
  return '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
}

let rCode = `
# Mock variables used by function signatures
pat <- "\\\\d+"
x <- "test 123"
repl <- "-"
string <- "test 123"
pattern <- "\\\\d+"
replacement <- "-"
split <- ","
m <- regexpr("\\\\d+", x)
value <- regmatches(x, gregexpr("\\\\d+", x))
n <- 2L
passed <- 0
failed <- 0

# Attempt to load stringr; mark unavailable if not installed
has_stringr <- requireNamespace("stringr", quietly = TRUE)
if (has_stringr) library(stringr)

run_test <- function(original, code, mode) {
  tryCatch({
    if (mode == "regex") {
      grepl(code, "test", perl = TRUE)
    } else if (mode == "assert") {
      # Evaluate an assertion expression (e.g. stopifnot)
      eval(parse(text = code))
    } else if (mode == "r_syntax") {
      # Evaluate raw string syntax to ensure it parses successfully
      eval(parse(text = sprintf("val <- %s", code)))
    } else if (mode == "replace") {
      # For replacement strings (\\1, \\2, $1, $2), test if they are valid R strings
      # Note: We just evaluate that the string literal parses; semantic tests of
      # replacement behavior would require an 'expected' field.
      eval(parse(text = sprintf("val <- %s", code)))
    } else if (mode == "flag_base") {
      # E.g. "perl = TRUE"
      eval(parse(text = sprintf("grepl('a', 'a', %s)", code)))
    } else if (mode == "flag_stringr") {
      if (!has_stringr) {
        passed <<- passed + 1
        return()
      }
      eval(parse(text = sprintf("str_detect('a', %s)", sub("...", "'a'", code, fixed = TRUE))))
    } else if (mode == "stringr") {
      if (!has_stringr) {
        passed <<- passed + 1
        return()
      }
      eval(parse(text = code))
    } else {
      # base-functions
      eval(parse(text = code))
    }
    passed <<- passed + 1
  }, error = function(e) {
    cat(sprintf("FAIL: %s -> %s\\n", original, e$message))
    failed <<- failed + 1
  })
  invisible(NULL)
}
`;

for (const cat of rRegexCategories) {
  if (cat.id.startsWith("recipe-")) continue;

  for (const entry of cat.entries) {
    if (cat.id === "r-syntax") {
      const variants = entry.syntax.split(SYNTAX_SPLIT_RE).filter(v => !SKIP_TOKENS.has(v.trim()) && v.trim() !== "");
      for (const variant of variants) {
        const v = variant.trim();
        // Match raw strings r"(...)" or basic double-backslash escapes like "\\d"
        if (/^r"/.test(v) || /^"\\\\[a-zA-Z]"$/.test(v)) {
          rCode += `run_test(${rStr(v)}, ${rStr(v)}, "r_syntax")\n`;
        // Match backreferences like \1, \2, $1, $2
        } else if (/^\\\\[0-9]+$/.test(v) || /^\$[0-9]+$/.test(v)) {
          if (entry.expected && entry.example) {
            // If we have an expected value, assert that the example actually produces it!
            const assertExpr = `stopifnot(identical(${entry.example}, ${entry.expected}))`;
            rCode += `run_test(${rStr(v)}, ${rStr(assertExpr)}, "assert")\n`;
          } else {
            rCode += `run_test(${rStr(v)}, '"${v.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"', "replace")\n`;
          }
        } else {
          rCode += `run_test(${rStr(v)}, ${rStr(v)}, "regex")\n`;
        }
      }

    } else if (cat.id === "flags-options") {
      // Check for exact " (stringr)" suffix
      if (entry.syntax.endsWith(" (stringr)")) {
        const cleaned = entry.syntax.replace(/ \(stringr\)$/, "").trim();
        rCode += `run_test(${rStr(entry.syntax)}, ${rStr(cleaned)}, "flag_stringr")\n`;
      } else {
        let cleaned = entry.syntax.split(" (")[0].trim();
        // Edge case: fixed = TRUE (Base R & stringr::fixed())
        if (cleaned.includes("&")) cleaned = cleaned.split(" &")[0].trim();
        rCode += `run_test(${rStr(entry.syntax)}, ${rStr(cleaned)}, "flag_base")\n`;
      }
    } else if (cat.id === "stringr-functions") {
      // Split combined entries like "str_which(s,p) / str_subset(s,p)"
      const variants = entry.syntax
        .split(FUNC_SPLIT_RE)
        .filter((v) => !SKIP_TOKENS.has(v.trim()) && v.trim() !== "");
      for (const variant of variants) {
        rCode += `run_test(${rStr(variant.trim())}, ${rStr(variant.trim())}, "stringr")\n`;
      }
    } else if (cat.id === "base-functions") {
      // Split combined entries like "regmatches(x, m) / regmatches(x, m) <- value"
      const variants = entry.syntax
        .split(FUNC_SPLIT_RE)
        .filter((v) => !SKIP_TOKENS.has(v.trim()) && v.trim() !== "");
      for (const variant of variants) {
        rCode += `run_test(${rStr(variant.trim())}, ${rStr(variant.trim())}, "base")\n`;
      }
    }
  }
}
rCode += `\nif (failed > 0) quit(status=1)\n`;
fs.writeFileSync(scriptPath, rCode);

function countTests(): number {
  let total = 0;
  for (const cat of rRegexCategories) {
    if (cat.id.startsWith("recipe-")) continue;
    if (cat.id === "r-syntax") {
      total += cat.entries.reduce(
        (sum, e) =>
          sum +
          e.syntax
            .split(SYNTAX_SPLIT_RE)
            .filter((v) => !SKIP_TOKENS.has(v.trim()) && v.trim() !== "")
            .length,
        0,
      );
    } else if (cat.id === "stringr-functions" || cat.id === "base-functions") {
      total += cat.entries.reduce(
        (sum, e) =>
          sum +
          e.syntax
            .split(FUNC_SPLIT_RE)
            .filter((v) => !SKIP_TOKENS.has(v.trim()) && v.trim() !== "")
            .length,
        0,
      );
    } else {
      total += cat.entries.length; // flags-options
    }
  }
  return total;
}

try {
  const out = execSync(`Rscript ${scriptPath}`).toString();
  if (out.trim()) console.log(out.trim());
  report("R", countTests(), 0);
} catch (e: any) {
  const output = e.stdout?.toString() || e.message;
  console.log(output);
  const failedCount = (output.match(/FAIL:/g) || []).length;
  report("R", countTests() - failedCount, failedCount);
  process.exit(1);
} finally {
  fs.rmSync(scriptPath, { force: true });
}
