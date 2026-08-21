import type { RegexCategory, NavCard } from "./regex";

export interface GrepRecipe {
  id: string;
  title: string;
  description: string;
  command: string;
  explanation: string;
}

export const grepRegexCategories: RegexCategory[] = [
  {
    id: "engines-modes",
    title: "Regex Engines & Command Modes",
    entries: [
      {
        syntax: "grep 'pattern' file",
        description:
          "Basic Regular Expressions (BRE) — metacharacters +, ?, (, ), {, }, | must be escaped with backslashes (\\+, \\?, \\()",
        example: "grep '\\([0-9]\\+\\)' data.txt",
        tryPattern: null,
      },
      {
        syntax: "grep -E 'pattern' (or egrep)",
        description:
          "Extended Regular Expressions (ERE) — metacharacters +, ?, (, ), {, }, | are special by default without backslashes",
        example: "grep -E '^[0-9]+(\\.[0-9]+)?$' numbers.txt",
        tryPattern: null,
      },
      {
        syntax: "grep -P 'pattern'",
        description:
          "Perl-Compatible Regular Expressions (PCRE) — enables \\d, \\s, \\w, \\K, lookaheads (?=...), lookbehinds (?<=...)",
        example: "grep -P '\\b(?<=\\$\\s?)\\d+\\b' receipts.txt",
        tryPattern: null,
      },
      {
        syntax: "grep -F 'string' (or fgrep)",
        description:
          "Fixed Strings — searches for exact literal strings without any regex interpretation (fastest search mode)",
        example: "grep -F 'user[1].id' config.json",
        tryPattern: null,
      },
    ],
  },
  {
    id: "output-matching-flags",
    title: "Output & Matching Flags",
    entries: [
      {
        syntax: "-i / --ignore-case",
        description:
          "Case-insensitive search — ignores case distinctions in both pattern and input data",
        example: "grep -i 'error' /var/log/syslog",
        tryPattern: null,
      },
      {
        syntax: "-v / --invert-match",
        description:
          "Inverts match — selects lines that do NOT match the given regular expression pattern",
        example: "grep -v '^#' config.yml (filters out comments)",
        tryPattern: null,
      },
      {
        syntax: "-n / --line-number",
        description:
          "Prefixes each line of output with its 1-based line number within its input file",
        example: "grep -n 'TODO' src/index.ts",
        tryPattern: null,
      },
      {
        syntax: "-c / --count",
        description:
          "Suppresses normal output; prints only the count of matching lines for each input file",
        example: "grep -c 'POST /login' access.log",
        tryPattern: null,
      },
      {
        syntax: "-o / --only-matching",
        description:
          "Prints only the matched (non-empty) parts of a matching line, with each part on a separate output line",
        example: "grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' text.txt",
        tryPattern: null,
      },
      {
        syntax: "-w / --word-regexp",
        description:
          "Matches only whole words — pattern must match a full word surrounded by word boundary characters",
        example: "grep -w 'cat' animal.txt (matches 'cat', not 'catch')",
        tryPattern: null,
      },
      {
        syntax: "-x / --line-regexp",
        description:
          "Matches whole line only — pattern must match the entire line from start to end (implicit ^...$)",
        example: "grep -x 'ENABLED' flags.txt",
        tryPattern: null,
      },
      {
        syntax: "-m NUM / --max-count=NUM",
        description:
          "Stops reading file after finding NUM matching lines (optimizes search on huge log files)",
        example: "grep -m 5 'FATAL' application.log",
        tryPattern: null,
      },
      {
        syntax: "-q / --quiet / --silent",
        description:
          "Quiet mode — prints nothing; exits immediately with status 0 if match found, 1 if not (ideal for if-checks)",
        example: "if grep -q 'success' status.log; then ... fi",
        tryPattern: null,
      },
    ],
  },
  {
    id: "files-dirs-context",
    title: "Directories, Files, & Context Control",
    entries: [
      {
        syntax: "-r / -R / --recursive",
        description:
          "Recursively searches all files under current directory; -R follows symbolic links, -r does not",
        example: "grep -rn 'API_KEY' .",
        tryPattern: null,
      },
      {
        syntax: "--include=GLOB",
        description:
          "Search only files whose base name matches the specified wildcard GLOB pattern",
        example: "grep -rn --include='*.ts' 'interface' src/",
        tryPattern: null,
      },
      {
        syntax: "--exclude=GLOB / --exclude-dir=DIR",
        description:
          "Skip files or directories matching GLOB (e.g. ignore build artifacts or vendor folders)",
        example: "grep -rn --exclude-dir={node_modules,.git,dist} 'process' .",
        tryPattern: null,
      },
      {
        syntax: "-l / --files-with-matches",
        description:
          "Suppresses normal output; prints only the names of files containing at least one match",
        example: "grep -rl 'deprecated' ./lib/",
        tryPattern: null,
      },
      {
        syntax: "-L / --files-without-match",
        description:
          "Suppresses normal output; prints only the names of files that do NOT contain any match",
        example: "grep -rL 'Copyright 2026' ./src/",
        tryPattern: null,
      },
      {
        syntax: "-A NUM / --after-context=NUM",
        description:
          "Prints NUM lines of trailing context immediately following matching lines",
        example: "grep -A 3 'Traceback' error.log",
        tryPattern: null,
      },
      {
        syntax: "-B NUM / --before-context=NUM",
        description:
          "Prints NUM lines of leading context immediately preceding matching lines",
        example: "grep -B 2 'Failed test' test_output.txt",
        tryPattern: null,
      },
      {
        syntax: "-C NUM / -NUM / --context=NUM",
        description:
          "Prints NUM lines of context both before and after each matching line",
        example: "grep -C 2 -i 'database error' app.log",
        tryPattern: null,
      },
      {
        syntax: "-f FILE / --file=FILE",
        description:
          "Obtains search patterns from FILE, one pattern per line; matches any of the patterns",
        example: "grep -F -f blocklist.txt requests.log",
        tryPattern: null,
      },
    ],
  },
  {
    id: "posix-classes",
    title: "POSIX Character Classes in Grep",
    entries: [
      {
        syntax: "[[:digit:]]",
        description: "Digits: equivalent to [0-9]",
        example: "grep '[[:digit:]]\\+' file.txt",
        tryPattern: "[[:digit:]]+",
      },
      {
        syntax: "[[:alpha:]]",
        description: "Alphabetic letters: equivalent to [a-zA-Z]",
        example: "grep '^[[:alpha:]]\\+$' names.txt",
        tryPattern: "^[[:alpha:]]+$",
      },
      {
        syntax: "[[:alnum:]]",
        description: "Alphanumeric characters: equivalent to [a-zA-Z0-9]",
        example: "grep -E '^[[:alnum:]_-]+$' usernames.txt",
        tryPattern: "^[[:alnum:]_-]+$",
      },
      {
        syntax: "[[:space:]]",
        description: "Whitespace: space, tab, newline, vertical tab, form feed",
        example: "grep '[[:space:]]\\+' file.txt",
        tryPattern: "[[:space:]]+",
      },
      {
        syntax: "[[:blank:]]",
        description: "Horizontal whitespace: space and horizontal tab only",
        example: "grep '^[[:blank:]]*#' config.sh",
        tryPattern: "^[[:blank:]]*#",
      },
      {
        syntax: "[[:punct:]]",
        description:
          "Punctuation characters: ! \" # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ ` { | } ~",
        example: "grep '[[:punct:]]' tokens.txt",
        tryPattern: "[[:punct:]]",
      },
      {
        syntax: "[[:xdigit:]]",
        description: "Hexadecimal digits: equivalent to [0-9a-fA-F]",
        example: "grep -E '#[[:xdigit:]]{6}' styles.css",
        tryPattern: "#[[:xdigit:]]{6}",
      },
      {
        syntax: "[[:lower:]] and [[:upper:]]",
        description: "Lowercase letters [a-z] and Uppercase letters [A-Z]",
        example: "grep '^[[:upper:]][[:lower:]]\\+' names.txt",
        tryPattern: "^[[:upper:]][[:lower:]]+",
      },
    ],
  },
];

export const grepRecipes: GrepRecipe[] = [
  {
    id: "recipe-recursive-codebase",
    title: "Recursive Code Search with File Exclusions",
    description:
      "Find functions or variables across codebases while ignoring node_modules, build dirs, and non-code files.",
    command: 'grep -rn --include="*.{ts,js,astro}" --exclude-dir={node_modules,dist,.git} "handleSubmit" .',
    explanation:
      "-r = recursive, -n = line numbers, --include = filter extensions, --exclude-dir = skip dependencies and git internals.",
  },
  {
    id: "recipe-extract-ips",
    title: "Extract Exact IPv4 Addresses with -o and -P (PCRE)",
    description:
      "Extracts only the matching IP address strings from web server logs, discarding the rest of the lines.",
    command: "grep -oP '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b' /var/log/nginx/access.log | sort -u",
    explanation:
      "-o = only matching text, -P = Perl regex mode (\\d support), piped to sort -u to produce a unique list of client IPs.",
  },
  {
    id: "recipe-context-error-inspection",
    title: "Inspect Errors with Leading & Trailing Context (-C)",
    description:
      "Find critical errors along with 3 lines of preceding and following stack trace context.",
    command: 'grep -C 3 -i "fatal error" /var/log/application.log',
    explanation:
      "-C 3 prints 3 lines before and after each match; -i enables case-insensitive matching.",
  },
  {
    id: "recipe-filter-comments-blank-lines",
    title: "Filter Out Comments & Empty Lines with Invert Match (-v)",
    description:
      "Display clean configuration values without clutter from comment lines (#) or empty whitespace rows.",
    command: "grep -vE '^\\s*(#|$)' /etc/nginx/nginx.conf",
    explanation:
      "-v = invert match (exclude), -E = extended regex; matches lines that start with optional space followed by # or newline end.",
  },
  {
    id: "recipe-script-validation",
    title: "Check If String Exists in Shell Scripts (-q)",
    description:
      "Conditionally execute bash logic based on whether a pattern exists in a file without printing output.",
    command: `if grep -q "READY=true" /tmp/service.status; then
  echo "Service is operational!"
else
  echo "Waiting for service initialization..."
fi`,
    explanation:
      "-q runs quietly without stdout/stderr; returns exit code 0 if found (evaluating to true in bash if statements).",
  },
  {
    id: "recipe-count-occurrences",
    title: "Count Keyword Occurrences Across Files (-c)",
    description:
      "Quickly count how many TODO / FIXME comments exist across each file in your project.",
    command: 'grep -rc --include="*.ts" "TODO" src/ | grep -v ":0$"',
    explanation:
      "-r = recursive, -c = count per file; piped to grep -v ':0$' to hide files with 0 matches.",
  },
  {
    id: "recipe-multi-pattern-file",
    title: "Search for Multiple Blocklist Keywords from a File (-f)",
    description:
      "Match thousands of known bad signatures or prohibited keywords stored in a text file against logs.",
    command: "grep -F -f blocklist.txt access.log",
    explanation:
      "-F = fixed literal strings (high speed), -f = read patterns from file line by line.",
  },
];

// Maximum four
export const grepNavCards: NavCard[] = [
  {
    href: "/vim",
    title: "Vim / Neovim",
    description:
      "Very magic mode (\\v), search & replace (:%s), and global commands (:g, :v).",
    icon: "🟢",
  },
  {
    href: "/notepad-plus-plus",
    title: "Notepad++",
    description:
      "Find & Replace (Ctrl+H), universal newlines (\\R), and case tokens (\\U, \\L).",
    icon: "📝",
  },
  {
    href: "/perl",
    title: "Perl",
    description:
      "Pattern binding (=~, !~), s/// substitutions, and PCRE special variables.",
    icon: "🐪",
  },
  {
    href: "/python",
    title: "Python",
    description:
      "re module — named groups (?P<name>), verbose mode, and Python flags.",
    icon: "🐍",
  },
];
