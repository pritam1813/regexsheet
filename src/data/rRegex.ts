import type { RegexCategory, NavCard } from "./regex";

export const rRegexCategories: RegexCategory[] = [
  {
    id: "base-functions",
    title: "Base R Regex Functions",
    entries: [
      {
        syntax:
          "grepl(pat, x, perl = FALSE, fixed = FALSE, ignore.case = FALSE)",
        description:
          "Returns logical vector (TRUE/FALSE) indicating if pattern was matched in each string",
        example: 'grepl("^\\\\d+", c("123", "abc")) → c(TRUE, FALSE)',
        tryPattern: null,
      },
      {
        syntax: "grep(pat, x, value = FALSE, perl = FALSE)",
        description:
          "Returns integer indices of elements matching pattern, or matched string values if value = TRUE",
        example:
          'grep("^a", c("apple", "banana", "avocado"), value = TRUE) → c("apple", "avocado")',
        tryPattern: null,
      },
      {
        syntax: "sub(pat, repl, x, perl = FALSE)",
        description:
          "Replaces first occurrence of pattern in each string element with replacement string",
        example: 'sub("\\\\d+", "X", "item 10 and 20") → "item X and 20"',
        tryPattern: null,
      },
      {
        syntax: "gsub(pat, repl, x, perl = FALSE)",
        description:
          "Replaces all occurrences of pattern in each string element with replacement string (global)",
        example: 'gsub("\\\\s+", "-", "hello big world") → "hello-big-world"',
        tryPattern: null,
      },
      {
        syntax: "regexpr(pat, x, perl = FALSE)",
        description:
          "Finds first match per element; returns integer vector of start indices with 'match.length' attribute",
        example: 'm <- regexpr("\\\\d+", "id: 1042"); m → 5 (match.length = 4)',
        tryPattern: null,
      },
      {
        syntax: "gregexpr(pat, x, perl = FALSE)",
        description:
          "Finds all matches in each element; returns list of integer vectors with match offsets and lengths",
        example: 'gregexpr("\\\\b\\\\w+\\\\b", "foo bar baz")',
        tryPattern: null,
      },
      {
        syntax: "regexec(pat, x, perl = FALSE)",
        description:
          "Finds first match and capturing groups; returns list of indices and lengths for each group",
        example: 'regexec("([a-z]+):([0-9]+)", "port:8080")',
        tryPattern: null,
      },
      {
        syntax: "regmatches(x, m) / regmatches(x, m) <- value",
        description:
          "Extracts or replaces substrings from x matching positions returned by regexpr, gregexpr, or regexec",
        example:
          'regmatches(x, gregexpr("\\\\d+", x)) → list of matched digit strings',
        tryPattern: null,
      },
      {
        syntax: "strsplit(x, split, fixed = FALSE, perl = FALSE)",
        description:
          "Splits string vector x into substrings at pattern matches; returns list of string vectors",
        example: 'strsplit("a, b; c", "[,;]\\\\s*")[[1]] → c("a", "b", "c")',
        tryPattern: null,
      },
    ],
  },
  {
    id: "stringr-functions",
    title: "stringr / Tidyverse Functions (ICU Engine)",
    entries: [
      {
        syntax: "str_detect(string, pattern, negate = FALSE)",
        description:
          "Detects pattern matches in string vector; returns logical vector (TRUE/FALSE)",
        example: 'str_detect(c("apple", "banana"), "^a") → c(TRUE, FALSE)',
        tryPattern: null,
      },
      {
        syntax: "str_which(string, pattern) / str_subset(string, pattern)",
        description:
          "Returns matching indices (str_which) or filtered subset of matching string values (str_subset)",
        example: 'str_subset(c("dog", "cat", "deer"), "^d") → c("dog", "deer")',
        tryPattern: null,
      },
      {
        syntax: "str_count(string, pattern)",
        description:
          "Counts the number of non-overlapping matches in each string element",
        example: 'str_count("banana", "a") → 3',
        tryPattern: null,
      },
      {
        syntax: "str_locate(string, pattern) / str_locate_all(string, pattern)",
        description:
          "Returns start and end character indices of first match (matrix) or all matches (list of matrices)",
        example: 'str_locate("hello 123", "\\\\d+") → start: 7, end: 9',
        tryPattern: null,
      },
      {
        syntax:
          "str_extract(string, pattern) / str_extract_all(string, pattern)",
        description:
          "Extracts first matched substring (character vector) or all matches (list of character vectors)",
        example:
          'str_extract_all("2026-08-19 and 2027-01-01", "\\\\d{4}-\\\\d{2}-\\\\d{2}")',
        tryPattern: null,
      },
      {
        syntax: "str_match(string, pattern) / str_match_all(string, pattern)",
        description:
          "Extracts full matches and each capturing group into columns of a character matrix",
        example:
          'str_match("user: 1042", "(\\\\w+): (\\\\d+)") → matrix with full match and group columns',
        tryPattern: null,
      },
      {
        syntax: "str_replace(string, pattern, replacement)",
        description:
          "Replaces first match with replacement string (supports backreferences \\1 or $1)",
        example:
          'str_replace("price: $10", "\\\\$(\\\\d+)", "€\\\\1") → "price: €10"',
        tryPattern: null,
      },
      {
        syntax: "str_replace_all(string, pattern, replacement)",
        description:
          "Replaces all matches; replacement can be a string or a named vector c('pat1' = 'rep1')",
        example:
          'str_replace_all("a 1 b 2", c("a" = "A", "b" = "B")) → "A 1 B 2"',
        tryPattern: null,
      },
      {
        syntax: "str_remove(string, pattern) / str_remove_all(string, pattern)",
        description:
          "Removes first or all occurrences of pattern (equivalent to str_replace with empty replacement)",
        example:
          'str_remove_all("hello 123 world 456", "\\\\d+\\\\s*") → "hello world "',
        tryPattern: null,
      },
      {
        syntax:
          "str_split(string, pattern, n = Inf, simplify = FALSE) / str_split_1(string, pattern)",
        description:
          "Splits strings into substrings at pattern matches; returns list, matrix (simplify=TRUE), or vector (str_split_1)",
        example: 'str_split_1("a,b,c", ",") → c("a", "b", "c")',
        tryPattern: null,
      },
    ],
  },
  {
    id: "flags-options",
    title: "Flags, Modifiers & Pattern Options",
    entries: [
      {
        syntax: "perl = TRUE (Base R)",
        description:
          "Enables PCRE (Perl-Compatible Regular Expressions) engine; enables lookarounds, non-greedy, named groups",
        example: 'grepl("(?<=id:)\\\\d+", "id:42", perl = TRUE) → TRUE',
        tryPattern: null,
      },
      {
        syntax: "fixed = TRUE (Base R & stringr::fixed())",
        description:
          "Matches pattern as exact literal byte/character sequence; skips regex parsing for maximum speed",
        example: 'sub(".", "_", "a.b.c", fixed = TRUE) → "a_b.c"',
        tryPattern: null,
      },
      {
        syntax: "ignore.case = TRUE (Base R)",
        description:
          "Performs case-insensitive matching across base R functions (grep, grepl, sub, gsub)",
        example: 'grepl("apple", "APPLE", ignore.case = TRUE) → TRUE',
        tryPattern: null,
      },
      {
        syntax: "useBytes = TRUE (Base R)",
        description:
          "Performs byte-by-byte matching instead of character-by-character; faster on ASCII/raw bytes",
        example: 'grep("foo", text_vec, useBytes = TRUE)',
        tryPattern: null,
      },
      {
        syntax: "regex(..., ignore_case = TRUE) (stringr)",
        description: "Case-insensitive modifier for stringr patterns",
        example:
          'str_detect("HELLO", regex("hello", ignore_case = TRUE)) → TRUE',
        tryPattern: null,
      },
      {
        syntax: "regex(..., multiline = TRUE) (stringr)",
        description:
          "Multiline mode: ^ and $ match start/end of each individual line within the string",
        example: 'str_extract_all(text, regex("^\\\\w+", multiline = TRUE))',
        tryPattern: null,
      },
      {
        syntax: "regex(..., dotall = TRUE) (stringr)",
        description:
          "Dot-all mode: dot (.) matches any character including newline (\\n)",
        example: 'str_extract(html, regex("<div>.*?</div>", dotall = TRUE))',
        tryPattern: null,
      },
      {
        syntax: "regex(..., comments = TRUE) (stringr)",
        description:
          "Verbose mode: ignores whitespace and enables inline comments starting with # inside pattern",
        example: 'regex("\\\\d{4} # year", comments = TRUE)',
        tryPattern: null,
      },
      {
        syntax: "coll(pattern, locale = 'en') (stringr)",
        description:
          "Locale-aware collation matching according to standard international sorting rules",
        example: 'str_detect("resume", coll("résumé", ignore_case = TRUE))',
        tryPattern: null,
      },
    ],
  },
  {
    id: "r-syntax",
    title: "R-Specific Syntax, POSIX Classes & Escapes",
    entries: [
      {
        syntax: '"\\\\d", "\\\\w", "\\\\s", "\\\\b"',
        description:
          "Double backslashes in standard R strings: R string parser requires escaping the backslash itself",
        example: 'grepl("\\\\d+", "123") vs r"(\\d+)"',
        tryPattern: null,
      },
      {
        syntax: 'r"(...)", r"-(...)-", r"{\\d+}"',
        description:
          "Raw string literals (R 4.0.0+): No backslash escaping required; delimiters (), [], {}, or -()-",
        example: 'r"(\\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\\b)"',
        tryPattern: null,
      },
      {
        syntax: "[[:digit:]], [[:alpha:]]",
        description:
          "POSIX character classes: Digits [0-9] and Alphabetic characters [a-zA-Z]",
        example: 'gsub("[[:digit:]]", "#", "a1b2") → "a#b#"',
        tryPattern: "[[:digit:]]+",
      },
      {
        syntax: "[[:alnum:]], [[:punct:]]",
        description:
          "POSIX character classes: Alphanumeric characters and Punctuation marks",
        example: 'gsub("[[:punct:]]", "", "Hello, World!") → "Hello World"',
        tryPattern: "[[:punct:]]+",
      },
      {
        syntax: "[[:space:]], [[:blank:]]",
        description:
          "POSIX character classes: Whitespace [ \\t\\r\\n\\v\\f] and Blank characters (space/tab only)",
        example: 'strsplit(text, "[[:space:]]+")[[1]]',
        tryPattern: "[[:space:]]+",
      },
      {
        syntax: "[[:lower:]], [[:upper:]]",
        description:
          "POSIX character classes: Lowercase letters [a-z] and Uppercase letters [A-Z]",
        example:
          'grep("^[[:upper:]]", c("John", "jane"), value = TRUE) → "John"',
        tryPattern: "[[:upper:]]+",
      },
      {
        syntax: "[[:xdigit:]], [[:cntrl:]]",
        description:
          "POSIX character classes: Hexadecimal digits [0-9a-fA-F] and Control characters",
        example: 'grepl("^[[:xdigit:]]+$", "1A4F") → TRUE',
        tryPattern: "[[:xdigit:]]+",
      },
      {
        syntax: "(?<name>...)",
        description:
          "Named capture group in PCRE (perl = TRUE) and stringr; accessible by column name or group name",
        example:
          'str_match("2026-08-19", "(?<y>\\\\d{4})-(?<m>\\\\d{2})-(?<d>\\\\d{2})")',
        tryPattern: "(?<year>\\d{4})",
      },
      {
        syntax: "\\\\1, \\\\2, $1, $2",
        description:
          "Numbered backreferences in replacement strings (sub, gsub use \\1; stringr supports \\1 and $1)",
        example:
          'gsub("(\\\\w+)\\\\s+(\\\\w+)", "\\\\2, \\\\1", "John Doe") → "Doe, John"',
        tryPattern: null,
      },
      {
        syntax: "(?<=prefix), (?<!prefix)",
        description:
          "Positive and negative lookbehinds (requires perl = TRUE in Base R or stringr)",
        example: 'str_extract("price: $42", "(?<=\\\\$)(\\\\d+)") → "42"',
        tryPattern: "(?<=\\$)\\d+",
      },
    ],
  },
];

export interface RRecipe {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const rRecipes: RRecipe[] = [
  {
    id: "recipe-str-match",
    title: "Extract Capturing Groups into Columns (stringr)",
    description:
      "Extract structured components from logs or strings into matrix columns with str_match().",
    code: `library(stringr)

log_lines <- c(
  "2026-08-19 [ERROR] User 1042 timed out",
  "2026-08-19 [INFO] Server started on port 8080"
)

pattern <- r"((?<date>\\d{4}-\\d{2}-\\d{2}) \\[(?<level>[A-Z]+)\\] (?<msg>.*))"
matches <- str_match(log_lines, pattern)

# Matrix with named columns
colnames(matches) <- c("full", "date", "level", "msg")
as.data.frame(matches)
#         date level                                msg
# 1 2026-08-19 ERROR               User 1042 timed out
# 2 2026-08-19  INFO       Server started on port 8080`,
  },
  {
    id: "recipe-dplyr-clean",
    title: "Data Frame Column Cleaning (dplyr & stringr)",
    description:
      "Clean messy numeric columns, currency symbols, and text strings inside dplyr mutate() pipelines.",
    code: `library(dplyr)
library(stringr)

df <- data.frame(
  item = c(" Laptop Pro ", "  Wireless Mouse", "Keyboard RGB "),
  price = c("$1,299.99 USD", "$49.50 USD", "$119.00 USD"),
  phone = c("(555) 234-5678", "555.987.6543", "+1 555-111-2222")
)

df_clean <- df %>%
  mutate(
    # Trim whitespace
    item = str_trim(item),
    # Extract numeric price and convert to numeric double
    price_usd = as.numeric(str_remove_all(price, r"([^\\d.]|-)")),
    # Standardize phone numbers to digits only
    phone_digits = str_remove_all(phone, r"([^\\d])")
  )

print(df_clean)`,
  },
  {
    id: "recipe-base-regmatches",
    title: "Base R Multiple Extraction with regmatches()",
    description:
      "Extract all pattern occurrences across a vector of strings using base R gregexpr() and regmatches().",
    code: `# Extract all email addresses without third-party packages
text <- c(
  "Contact us at support@example.com or sales@example.org",
  "No email here",
  "Reach dev.team+alert@sub.domain.co"
)

email_regex <- r"([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})"

# Find match positions (returns list of integer vectors)
matches_pos <- gregexpr(email_regex, text, perl = TRUE)

# Extract matched substrings
emails <- regmatches(text, matches_pos)

# emails[[1]] -> c("support@example.com", "sales@example.org")
# emails[[2]] -> character(0)
# emails[[3]] -> "dev.team+alert@sub.domain.co"
print(unlist(emails))`,
  },
  {
    id: "recipe-pcre-lookarounds",
    title: "Lookarounds & Named Backreferences (Base R PCRE)",
    description:
      "Use perl = TRUE in base R to leverage PCRE lookbehinds, lookaheads, and backreferences.",
    code: `# Extract currency amounts following dollar sign using lookbehind
text <- "Order 101 cost $45, order 102 cost $120."

# Positive lookbehind (?<=\\$) requires perl = TRUE
m <- gregexpr("(?<=\\\\$)\\\\d+", text, perl = TRUE)
amounts <- as.numeric(unlist(regmatches(text, m)))
print(amounts) # [1]  45 120

# Reorder names with backreferences: 'Last, First' -> 'First Last'
names <- c("Smith, John", "Curie, Marie", "Lovelace, Ada")
reordered <- sub(r"(^([^,]+),\\s*(.+)$)", r"(\\2 \\1)", names, perl = TRUE)
print(reordered)
# [1] "John Smith"     "Marie Curie"    "Ada Lovelace"`,
  },
  {
    id: "recipe-comments-regex",
    title: "Verbose Multi-line Regex with stringr::regex()",
    description:
      "Document complex regular expressions cleanly using the comments = TRUE flag.",
    code: `library(stringr)

# Complex URL parser documented with inline comments
url_pattern <- regex(
  r"(
    ^
    (?<protocol>https?)://       # HTTP or HTTPS protocol
    (?<host>[a-zA-Z0-9.-]+)      # Domain hostname
    (?::(?<port>\\d+))?           # Optional port number
    (?<path>/[^\\s?#]*)?          # Optional resource path
    (?:\\?(?<query>[^\\s#]*))?     # Optional query string
    $
  )",
  comments = TRUE
)

url <- "https://api.example.com:8080/v1/users?limit=25"
match_matrix <- str_match(url, url_pattern)

print(match_matrix[, "host"])     # "api.example.com"
print(match_matrix[, "port"])     # "8080"
print(match_matrix[, "path"])     # "/v1/users"
print(match_matrix[, "query"])    # "limit=25"`,
  },
  {
    id: "recipe-vectorized-replace",
    title: "Vectorized Multiple Replacements (str_replace_all)",
    description:
      "Apply a named lookup dictionary vector to perform multiple regex substitutions in one pass.",
    code: `library(stringr)

abbreviations <- c(
  "\\\\bUSA\\\\b" = "United States",
  "\\\\bUK\\\\b"  = "United Kingdom",
  "\\\\bEU\\\\b"  = "European Union",
  "\\\\bintl\\\\b" = "international"
)

text_vec <- c(
  "Shipping from the USA to the UK via intl priority.",
  "EU trade agreements are handled separately."
)

expanded <- str_replace_all(text_vec, abbreviations)
print(expanded)
# [1] "Shipping from the United States to the United Kingdom via international priority."
# [2] "European Union trade agreements are handled separately."`,
  },
];

// Maximum four
export const rNavCards: NavCard[] = [
  {
    href: "/python",
    title: "Python",
    description:
      "re module — named groups (?P<name>), verbose mode, and Python flags.",
    icon: "🐍",
  },
  {
    href: "/java",
    title: "Java",
    description:
      "java.util.regex — Pattern, Matcher, possessive quantifiers, and Java quirks.",
    icon: "☕",
  },
  {
    href: "/examples",
    title: "Examples",
    description:
      "Real-world patterns: email, URL, date, IPv4/v6, and phone numbers.",
    icon: "⚡",
  },
  {
    href: "/pdf",
    title: "Download PDF",
    description:
      "Printable one-page regex reference card for offline desktop use.",
    icon: "📄",
  },
];
