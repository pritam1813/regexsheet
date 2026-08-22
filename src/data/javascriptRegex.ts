import type { RegexCategory, NavCard } from "./regex";

export const javascriptRegexCategories: RegexCategory[] = [
  {
    id: "regex-methods",
    title: "RegExp & String Methods",
    entries: [
      {
        syntax: "re.test(str)",
        description: "Returns true if pattern matches in string, else false",
        example: "/cat/.test('catnip') → true",
        tryPattern: null,
      },
      {
        syntax: "re.exec(str)",
        description:
          "Returns an array of match info, or null. Updates lastIndex if /g",
        example: "/\\d+/.exec('id: 42') → ['42']",
        tryPattern: null,
      },
      {
        syntax: "str.match(re)",
        description:
          "Returns match array or null. Returns all matches if /g is set",
        example: "'1 2 3'.match(/\\d+/g) → ['1', '2', '3']",
        tryPattern: null,
      },
      {
        syntax: "str.matchAll(re)",
        description:
          "Returns an iterator of all matches including capture groups (requires /g)",
        example: "[...str.matchAll(/\\d+/g)]",
        tryPattern: null,
      },
      {
        syntax: "str.search(re)",
        description: "Returns index of first match, or -1 if not found",
        example: "'foo bar'.search(/bar/) → 4",
        tryPattern: null,
      },
      {
        syntax: "str.replace(re, repl)",
        description: "Replaces match(es) with replacement string or function",
        example: "'a b c'.replace(/\\w+/g, 'x') → 'x x x'",
        tryPattern: null,
      },
      {
        syntax: "str.replaceAll(re, repl)",
        description: "Replaces all matches. Regex must have /g flag",
        example: "str.replaceAll(/\\w+/g, 'x')",
        tryPattern: null,
      },
      {
        syntax: "str.split(re)",
        description: "Splits string by matches into an array",
        example: "'a, b; c'.split(/[,;]\\s*/) → ['a', 'b', 'c']",
        tryPattern: null,
      },
    ],
  },
  {
    id: "flags",
    title: "JavaScript Regex Flags",
    entries: [
      {
        syntax: "g",
        description: "Global: Find all matches rather than stopping after the first",
        example: "/a/g",
        tryPattern: null,
      },
      {
        syntax: "i",
        description: "Ignore case: Case-insensitive matching",
        example: "/a/i",
        tryPattern: null,
      },
      {
        syntax: "m",
        description: "Multiline: ^ and $ match start/end of line instead of whole string",
        example: "/^foo/m",
        tryPattern: null,
      },
      {
        syntax: "s",
        description: "DotAll: . matches newlines as well",
        example: "/foo.bar/s",
        tryPattern: null,
      },
      {
        syntax: "u",
        description: "Unicode: Treat pattern as a sequence of Unicode code points",
        example: "/\\u{1F600}/u",
        tryPattern: null,
      },
      {
        syntax: "v",
        description: "Unicode sets: Enables unicode property escapes and set operations",
        example: "/[\\p{L}&&[^a-z]]/v",
        tryPattern: null,
      },
      {
        syntax: "y",
        description:
          "Sticky: Matches only from the index indicated by the lastIndex property",
        example: "/foo/y",
        tryPattern: null,
      },
      {
        syntax: "d",
        description: "Indices: Generate indices for substring matches (match.indices)",
        example: "/foo/d",
        tryPattern: null,
      },
    ],
  },
  {
    id: "js-syntax",
    title: "JavaScript-Specific Syntax",
    entries: [
      {
        syntax: "/pattern/flags",
        description: "Regex literal syntax",
        example: "const re = /ab+c/i;",
        tryPattern: null,
      },
      {
        syntax: "new RegExp('pat', 'f')",
        description: "Constructor syntax (requires escaping backslashes)",
        example: "new RegExp('\\\\d+', 'g')",
        tryPattern: null,
      },
      {
        syntax: "(?<name>...)",
        description: "Named capturing group. Accessed via match.groups.name",
        example: "/(?<year>\\d{4})/.exec(s).groups.year",
        tryPattern: "(?<year>\\d{4})",
      },
      {
        syntax: "\\k<name>",
        description: "Backreference to a named group in the pattern",
        example: "/(?<quote>['\"]).*?\\k<quote>/",
        tryPattern: "(?<quote>['\"]).*?\\k<quote>",
      },
      {
        syntax: "$<name>",
        description: "Named capture replacement in str.replace()",
        example: "str.replace(/(?<v>\\d+)/, '$<v>px')",
        tryPattern: null,
      },
      {
        syntax: "$&, $1, $2",
        description:
          "Special replacement patterns: $& is whole match, $n is capture group",
        example: "str.replace(/(\\w+)/, '[$1]')",
        tryPattern: null,
      },
      {
        syntax: "\\p{...}",
        description: "Unicode property escape (requires /u or /v flag)",
        example: "/\\p{Script=Greek}/u",
        tryPattern: null,
      },
    ],
  },
];

export interface JavascriptRecipe {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const javascriptRecipes: JavascriptRecipe[] = [
  {
    id: "recipe-named-groups",
    title: "Named Groups & Extraction",
    description:
      "Extract structured components from a string using named groups and the groups property.",
    code: `const logLine = "2026-08-18 [ERROR] User failed login";
const pattern = /(?<date>\\d{4}-\\d{2}-\\d{2}) \\[(?<level>\\w+)\\] (?<msg>.*)/;

const match = pattern.exec(logLine);
if (match && match.groups) {
  console.log(match.groups.date);  // '2026-08-18'
  console.log(match.groups.level); // 'ERROR'
}`,
  },
  {
    id: "recipe-matchall",
    title: "Iterating with matchAll",
    description:
      "Use String.prototype.matchAll() to get all matches and their capture groups.",
    code: `const text = "Item A: $10, Item B: $20";
const regex = /\\$(\\d+)/g;

for (const match of text.matchAll(regex)) {
  console.log(\`Found price: \${match[1]} at index \${match.index}\`);
}`,
  },
  {
    id: "recipe-callbacks",
    title: "Dynamic Replacements with Replacer Function",
    description:
      "Pass a function to String.prototype.replace() for complex transformations.",
    code: `const text = "Items cost $12, $45, and $100.";

// Convert USD to EUR (approx 0.92x)
const result = text.replace(/\\$(\\d+)/g, (match, p1) => {
  const eur = Math.round(parseInt(p1) * 0.92);
  return \`€\${eur}\`;
});
// Output: 'Items cost €11, €41, and €92.'`,
  },
];

// Maximum four
export const javascriptNavCards: NavCard[] = [
  {
    href: "/python",
    title: "Python",
    description:
      "re module — named groups, verbose mode, and Python-specific flags.",
    icon: "🐍",
  },
  {
    href: "/java",
    title: "Java",
    description:
      "java.util.regex — Pattern, Matcher, flags, and Java engine specifics.",
    icon: "☕",
  },
  {
    href: "/pdf",
    title: "Download PDF",
    description: "Printable one-page regex reference card for offline use.",
    icon: "📄",
  },
  {
    href: "/examples",
    title: "Examples",
    description:
      "Real-world patterns: email, URL, date, IPv4/v6, and phone numbers.",
    icon: "⚡",
  },
];
