import type { RegexCategory, NavCard } from "./regex";

export interface VimRecipe {
  id: string;
  title: string;
  description: string;
  command: string;
  explanation: string;
}

export const vimRegexCategories: RegexCategory[] = [
  {
    id: "search-substitute-cmds",
    title: "Search, Substitute, & Global Commands",
    entries: [
      {
        syntax: "/pattern and ?pattern",
        description:
          "Search forward (/) or backward (?) in current buffer; press n for next match, N for previous",
        example: "/\\v<[A-Z]\\w+>",
        tryPattern: null,
      },
      {
        syntax: ":%s/pattern/replace/g",
        description:
          "Substitute all occurrences of pattern across entire file (% = lines 1,$); /g flag replaces all occurrences per line",
        example: ":%s/\\vfoo/bar/g",
        tryPattern: null,
      },
      {
        syntax: ":%s/pattern/replace/gc",
        description:
          "Substitute with interactive confirmation prompt for each match (y=yes, n=no, a=all, q=quit, l=last)",
        example: ":%s/old_fn/new_fn/gc",
        tryPattern: null,
      },
      {
        syntax: ":'<,'>s/pattern/replace/g",
        description:
          "Substitute only within currently visually selected lines (auto-inserted after pressing : in Visual mode)",
        example: ":'<,'>s/\\s\\+$//",
        tryPattern: null,
      },
      {
        syntax: ":g/pattern/d",
        description:
          "Global delete — deletes every line matching pattern across the entire buffer",
        example: ":g/^\\s*$/d (deletes all blank lines)",
        tryPattern: null,
      },
      {
        syntax: ":v/pattern/d (or :g!/pattern/d)",
        description:
          "Inverted global delete — deletes every line that does NOT match pattern",
        example: ":v/^ERROR/d (keeps only ERROR lines)",
        tryPattern: null,
      },
      {
        syntax: ":g/pattern/norm command",
        description:
          "Executes Normal mode keystrokes on every line matching pattern",
        example: ":g/^#/norm >> (indents all comment lines)",
        tryPattern: null,
      },
      {
        syntax: ":s/pattern/replace/e",
        description:
          "The 'e' flag suppresses error messages if pattern is not found (useful in mappings and scripts)",
        example: ":%s/\\s\\+$//e",
        tryPattern: null,
      },
    ],
  },
  {
    id: "magic-modes",
    title: "Vim Magic Modes (\\v, \\m, \\M, \\V)",
    entries: [
      {
        syntax: "\\v (Very Magic)",
        description:
          "Very magic — all punctuation characters (+, ?, (, ), {, }, |, <, >) have special regex meaning WITHOUT backslashes",
        example: "/\\v(\\d{3})-(\\d{4}) instead of /\\(\\d\\{3\\}\\)-\\(\\d\\{4\\}\\)",
        tryPattern: null,
      },
      {
        syntax: "\\m (Magic — Default)",
        description:
          "Default Vim mode — only . * ^ $ [ ] are special; +, ?, (, ), {, }, | require a leading backslash (\\+, \\?, \\()",
        example: "/\\(\\d\\+\\) matches 1+ digits in default magic mode",
        tryPattern: null,
      },
      {
        syntax: "\\M (Nomagic)",
        description:
          "No magic — only ^ and $ have special meaning; all other metacharacters (. * [ etc.) are treated literally",
        example: "/\\Mfoo.bar matches literal 'foo.bar'",
        tryPattern: null,
      },
      {
        syntax: "\\V (Very Nomagic)",
        description:
          "Very no-magic — completely literal search; only the backslash (\\) retains special escape meaning",
        example: "/\\V[a-z]*(foo) matches literal '[a-z]*(foo)'",
        tryPattern: null,
      },
      {
        syntax: "\\c and \\C",
        description:
          "Overrides 'ignorecase' setting: \\c forces case-insensitive search; \\C forces case-sensitive search",
        example: "/\\v<admin>\\c matches 'Admin', 'ADMIN', 'admin'",
        tryPattern: null,
      },
    ],
  },
  {
    id: "character-classes",
    title: "Vim Character Classes & Multi-Line Tokens",
    entries: [
      {
        syntax: "\\< and \\>",
        description:
          "Word boundary delimiters — \\< matches start of a word, \\> matches end of a word (synonym for \\b)",
        example: "/\\<cat\\> matches 'cat' but not 'catch' or 'bobcat'",
        tryPattern: null,
      },
      {
        syntax: "\\k and \\K",
        description:
          "Keyword character (defined by 'iskeyword' option, includes letters, digits, and underscores) and non-keyword",
        example: "/\\k\\+ matches identifier",
        tryPattern: null,
      },
      {
        syntax: "\\i and \\I",
        description:
          "Identifier character (valid in programming language identifiers) and non-identifier",
        example: "/\\i\\+ matches identifier token",
        tryPattern: null,
      },
      {
        syntax: "\\f and \\F",
        description:
          "File name character (valid characters in file paths per 'isfname' setting) and non-filename",
        example: "/\\f\\+ matches path like '/usr/local/bin'",
        tryPattern: null,
      },
      {
        syntax: "\\s and \\S",
        description: "Whitespace character (space or tab) and non-whitespace",
        example: "/^\\s\\+ matches indented lines",
        tryPattern: null,
      },
      {
        syntax: "\\d and \\D",
        description: "Digit [0-9] and non-digit [^0-9]",
        example: "/\\d\\{4\\} matches 4 digits",
        tryPattern: null,
      },
      {
        syntax: "\\a, \\u, \\l",
        description:
          "Alphabetic letter (\\a), Uppercase letter (\\u), and Lowercase letter (\\l)",
        example: "/\\u\\l\\+ matches capitalized words",
        tryPattern: null,
      },
      {
        syntax: "\\_s, \\_d, \\_w, \\_.",
        description:
          "Multi-line character classes including newline — \\_s matches whitespace OR newline; \\_. matches any character including newline",
        example: "/function\\_.\\{-}end matches multi-line block",
        tryPattern: null,
      },
    ],
  },
  {
    id: "match-limits-lookarounds",
    title: "Match Boundaries (\\zs, \\ze) & Lookarounds",
    entries: [
      {
        syntax: "\\zs",
        description:
          "Start of match — sets start position of actual match, discarding everything matched to the left (like \\K in Perl)",
        example: ":%s/width: \\zs\\d\\+/100/g (changes only the number)",
        tryPattern: null,
      },
      {
        syntax: "\\ze",
        description:
          "End of match — sets end position of actual match, matching text to the right without replacing it",
        example: ":%s/\\d\\+\\zepx/24/g (changes only the number before 'px')",
        tryPattern: null,
      },
      {
        syntax: "pattern\\@=",
        description:
          "Positive lookahead assertion — matches if pattern matches immediately to the right",
        example: "/foo\\(bar\\)\\@= (or in \\v: /foo(bar)@=)",
        tryPattern: null,
      },
      {
        syntax: "pattern\\@!",
        description:
          "Negative lookahead assertion — matches if pattern does NOT match immediately to the right",
        example: "/foo\\(bar\\)\\@! matches 'foo' not followed by 'bar'",
        tryPattern: null,
      },
      {
        syntax: "pattern\\@<=",
        description:
          "Positive lookbehind assertion — matches if pattern matches immediately to the left",
        example: "/\\(foo\\)\\@<=bar matches 'bar' preceded by 'foo'",
        tryPattern: null,
      },
      {
        syntax: "pattern\\@<!",
        description:
          "Negative lookbehind assertion — matches if pattern does NOT match immediately to the left",
        example: "/\\(foo\\)\\@<!bar matches 'bar' not preceded by 'foo'",
        tryPattern: null,
      },
      {
        syntax: "\\%^ and \\%$",
        description:
          "Start of buffer (\\%^) and absolute end of buffer (\\%$) anchors",
        example: "/\\%^.* matches first line of file",
        tryPattern: null,
      },
      {
        syntax: "\\%23l and \\%>20l",
        description:
          "Line position matching — \\%23l matches only on line 23; \\%>20l matches only on lines after line 20",
        example: "/\\%23l\\s*error matches 'error' on line 23",
        tryPattern: null,
      },
      {
        syntax: "\\%V",
        description:
          "Visual area anchor — matches only within the area selected in the last Visual mode",
        example: ":%s/\\%Vfoo/bar/g replaces 'foo' only inside visual block",
        tryPattern: null,
      },
    ],
  },
  {
    id: "replace-expressions",
    title: "Replacement Field Tokens & Expressions (\\=)",
    entries: [
      {
        syntax: "\\0 or &",
        description: "Inserts the entire matched text into replacement string",
        example: ":%s/\\v<\\w+>/[&]/g (wraps words in brackets)",
        tryPattern: null,
      },
      {
        syntax: "\\1, \\2, \\3 ...",
        description:
          "Inserts text captured by 1st, 2nd, 3rd sub-expression groups",
        example: ":%s/\\v(\\w+) (\\w+)/\\2, \\1/g",
        tryPattern: null,
      },
      {
        syntax: "\\r",
        description:
          "Inserts an actual newline / line break in replacement (NOTE: \\n in replacement inserts a null byte \\x00!)",
        example: ":%s/, /\\r/g (splits comma list into separate lines)",
        tryPattern: null,
      },
      {
        syntax: "\\t",
        description: "Inserts a tab character into replacement",
        example: ":%s/    /\\t/g (converts 4 spaces to tabs)",
        tryPattern: null,
      },
      {
        syntax: "\\U and \\L with \\E",
        description:
          "Converts replacement text to UPPERCASE (\\U) or lowercase (\\L) until \\E terminator",
        example: ":%s/\\v(\\w+)/\\U\\1\\E/g (converts words to UPPERCASE)",
        tryPattern: null,
      },
      {
        syntax: "\\u and \\l",
        description:
          "Converts only the single next character to uppercase (\\u) or lowercase (\\l)",
        example: ":%s/\\v<(\\w)(\\w+)/\\u\\1\\L\\2\\E/g (Title Cases words)",
        tryPattern: null,
      },
      {
        syntax: "\\= (Expression Replacement)",
        description:
          "Evaluates Vim script expression — submatch(0) returns whole match, submatch(1) returns group 1",
        example: ":%s/\\v\\d+/\\=submatch(0)*2/g (doubles all numbers in file)",
        tryPattern: null,
      },
      {
        syntax: "\\~",
        description:
          "Inserts the replacement string from the previous substitute command",
        example: ":%s/foo/\\~/g",
        tryPattern: null,
      },
    ],
  },
];

export const vimRecipes: VimRecipe[] = [
  {
    id: "recipe-strip-trailing-whitespace",
    title: "Delete All Trailing Whitespace Across File",
    description:
      "Cleans up trailing spaces and tabs at the ends of lines, with the 'e' flag suppressing error if none found.",
    command: ":%s/\\s\\+$//e",
    explanation:
      "% = all lines, \\s\\+ = one or more whitespace characters, $ = end of line, e = suppress warning if no matches.",
  },
  {
    id: "recipe-delete-blank-lines",
    title: "Delete All Empty / Blank Lines with :g",
    description:
      "Uses the global command (:g) to find and delete all lines that contain only whitespace or are empty.",
    command: ":g/^\\s*$/d",
    explanation:
      "^ = start of line, \\s* = zero or more spaces/tabs, $ = end of line, d = delete matching lines.",
  },
  {
    id: "recipe-keep-matching-lines",
    title: "Keep Only Matching Lines (Inverted Delete :v)",
    description:
      "Deletes all lines except those matching a specific keyword (e.g. filter logs to only keep ERROR lines).",
    command: ":v/\\v<ERROR|FATAL>/d",
    explanation:
      ":v runs on non-matching lines; \\v enables very magic mode; <ERROR|FATAL> matches words ERROR or FATAL; d deletes other lines.",
  },
  {
    id: "recipe-substitute-zs-ze",
    title: "Precise In-Place Edit with \\zs and \\ze",
    description:
      "Change port or property values in configuration files without rewriting key names or capturing groups.",
    command: ':%s/\\v"port":\\s*\\zs\\d+\\ze/8080/g',
    explanation:
      '\\zs marks start of replacement text; \\ze marks end. Replaces only the digit sequence after "port": with 8080.',
  },
  {
    id: "recipe-evaluate-math",
    title: "Evaluate Vim Script Expressions in Replace (\\=)",
    description:
      "Perform arithmetic, increment numbers, or invoke custom functions on matches dynamically.",
    command: ":%s/\\v\\d+/\\=submatch(0) + 10/g",
    explanation:
      "\\= begins expression replacement; submatch(0) extracts the matched number, adds 10, and inserts the result.",
  },
  {
    id: "recipe-swap-words",
    title: "Swap Two Words / CSV Columns with Very Magic (\\v)",
    description:
      "Reorders first two comma-separated values or key-value arguments.",
    command: ":%s/\\v^([^,]+),\\s*([^,]+)/\\2, \\1/g",
    explanation:
      "\\v avoids backslash escaping on parentheses; captures group 1 and group 2, and swaps them as \\2, \\1.",
  },
  {
    id: "recipe-quote-lines",
    title: "Format Lines into SQL / Array Quoted List",
    description:
      "Wraps every non-empty line in single quotes and adds a trailing comma for SQL IN clauses.",
    command: ":%s/\\v^\\s*(.{-})\\s*$/  '\\1',/g",
    explanation:
      "Trims surrounding spaces, captures inner content non-greedily with .{-}, and outputs indented quoted items.",
  },
  {
    id: "recipe-change-case",
    title: "Convert Matched Words to UPPERCASE or Title Case",
    description:
      "Capitalize or uppercase specific identifiers across the entire buffer using case modifier escapes.",
    command: ":%s/\\v<[a-z_]+>/\\U&\\E/g",
    explanation:
      "<[a-z_]+> matches lowercase snake_case words; \\U&\\E converts entire match (&) to UPPERCASE.",
  },
];

// Maximum four
export const vimNavCards: NavCard[] = [
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
    href: "/notepad-plus-plus",
    title: "Notepad++",
    description:
      "Find & Replace (Ctrl+H), universal newlines (\\R), and case tokens (\\U, \\L).",
    icon: "📝",
  },
  {
    href: "/sql",
    title: "SQL",
    description:
      "REGEXP_LIKE, PostgreSQL (~, ~*), MySQL RLIKE, BigQuery, and Snowflake.",
    icon: "🗄️",
  },
];
