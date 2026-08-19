import type { RegexCategory, NavCard } from "./regex";

export const pythonRegexCategories: RegexCategory[] = [
  {
    id: "re-functions",
    title: "re Module Functions",
    entries: [
      {
        syntax: "re.search(pat, s)",
        description: "Scan string for first match; returns Match object or None",
        example: "re.search(r'\\d+', 'id: 42') → Match",
      },
      {
        syntax: "re.match(pat, s)",
        description: "Match characters only at the start of string; returns Match or None",
        example: "re.match(r'\\w+', 'foo bar') → 'foo'",
      },
      {
        syntax: "re.fullmatch(pat, s)",
        description: "Match the entire string from start to end; returns Match or None",
        example: "re.fullmatch(r'\\d{4}', '2026') → Match",
      },
      {
        syntax: "re.findall(pat, s)",
        description: "Return all non-overlapping matches as a list of strings or tuples",
        example: "re.findall(r'\\d+', '10, 20, 30') → ['10', '20', '30']",
      },
      {
        syntax: "re.finditer(pat, s)",
        description: "Return an iterator yielding Match objects over all matches",
        example: "[m.start() for m in re.finditer(r'\\d+', s)]",
      },
      {
        syntax: "re.sub(pat, repl, s)",
        description: "Replace occurrences of pattern with repl (string or function)",
        example: "re.sub(r'\\s+', '-', 'hello world') → 'hello-world'",
      },
      {
        syntax: "re.subn(pat, repl, s)",
        description: "Same as re.sub(), returns tuple (new_string, number_of_subs)",
        example: "re.subn(r'\\d', '#', '1a2') → ('#a#', 2)",
      },
      {
        syntax: "re.split(pat, s)",
        description: "Split string by occurrences of pattern (optional maxsplit)",
        example: "re.split(r'[,;]\\s*', 'a, b; c') → ['a', 'b', 'c']",
      },
      {
        syntax: "re.compile(pat, flags)",
        description: "Compile pattern into a reusable Pattern object for performance",
        example: "pattern = re.compile(r'\\b\\w+\\b', re.I)",
      },
      {
        syntax: "re.escape(pattern)",
        description: "Escape all special characters in string for literal matching",
        example: "re.escape('https://') → 'https://'",
      },
      {
        syntax: "re.purge()",
        description: "Clear the internal regular expression memory cache",
        example: "re.purge()",
      },
    ],
  },
  {
    id: "match-object",
    title: "Match Object Methods",
    entries: [
      {
        syntax: "m.group(0)",
        description: "Return the entire matched substring (same as m.group())",
        example: "m.group() → '2026-08-18'",
      },
      {
        syntax: "m.group(n)",
        description: "Return subgroup matched by index number (1-based)",
        example: "m.group(1) → '2026'",
      },
      {
        syntax: "m.group('name')",
        description: "Return subgroup matched by named capture (?P<name>...)",
        example: "m.group('year') → '2026'",
      },
      {
        syntax: "m.groups()",
        description: "Return a tuple containing all captured subgroups",
        example: "m.groups() → ('2026', '08', '18')",
      },
      {
        syntax: "m.groupdict()",
        description: "Return a dict containing all named subgroups {name: value}",
        example: "m.groupdict() → {'year': '2026'}",
      },
      {
        syntax: "m.start([group])",
        description: "Return start character index of match in source string",
        example: "m.start() → 4",
      },
      {
        syntax: "m.end([group])",
        description: "Return end character index of match in source string",
        example: "m.end() → 8",
      },
      {
        syntax: "m.span([group])",
        description: "Return tuple of (start, end) index positions",
        example: "m.span() → (4, 8)",
      },
      {
        syntax: "m.expand(template)",
        description: "Do backslash substitution on template string (\\1 or \\g<name>)",
        example: "m.expand(r'Year: \\g<year>')",
      },
      {
        syntax: "m.string",
        description: "The original string passed to match() or search()",
        example: "m.string → source text",
      },
    ],
  },
  {
    id: "flags",
    title: "Python Regex Flags",
    entries: [
      {
        syntax: "re.IGNORECASE, re.I",
        description: "Perform case-insensitive matching",
        example: "re.findall(r'cat', 'CAT Cat', re.I)",
      },
      {
        syntax: "re.MULTILINE, re.M",
        description: "^ and $ match start/end of each line in addition to string",
        example: "re.findall(r'^\\w+', text, re.M)",
      },
      {
        syntax: "re.DOTALL, re.S",
        description: ". matches any character including newline (\\n)",
        example: "re.search(r'<p>.*?</p>', html, re.S)",
      },
      {
        syntax: "re.VERBOSE, re.X",
        description: "Ignore whitespace & enable inline comments (#) in pattern",
        example: "re.compile(r'\\d{3} # code', re.X)",
      },
      {
        syntax: "re.ASCII, re.A",
        description: "Make \\w, \\d, \\s, \\b match ASCII only (not full Unicode)",
        example: "re.findall(r'\\w+', text, re.A)",
      },
      {
        syntax: "re.UNICODE, re.U",
        description: "Enable Unicode matching (default in Python 3)",
        example: "re.findall(r'\\w+', 'résumé', re.U)",
      },
      {
        syntax: "re.LOCALE, re.L",
        description: "Make \\w, \\b locale-dependent (bytes patterns only)",
        example: "re.compile(rb'\\w+', re.L)",
      },
      {
        syntax: "re.I | re.M",
        description: "Combine multiple flags using bitwise OR operator (|)",
        example: "re.compile(r'^foo', re.I | re.M)",
      },
    ],
  },
  {
    id: "python-syntax",
    title: "Python-Specific Syntax & Groups",
    entries: [
      {
        syntax: "r\"raw string\"",
        description: "Raw string literal — avoids Python escape sequence collisions",
        example: "r'\\bword\\b' vs '\\\\bword\\\\b'",
      },
      {
        syntax: "(?P<name>...)",
        description: "Named capturing group — accessible by name in match object",
        example: "(?P<year>\\d{4}) → m.group('year')",
      },
      {
        syntax: "(?P=name)",
        description: "Backreference to named group within the same pattern",
        example: "(?P<q>['\"]).*?(?P=q) → \"quoted\"",
      },
      {
        syntax: "\\g<name>",
        description: "Backreference to named group in re.sub() replacement string",
        example: "re.sub(r'(?P<v>\\d+)', r'\\g<v>px', s)",
      },
      {
        syntax: "\\g<1>",
        description: "Backreference to numbered group in re.sub() (prevents ambiguity)",
        example: "re.sub(r'(\\d+)', r'\\g<1>0', s)",
      },
      {
        syntax: "(?#comment)",
        description: "Inline regex comment — ignored by the engine",
        example: "\\d{3}(?#area code)-\\d{4}",
      },
      {
        syntax: "(?(id)yes|no)",
        description: "Conditional: matches 'yes' if group id matched, else 'no'",
        example: "(\\()?\\d{3}(?(1)\\))-\\d{4}",
      },
      {
        syntax: "\\A",
        description: "Match only at start of string (ignores re.MULTILINE)",
        example: "re.search(r'\\AStart', text)",
      },
      {
        syntax: "\\Z",
        description: "Match only at end of string (ignores re.MULTILINE)",
        example: "re.search(r'End\\Z', text)",
      },
      {
        syntax: "\\b",
        description: "Word boundary (raw string r'\\b' prevents ASCII backspace)",
        example: "r'\\bcat\\b' → 'cat' not 'category'",
      },
    ],
  },
];

export interface PythonRecipe {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const pythonRecipes: PythonRecipe[] = [
  {
    id: "recipe-named-groups",
    title: "Named Groups & Extraction",
    description: "Extract structured components from a string using named groups (?P<name>...) and groupdict().",
    code: `import re

log_line = "2026-08-18 [ERROR] User 1042 failed login"
pattern = r"(?P<date>\\d{4}-\\d{2}-\\d{2}) \\[(?P<level>\\w+)\\] (?P<msg>.*)"

match = re.search(pattern, log_line)
if match:
    data = match.groupdict()
    print(data["date"])   # '2026-08-18'
    print(data["level"])  # 'ERROR'`,
  },
  {
    id: "recipe-callbacks",
    title: "Dynamic Replacements with Callable",
    description: "Pass a callback function to re.sub() for custom transformation logic per match.",
    code: `import re

text = "Items cost $12, $45, and $100."

# Convert USD to EUR (approx 0.92x)
def convert_usd_to_eur(match):
    val = int(match.group(1))
    return f"€{round(val * 0.92)}"

result = re.sub(r"\\$(\\d+)", convert_usd_to_eur, text)
# Output: 'Items cost €11, €41, and €92.'`,
  },
  {
    id: "recipe-verbose",
    title: "Verbose Multi-line Regex with Comments",
    description: "Use re.VERBOSE (re.X) to structure and document complex regular expressions cleanly.",
    code: `import re

email_pattern = re.compile(
    r"""
    ^
    (?P<user>[a-zA-Z0-9_.+-]+)  # Username
    @
    (?P<domain>[a-zA-Z0-9-]+)    # Domain host
    \\.
    (?P<tld>[a-zA-Z]{2,})        # Top-level domain
    $
    """,
    re.VERBOSE,
)

match = email_pattern.match("hello@example.com")
print(match.group("user"))  # 'hello'`,
  },
  {
    id: "recipe-finditer",
    title: "Find All Matches with Span Positions",
    description: "Iterate over all pattern occurrences while accessing start and end character offsets.",
    code: `import re

text = "Port 8080, Port 443, Port 22"
for m in re.finditer(r"Port (\\d+)", text):
    port = m.group(1)
    start, end = m.span()
    print(f"Found port {port} at [{start}:{end}]")`,
  },
];

export const pythonNavCards: NavCard[] = [
  {
    href: "/",
    title: "Universal Regex",
    description: "Baseline syntax reference across JavaScript, Python, Go, and all engines.",
    icon: "🌐",
  },
  {
    href: "/javascript",
    title: "JavaScript",
    description: "RegExp object, matchAll, String methods, and JS flags (g, i, m, y, u, v).",
    icon: "💛",
  },
  {
    href: "/java",
    title: "Java",
    description: "java.util.regex — Pattern, Matcher, flags, and Java engine specifics.",
    icon: "☕",
  },
  {
    href: "/examples",
    title: "Examples",
    description: "Real-world patterns: email, URL, date, IPv4/v6, and phone numbers.",
    icon: "⚡",
  },
  {
    href: "/pdf",
    title: "Download PDF",
    description: "Printable one-page regex reference card for offline desktop use.",
    icon: "📄",
  },
];
