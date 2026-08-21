import type { RegexCategory, NavCard } from "./regex";

export interface PerlRecipe {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const perlRegexCategories: RegexCategory[] = [
  {
    id: "pattern-operators",
    title: "Pattern Binding & Regex Operators",
    entries: [
      {
        syntax: "$str =~ /pattern/",
        description:
          "Pattern binding match operator — tests if $str matches regular expression (returns true/false in scalar context)",
        example: 'if ($email =~ /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$/i) { ... }',
        tryPattern: null,
      },
      {
        syntax: "$str !~ /pattern/",
        description:
          "Negative pattern binding match operator — returns true if $str does NOT match regular expression",
        example: 'if ($password !~ /\\d/) { die "Password needs a digit"; }',
        tryPattern: null,
      },
      {
        syntax: "$str =~ s/pattern/replacement/flags",
        description:
          "Substitution operator — replaces matched pattern with replacement string (flags: /g, /i, /e, /r)",
        example: '$text =~ s/\\bapple\\b/orange/gi;',
        tryPattern: null,
      },
      {
        syntax: "$str =~ tr/SEARCH/REPLACE/flags",
        description:
          "Transliteration operator (synonym: y///) — translates all characters in search list to replace list (/d delete, /s squash, /c complement)",
        example: '$dna =~ tr/atcg/tagc/; # Transliterate DNA bases',
        tryPattern: null,
      },
      {
        syntax: "qr/pattern/flags",
        description:
          "Quote regex operator — compiles pattern and flags into a reusable, pre-compiled Regexp object",
        example: 'my $rx = qr/\\b[A-Z]{3}-\\d{4}\\b/i;',
        tryPattern: null,
      },
      {
        syntax: "split(/pattern/, $str [, limit])",
        description:
          "Splits $str into a list of substrings separated by delimiter matches",
        example: 'my @fields = split(/[,;]\\s*/, $csv_line);',
        tryPattern: null,
      },
      {
        syntax: "my @matches = ($str =~ /pattern/g)",
        description:
          "List context match with /g flag — returns all captured groups or full matches as a list",
        example: 'my @words = ($text =~ /\\b\\w+\\b/g);',
        tryPattern: null,
      },
      {
        syntax: "while ($str =~ /pattern/g) { ... }",
        description:
          "Scalar context match in while loop — iterates match by match through string, tracking offset via pos($str)",
        example: 'while ($log =~ /(\\d{4}-\\d{2}-\\d{2})/g) { say "Found date at " . pos($log); }',
        tryPattern: null,
      },
    ],
  },
  {
    id: "special-variables",
    title: "Special Regex Variables & Pointers",
    entries: [
      {
        syntax: "$1, $2, $3 ...",
        description:
          "Contains the text captured by the 1st, 2nd, 3rd parenthesized capturing group from last successful match",
        example: 'if ($str =~ /(\\w+):(\\d+)/) { my ($k, $v) = ($1, $2); }',
        tryPattern: null,
      },
      {
        syntax: "$& (or ${^MATCH})",
        description:
          "The entire string matched by the last successful pattern (use /p flag or ${^MATCH} to avoid performance penalty)",
        example: '$str =~ /\\d+/; say "Matched: $&";',
        tryPattern: null,
      },
      {
        syntax: "$` and $' (or ${^PREMATCH}, ${^POSTMATCH})",
        description:
          "The string preceding ($`) and following ($') the last successful match",
        example: '$str =~ /:/; say "Before: $`, After: $\'";',
        tryPattern: null,
      },
      {
        syntax: "$+ (or ${^LAST_PAREN_MATCH})",
        description:
          "Returns the text matched by the highest-numbered (last) capturing group",
        example: '$str =~ /(foo)|(bar)|(baz)/; say "Last: $+";',
        tryPattern: null,
      },
      {
        syntax: "%+ and %-",
        description:
          "Hashes holding named capture groups: $+{name} contains captured text; $-{name} contains arrayref of all captures for that name",
        example: 'if ($str =~ /(?<year>\\d{4})-(?<month>\\d{2})/) { say $+{year}; }',
        tryPattern: null,
      },
      {
        syntax: "@- and @+",
        description:
          "Arrays holding start ($-) and end ($+) byte/character offsets in target string for $& (index 0) and capture groups (indices 1..N)",
        example: 'my $start = $-[0]; my $end = $+[0]; # Offsets of full match',
        tryPattern: null,
      },
      {
        syntax: "pos($str)",
        description:
          "Returns or sets the current offset position where the next /g search will resume",
        example: 'pos($str) = 0; # Reset regex cursor',
        tryPattern: null,
      },
      {
        syntax: "\\K",
        description:
          "Keep-out escape sequence: resets match start; drops everything matched to the left from $& and s/// replacement",
        example: '$str =~ s/foo\\Kbar/baz/; # replaces only "bar" when preceded by "foo"',
        tryPattern: "foo\\Kbar",
      },
    ],
  },
  {
    id: "regex-modifiers",
    title: "Pattern Modifiers & Flags",
    entries: [
      {
        syntax: "/g",
        description:
          "Global — match or replace all occurrences throughout the target string",
        example: '$str =~ s/\\s+/ /g;',
        tryPattern: null,
      },
      {
        syntax: "/i",
        description:
          "Case-insensitive matching (ignores uppercase vs lowercase distinction)",
        example: '$str =~ /hello/i → matches "HELLO", "Hello", "hello"',
        tryPattern: null,
      },
      {
        syntax: "/m",
        description:
          "Multiline mode — ^ and $ match beginning and end of each physical line within string",
        example: '$str =~ /^#\\s*/m;',
        tryPattern: null,
      },
      {
        syntax: "/s",
        description:
          "Single-line / Dot-all mode — permits the dot (.) metacharacter to match newline (\\n)",
        example: '$str =~ /<div.*?>(.*?)<\\/div>/s;',
        tryPattern: null,
      },
      {
        syntax: "/x and /xx",
        description:
          "Extended / Verbose mode — ignores unescaped whitespace and permits # comments; /xx also ignores whitespace inside bracket classes",
        example: '$str =~ / \\d{4} # Year \\n -\\d{2} # Month /x;',
        tryPattern: null,
      },
      {
        syntax: "/e",
        description:
          "Evaluate replacement string as executable Perl code expression (can be chained e.g. /ee)",
        example: '$str =~ s/(\\d+)/$1 * 2/ge; # Doubles all integers',
        tryPattern: null,
      },
      {
        syntax: "/r",
        description:
          "Non-destructive substitution (Perl 5.14+) — returns modified copy of string without altering original variable",
        example: 'my $slug = $title =~ s/[^a-z0-9]+/-/gir;',
        tryPattern: null,
      },
      {
        syntax: "/a and /aa",
        description:
          "ASCII-only matching rules for \\d, \\w, \\s, and POSIX classes; /aa enforces ASCII casing",
        example: '$str =~ /\\w+/a;',
        tryPattern: null,
      },
      {
        syntax: "/u",
        description:
          "Unicode rules — enables full Unicode character semantics on character classes",
        example: '$str =~ /\\w+/u;',
        tryPattern: null,
      },
      {
        syntax: "/o",
        description:
          "Compile pattern only once when compiling the script (use with caution if variable interpolation changes)",
        example: '$str =~ /$pattern/o;',
        tryPattern: null,
      },
    ],
  },
  {
    id: "advanced-constructs",
    title: "Advanced Constructs & PCRE Features",
    entries: [
      {
        syntax: "(?<name>pattern) / (?'name'pattern)",
        description:
          "Named capture group — captures matched substring and stores it in $+{name}",
        example: '(?<user>\\w+)@(?<host>[\\w.-]+)',
        tryPattern: "(?<user>\\w+)@(?<host>[\\w.-]+)",
      },
      {
        syntax: "\\g{1}, \\g{-1}, \\g{name}, \\k<name>",
        description:
          "Backreferences by absolute number (\\g{1}), relative position (\\g{-1} for previous group), or name (\\k<name>)",
        example: '(["\'])(.*?)\\g{-2}',
        tryPattern: '(["\'])(.*?)\\g{-2}',
      },
      {
        syntax: "(?>pattern) and *+, ++, ?+",
        description:
          "Atomic grouping and possessive quantifiers — matches greedily and prevents backtracking into the group",
        example: '(?>\\w+):',
        tryPattern: "(?>\\w+):",
      },
      {
        syntax: "(?|pattern1|pattern2)",
        description:
          "Branch reset group — resets capturing group numbering across alternatives so each branch uses the same $1, $2",
        example: '(?|(\\d{4})-(\\d{2})|([a-z]+)/(\\d+))',
        tryPattern: "(?|(\\d{4})-(\\d{2})|([a-z]+)/(\\d+))",
      },
      {
        syntax: "(?(condition)yes-pattern|no-pattern)",
        description:
          "Conditional match — if group number/name or lookaround condition evaluates true, matches yes-pattern, else no-pattern",
        example: '^(?<paren>\\()?(\\d{3})(?(paren)\\)|-)(\\d{4})$',
        tryPattern: null,
      },
      {
        syntax: "(?R) or (?0) / (?1) / (?&name)",
        description:
          "Recursive regex and subroutine calls — (?R) recurses the entire pattern; (?1) recurses group 1; (?&name) recurses named group",
        example: '\\((?:[^()]|(?R))*\\)',
        tryPattern: null,
      },
      {
        syntax: "(*SKIP)(*FAIL) / (*SKIP)(*F)",
        description:
          "Backtracking control verbs — discards unwanted matches and forces regex engine to skip ahead",
        example: '"[^"]*"(*SKIP)(*F)|\\bkeyword\\b',
        tryPattern: '"[^"]*"(*SKIP)(*F)|\\bkeyword\\b',
      },
      {
        syntax: "(?{ code }) and (??{ code })",
        description:
          "Embedded code blocks — (?{ code }) executes arbitrary Perl code at match point; (??{ code }) evaluates code and treats result as sub-pattern",
        example: '(\\w+)(?{ say "Saw $^N" })',
        tryPattern: null,
      },
    ],
  },
  {
    id: "character-classes",
    title: "Perl Character Classes & Unicode Properties",
    entries: [
      {
        syntax: "\\p{Letter} / \\p{L} / \\p{Lu} / \\p{Ll}",
        description:
          "Unicode General Category: all letters (\\p{L}), uppercase letter (\\p{Lu}), lowercase letter (\\p{Ll})",
        example: '\\p{Lu}\\p{Ll}+',
        tryPattern: "\\p{Lu}\\p{Ll}+",
      },
      {
        syntax: "\\p{Number} / \\p{N} / \\p{Nd}",
        description:
          "Unicode numbers: all numbers (\\p{N}) or decimal digits (\\p{Nd})",
        example: '\\p{N}+',
        tryPattern: "\\p{N}+",
      },
      {
        syntax: "\\p{Punctuation} / \\p{P}",
        description:
          "Unicode punctuation characters: open (\\p{Ps}), close (\\p{Pe}), connector (\\p{Pc}), dash (\\p{Pd})",
        example: '\\p{P}',
        tryPattern: "\\p{P}",
      },
      {
        syntax: "\\P{Property}",
        description:
          "Negated Unicode property — matches any character that does NOT possess the property",
        example: '\\P{L}+',
        tryPattern: "\\P{L}+",
      },
      {
        syntax: "\\p{Script=Greek} / \\p{Script=Latin}",
        description:
          "Unicode Script matching (e.g. \\p{Script=Arabic}, \\p{Script=Cyrillic}, \\p{Script=Han})",
        example: '\\p{Script=Greek}+',
        tryPattern: "\\p{Script=Greek}+",
      },
      {
        syntax: "\\X",
        description:
          "Extended Unicode grapheme cluster — matches a complete user-perceived character including combining marks/accents",
        example: '\\X',
        tryPattern: "\\X",
      },
    ],
  },
];

export const perlRecipes: PerlRecipe[] = [
  {
    id: "recipe-global-matching",
    title: "Global Extraction in List & Scalar (while) Context",
    description:
      "Extracting multiple matches at once into an array or iterating match-by-match with positional offsets using pos().",
    code: `use strict;
use warnings;
use feature 'say';

my $text = "Orders: ORD-1002 ($45.00), ORD-1003 ($120.50), ORD-1004 ($9.99)";

# 1. List context with /g: extract all items directly into an array
my @order_ids = ($text =~ /\\bORD-\\d+\\b/g);
say "All Orders: " . join(", ", @order_ids);
# All Orders: ORD-1002, ORD-1003, ORD-1004

# 2. While loop in scalar context with capturing groups:
while ($text =~ /(?<id>ORD-\\d+)\\s+\\(\\$(?<amount>[0-9.]+)\\)/g) {
    say "Order $+{id} for $\\$$+{amount} at character offset " . (pos($text) - length($&));
}`,
  },
  {
    id: "recipe-eval-nondestructive",
    title: "Non-Destructive (/r) & Code Evaluation (/e) Substitutions",
    description:
      "Transform strings using executable Perl expressions inside s///e, and preserve original strings with the /r modifier.",
    code: `use strict;
use warnings;
use feature 'say';

my $input = "apple: 10, banana: 25, cherry: 5";

# 1. /e modifier: evaluate replacement as Perl code (double price)
my $doubled = $input =~ s/(\\d+)/$1 * 2/ger;
say "Original: $input";
say "Doubled:  $doubled";
# Original: apple: 10, banana: 25, cherry: 5
# Doubled:  apple: 20, banana: 50, cherry: 10

# 2. Title case transformation:
my $raw_title = "welcome to perl regular expressions";
my $title_cased = $raw_title =~ s/\\b(\\w)/uc($1)/ger;
say "Title: $title_cased";
# Title: Welcome To Perl Regular Expressions`,
  },
  {
    id: "recipe-named-groups",
    title: "Named Capture Groups & %+ Hash Extraction",
    description:
      "Extract structured key-value data using (?<name>...) and access matches cleanly via the %+ special hash.",
    code: `use strict;
use warnings;
use feature 'say';

my $log_line = '[2026-08-21 14:25:30] [ERROR] Database connection timed out (host=db1.prod)';

my $log_regex = qr/^
    \\[ (?<timestamp> \\d{4}-\\d{2}-\\d{2} \\s \\d{2}:\\d{2}:\\d{2} ) \\] \\s
    \\[ (?<level>     [A-Z]+                                      ) \\] \\s
    (?<message>       .+?                                         ) \\s
    \\(host= (?<host> [^)]+                                       ) \\)
$/x;

if ($log_line =~ $log_regex) {
    say "Time:    $+{timestamp}";
    say "Level:   $+{level}";
    say "Message: $+{message}";
    say "Host:    $+{host}";
}`,
  },
  {
    id: "recipe-keep-out-k",
    title: "Clean Replacements with \\K (Keep Out Escape)",
    description:
      "Drop the preceding lookbehind context from $& to perform clean, fast substitutions without backreferences.",
    code: `use strict;
use warnings;
use feature 'say';

my $config = "PORT=8080\\nHOST=localhost\\nTIMEOUT=30";

# Replace only the port number without needing capture groups or s/(PORT=).../$1.../
$config =~ s/^PORT=\\K\\d+/9000/m;
say $config;
# PORT=9000
# HOST=localhost
# TIMEOUT=30

# Mask credit card leaving last 4 digits
my $card = "4532-8971-9823-1234";
$card =~ s/\\b(?:\\d{4}-){3}\\K\\d{4}/****/g;
say $card; # 4532-8971-9823-****`,
  },
  {
    id: "recipe-recursive-regex",
    title: "Recursive Regex for Nested Parentheses / Brackets",
    description:
      "Perl's (?R) recursion allows matching arbitrary levels of nested parentheses and balanced expressions.",
    code: `use strict;
use warnings;
use feature 'say';

# Recursive pattern matching nested parentheses: \\((?:[^()]|(?R))*\\)
my $nested_rx = qr/\\( (?: [^()]+ | (?R) )* \\)/x;

my @tests = (
    "(a + b)",
    "(a + (b * (c - 1)))",
    "((a + b) * (c + (d / e)))",
    "(a + b))",   # unbalanced
);

for my $expr (@tests) {
    if ($expr =~ /^$nested_rx$/) {
        say "$expr -> Valid Balanced Parentheses ✅";
    } else {
        say "$expr -> Unbalanced / Invalid ❌";
    }
}`,
  },
  {
    id: "recipe-skip-fail",
    title: "Skip Unwanted Matches with (*SKIP)(*FAIL)",
    description:
      "The classic Perl idiom to ignore keywords inside comments or quoted strings while matching everywhere else.",
    code: `use strict;
use warnings;
use feature 'say';

my $code = 'my $foo = "target inside quotes"; my $target = 42; # target in comment';

# Ignore strings in double quotes or comments, match \btarget\b elsewhere
my $target_rx = qr/
    "[^"]*"       (*SKIP)(*FAIL)
  | \\#[^\\n]*     (*SKIP)(*FAIL)
  | \\btarget\\b
/x;

# Replace only code variable 'target' with 'destination'
$code =~ s/$target_rx/destination/g;
say $code;
# my $foo = "target inside quotes"; my $destination = 42; # target in comment`,
  },
];

// Maximum four
export const perlNavCards: NavCard[] = [
  {
    href: "/javascript",
    title: "JavaScript",
    description:
      "RegExp object, matchAll, String methods, and JS flags (g, i, m, y, u, v).",
    icon: "💛",
  },
  {
    href: "/python",
    title: "Python",
    description:
      "re module — named groups (?P<name>), verbose mode, and Python flags.",
    icon: "🐍",
  },
  {
    href: "/csharp",
    title: "C# (.NET)",
    description:
      "System.Text.RegularExpressions, [GeneratedRegex], and balancing groups.",
    icon: "🔷",
  },
  {
    href: "/sql",
    title: "SQL",
    description:
      "REGEXP_LIKE, PostgreSQL (~, ~*), MySQL RLIKE, BigQuery, and Snowflake.",
    icon: "🗄️",
  },
];
