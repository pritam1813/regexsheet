import type { RegexCategory, NavCard } from "./regex";

export interface NotepadppRecipe {
  id: string;
  title: string;
  description: string;
  find: string;
  replace: string;
  notes?: string;
}

export const notepadppRegexCategories: RegexCategory[] = [
  {
    id: "line-breaks-spaces",
    title: "Line Breaks, Whitespace, & Notepad++ Specials",
    entries: [
      {
        syntax: "\\R",
        description:
          "Universal newline — matches any line break sequence (\\r\\n on Windows, \\n on Unix, \\r on Mac)",
        example: "Replace '\\R' with ' ' to join all lines into a single line",
        tryPattern: "\\R",
      },
      {
        syntax: "\\r\\n",
        description:
          "Windows CRLF line ending explicitly (Carriage Return \\r followed by Line Feed \\n)",
        example: "^.*\\r\\n matches entire line including CRLF",
        tryPattern: null,
      },
      {
        syntax: "\\n and \\r",
        description:
          "Line feed (\\n, ASCII 10, Unix) and Carriage return (\\r, ASCII 13, classic Mac)",
        example: "\\n matches newline character",
        tryPattern: "\\n",
      },
      {
        syntax: "\\t",
        description: "Tab character (ASCII 9 / horizontal tab)",
        example: "\\t+ matches consecutive tab stops",
        tryPattern: "\\t+",
      },
      {
        syntax: "\\s and \\S",
        description:
          "Whitespace (space, tab, newline) and Non-whitespace character",
        example: "^\\s+$ matches lines consisting only of spaces/tabs",
        tryPattern: "^\\s+$",
      },
      {
        syntax: "\\h and \\H",
        description:
          "Horizontal whitespace (spaces and tabs only, excludes newlines) and non-horizontal whitespace",
        example: "[^\\S\\r\\n]+ or \\h+ matches horizontal indentation",
        tryPattern: "\\h+",
      },
      {
        syntax: "\\v and \\V",
        description:
          "Vertical whitespace (newline, line feed, vertical tab, form feed) and non-vertical whitespace",
        example: "\\v+ matches consecutive vertical blank lines",
        tryPattern: "\\v+",
      },
      {
        syntax: "\\x{HHHH} or \\xHH",
        description:
          "Hexadecimal character code (e.g. \\x{20AC} for €, \\x20 for space, \\x00 for null byte)",
        example: "\\x{00A0} matches non-breaking space",
        tryPattern: "\\x{00A0}",
      },
    ],
  },
  {
    id: "anchors-search-modes",
    title: "Anchors, Boundaries, & Inline Flags",
    entries: [
      {
        syntax: "^ and $",
        description:
          "Start of line (^) and end of line ($); matches line boundaries by default in Notepad++",
        example: "^INFO matches lines starting with 'INFO'",
        tryPattern: "^INFO",
      },
      {
        syntax: "\\A and \\z",
        description:
          "Start of entire file (\\A) and absolute end of entire file (\\z) regardless of line count",
        example: "\\A-- START OF FILE\\R",
        tryPattern: "\\A",
      },
      {
        syntax: "\\b and \\B",
        description:
          "Word boundary (\\b) and non-word boundary (\\B) at the edge of \\w characters",
        example: "\\bword\\b matches exact word 'word'",
        tryPattern: "\\bword\\b",
      },
      {
        syntax: "\\K",
        description:
          "Keep Out — resets match position and keeps everything matched to the left out of Find/Replace",
        example: "Find: 'item_id=\\K\\d+' Replace: '9999'",
        tryPattern: "item_id=\\K\\d+",
      },
      {
        syntax: "(?i) and (?-i)",
        description:
          "Inline case-insensitive (?i) and case-sensitive (?-i) switch within the pattern",
        example: "(?i)error matches ERROR, Error, error",
        tryPattern: "(?i)error",
      },
      {
        syntax: "(?s) and (?-s)",
        description:
          "Inline dot-all mode — (?s) enables dot (.) matching newlines; (?-s) disables it (overrides UI checkbox)",
        example: "(?s)<div>.*?</div> matches multi-line HTML div",
        tryPattern: "(?s)<div>.*?</div>",
      },
      {
        syntax: "(?m) and (?-m)",
        description:
          "Inline multiline flag — controls whether ^ and $ match individual line boundaries",
        example: "(?m)^\\d+",
        tryPattern: "(?m)^\\d+",
      },
      {
        syntax: "(?x)",
        description:
          "Extended mode — ignores unescaped spaces and permits # comments inside the search pattern",
        example: "(?x)\\d{4} # Year \\R",
        tryPattern: null,
      },
    ],
  },
  {
    id: "replace-tokens",
    title: "Replace Field Tokens & Case Modifiers",
    entries: [
      {
        syntax: "$1, $2, $3 ... (or \\1, \\2)",
        description:
          "Inserts the text matched by the 1st, 2nd, 3rd parenthesized capture group in Find pattern",
        example: "Find: '(\\w+) (\\w+)' Replace: '$2, $1'",
        tryPattern: null,
      },
      {
        syntax: "$0 (or & or \\0)",
        description:
          "Inserts the entire matched text into the replacement string",
        example: "Find: '\\d+' Replace: '[$0]'",
        tryPattern: null,
      },
      {
        syntax: "\\U ... \\E",
        description:
          "Converts all enclosed replacement text to UPPERCASE until \\E terminator",
        example: "Find: '(\\w+)' Replace: '\\U$1\\E' → 'hello' becomes 'HELLO'",
        tryPattern: null,
      },
      {
        syntax: "\\L ... \\E",
        description:
          "Converts all enclosed replacement text to lowercase until \\E terminator",
        example: "Find: '([A-Z]+)' Replace: '\\L$1\\E' → 'HELLO' becomes 'hello'",
        tryPattern: null,
      },
      {
        syntax: "\\u and \\l",
        description:
          "Converts only the single next character to uppercase (\\u) or lowercase (\\l)",
        example: "Find: '(\\w+)' Replace: '\\u\\L$1\\E' (Capitalizes / Title Cases word)",
        tryPattern: null,
      },
      {
        syntax: "$+{name} (or \\k<name>)",
        description:
          "Inserts the text captured by a named capture group (?<name>...)",
        example: "Find: '(?<id>\\d+)' Replace: 'ID: $+{id}'",
        tryPattern: null,
      },
      {
        syntax: "(?{1}then:else) / (?1then:else)",
        description:
          "Conditional replacement — if group 1 matched, outputs 'then', otherwise outputs 'else'",
        example: "Find: '(\\w+)|(\\d+)' Replace: '(?{1}Word:Number)'",
        tryPattern: null,
      },
      {
        syntax: "\\r\\n or \\n (in Replace)",
        description:
          "Inserts an actual Windows CRLF or Unix LF line break in the replacement field",
        example: "Find: ',' Replace: '\\r\\n' (converts comma list to lines)",
        tryPattern: null,
      },
    ],
  },
  {
    id: "groups-lookarounds",
    title: "Groups, Lookarounds, & Atomic Matching",
    entries: [
      {
        syntax: "(pattern)",
        description:
          "Numbered capturing group — captures matched subexpression for backreferencing and $1 replace",
        example: "(\\d{4})-(\\d{2})-(\\d{2})",
        tryPattern: "(\\d{4})-(\\d{2})-(\\d{2})",
      },
      {
        syntax: "(?:pattern)",
        description:
          "Non-capturing group — groups subexpressions for quantifiers without saving $1 capture memory",
        example: "(?:https?|ftp)://\\S+",
        tryPattern: "(?:https?|ftp)://\\S+",
      },
      {
        syntax: "(?<name>pattern)",
        description:
          "Named capture group — assigns custom name to group for $+{name} replacement",
        example: "(?<year>\\d{4})-(?<month>\\d{2})",
        tryPattern: "(?<year>\\d{4})-(?<month>\\d{2})",
      },
      {
        syntax: "(?=pattern) and (?!pattern)",
        description:
          "Positive lookahead (?=...) and Negative lookahead (?!...) assertions (zero-width match)",
        example: "\\d+(?=px) matches number only before 'px'",
        tryPattern: "\\d+(?=px)",
      },
      {
        syntax: "(?<=pattern) and (?<!pattern)",
        description:
          "Positive lookbehind (?<=...) and Negative lookbehind (?<!...) assertions",
        example: "(?<=\\$)\\d+ matches number only after '$'",
        tryPattern: "(?<=\\$)\\d+",
      },
      {
        syntax: "(?>pattern) and possessive quantifiers ++, *+",
        description:
          "Atomic grouping / possessive quantifiers — locks in matches without backtracking for faster search",
        example: "(?>\\w+): or \\w++:",
        tryPattern: "(?>\\w+):",
      },
      {
        syntax: "(?|branch1|branch2)",
        description:
          "Branch reset group — alternatives share the exact same capture group numbering ($1)",
        example: "(?|'([^']*)'|\"([^\"]*)\")",
        tryPattern: "(?|'([^']*)'|\"([^\"]*)\")",
      },
    ],
  },
];

export const notepadppRecipes: NotepadppRecipe[] = [
  {
    id: "recipe-delete-empty-lines",
    title: "Delete All Blank & Empty Lines",
    description:
      "Removes completely empty lines and lines that contain only whitespace characters (spaces/tabs).",
    find: "^[\\t ]*\\R",
    replace: "(leave empty)",
    notes: "Make sure 'Regular expression' is checked and '. matches newline' is unchecked in Ctrl+H.",
  },
  {
    id: "recipe-trim-trailing-whitespace",
    title: "Trim Trailing Whitespace from All Lines",
    description:
      "Removes trailing spaces and tabs at the end of every line across the document.",
    find: "[\\t ]+$",
    replace: "(leave empty)",
    notes: "Matches one or more spaces or tabs immediately before the line end anchor ($).",
  },
  {
    id: "recipe-csv-reorder",
    title: "Swap / Reorder Columns in CSV or Delimited Files",
    description:
      "Swaps Column 1 and Column 2 in comma-separated text using capture groups.",
    find: "^([^,\\r\\n]+),([^,\\r\\n]+)",
    replace: "$2,$1",
    notes: "Captures first two comma-separated fields and reverses their order on every line.",
  },
  {
    id: "recipe-case-conversion",
    title: "Convert to UPPERCASE, lowercase, or Title Case",
    description:
      "Use Notepad++ case modification escape tokens (\\U, \\L, \\u, \\l) in the Replace field.",
    find: "\\b([a-z])([a-zA-Z0-9_]*)\\b",
    replace: "\\u\\L$1$2\\E",
    notes: "Converts matched words to Title Case. Use \\U$0\\E for full UPPERCASE, or \\L$0\\E for lowercase.",
  },
  {
    id: "recipe-quote-lines",
    title: "Wrap Every Line in Quotes & Trailing Comma (SQL IN Clause)",
    description:
      "Formats a raw list of IDs or names into SQL string format ('item1', 'item2', ...).",
    find: "^(\\s*)(.+?)(\\s*)$",
    replace: "$1'$2',",
    notes: "Wraps text in single quotes and adds a trailing comma while preserving indentation.",
  },
  {
    id: "recipe-strip-html",
    title: "Strip HTML/XML Tags Keeping Inner Content",
    description:
      "Removes all HTML tags and leaves clean plain text.",
    find: "<[^>]+>",
    replace: "(leave empty)",
    notes: "Matches everything between < and > non-greedily.",
  },
  {
    id: "recipe-delete-lines-containing",
    title: "Delete Whole Lines Containing Specific Word",
    description:
      "Finds and removes every line containing a specific keyword including its newline break.",
    find: "^.*\\bKEYWORD\\b.*\\R",
    replace: "(leave empty)",
    notes: "Replace 'KEYWORD' with the word you want to purge. The whole line and line break are deleted.",
  },
  {
    id: "recipe-merge-lines",
    title: "Convert Multiple Lines into Single Comma-Separated Line",
    description:
      "Replaces all line breaks with commas and a space to join rows into a single inline list.",
    find: "\\R",
    replace: ", ",
    notes: "Uses \\R to match Windows CRLF, Unix LF, or Mac CR line breaks uniformly.",
  },
];

// Maximum four
export const notepadppNavCards: NavCard[] = [
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
    href: "/sql",
    title: "SQL",
    description:
      "REGEXP_LIKE, PostgreSQL (~, ~*), MySQL RLIKE, BigQuery, and Snowflake.",
    icon: "🗄️",
  },
  {
    href: "/csharp",
    title: "C# (.NET)",
    description:
      "System.Text.RegularExpressions, [GeneratedRegex], and balancing groups.",
    icon: "🔷",
  },
];
