export interface RegexEntry {
  syntax: string;
  description: string;
  example?: string;
  /**
   * Controls the "Try →" button on the cheat-sheet:
   *   undefined  → use `syntax` as the pattern (default)
   *   null       → hide the Try button entirely
   *   string     → use this concrete pattern instead of `syntax`
   */
  tryPattern?: string | null;
}

export interface RegexCategory {
  id: string;
  title: string;
  entries: RegexEntry[];
}

export const universalRegex: RegexCategory[] = [
  {
    id: "character-classes",
    title: "Character Classes",
    entries: [
      {
        syntax: ".",
        description: "Any character except newline",
        example: "a.c → 'abc', 'a1c'",
      },
      {
        syntax: "\\w",
        description: "Word character: [a-zA-Z0-9_]",
        example: "\\w+ → 'hello', 'world_1'",
      },
      {
        syntax: "\\W",
        description: "Non-word character",
        example: "\\W → ' ', '!'",
      },
      { syntax: "\\d", description: "Digit: [0-9]", example: "\\d{3} → '123'" },
      { syntax: "\\D", description: "Non-digit", example: "\\D+ → 'abc'" },
      {
        syntax: "\\s",
        description: "Whitespace: space, tab, newline",
        example: "a\\sb → 'a b'",
      },
      {
        syntax: "\\S",
        description: "Non-whitespace",
        example: "\\S+ → 'hello'",
      },
      {
        syntax: "[abc]",
        description: "Character set — matches a, b, or c",
        example: "[aeiou] → 'a', 'e'",
      },
      {
        syntax: "[^abc]",
        description: "Negated set — matches anything not in the set",
        example: "[^aeiou] → 'b', 'c'",
      },
      {
        syntax: "[a-z]",
        description: "Range — matches any character from a to z",
        example: "[a-f]+ → 'abc'",
      },
      {
        syntax: "[a-zA-Z]",
        description: "Combined range — any letter",
        example: "[a-zA-Z]+ → 'Hello'",
      },
    ],
  },
  {
    id: "anchors",
    title: "Anchors",
    entries: [
      {
        syntax: "^",
        description: "Start of string (or line with multiline flag)",
        example: "^Hello → 'Hello world'",
      },
      {
        syntax: "$",
        description: "End of string (or line with multiline flag)",
        example: "world$ → 'Hello world'",
      },
      {
        syntax: "\\b",
        description: "Word boundary",
        example: "\\bcat\\b → 'cat' not 'catch'",
      },
      {
        syntax: "\\B",
        description: "Non-word boundary",
        example: "\\Bcat\\B → 'concatenate'",
      },
      {
        syntax: "\\A",
        description: "Start of string (no multiline)",
        example: "\\AHello → 'Hello world'",
        tryPattern: null,
      },
      {
        syntax: "\\Z",
        description: "End of string (no multiline)",
        example: "world\\Z → 'Hello world'",
        tryPattern: null,
      },
    ],
  },
  {
    id: "quantifiers",
    title: "Quantifiers",
    entries: [
      {
        syntax: "*",
        description: "0 or more (greedy)",
        example: "ab* → 'a', 'ab', 'abbb'",
        tryPattern: "ab*",
      },
      {
        syntax: "+",
        description: "1 or more (greedy)",
        example: "ab+ → 'ab', 'abbb'",
        tryPattern: "ab+",
      },
      {
        syntax: "?",
        description: "0 or 1 (optional)",
        example: "ab? → 'a', 'ab'",
        tryPattern: "ab?",
      },
      {
        syntax: "{n}",
        description: "Exactly n times",
        example: "a{3} → 'aaa'",
        tryPattern: "a{3}",
      },
      {
        syntax: "{n,}",
        description: "n or more times",
        example: "a{2,} → 'aa', 'aaa'",
        tryPattern: "a{2,}",
      },
      {
        syntax: "{n,m}",
        description: "Between n and m times",
        example: "a{2,4} → 'aa', 'aaa', 'aaaa'",
        tryPattern: "a{2,4}",
      },
      {
        syntax: "*?",
        description: "0 or more (lazy / non-greedy)",
        example: "<.*?> → '<a>' not '<a>b</b>'",
        tryPattern: "<.*?>",
      },
      {
        syntax: "+?",
        description: "1 or more (lazy)",
        example: "a+? → first 'a' only",
        tryPattern: "a+?",
      },
      {
        syntax: "??",
        description: "0 or 1 (lazy)",
        example: "ab?? → 'a' preferred",
        tryPattern: "ab??",
      },
    ],
  },
  {
    id: "groups-lookarounds",
    title: "Groups & Lookarounds",
    entries: [
      {
        syntax: "(abc)",
        description: "Capturing group",
        example: "(foo)bar → captures 'foo'",
      },
      {
        syntax: "(?:abc)",
        description: "Non-capturing group",
        example: "(?:foo)bar → groups but doesn't capture",
      },
      {
        syntax: "(?<name>abc)",
        description: "Named capturing group",
        example: "(?<year>\\d{4}) → named capture 'year'",
      },
      {
        syntax: "(?=abc)",
        description: "Positive lookahead",
        example: "foo(?=bar) → 'foo' before 'bar'",
      },
      {
        syntax: "(?!abc)",
        description: "Negative lookahead",
        example: "foo(?!bar) → 'foo' not before 'bar'",
      },
      {
        syntax: "(?<=abc)",
        description: "Positive lookbehind",
        example: "(?<=foo)bar → 'bar' after 'foo'",
      },
      {
        syntax: "(?<!abc)",
        description: "Negative lookbehind",
        example: "(?<!foo)bar → 'bar' not after 'foo'",
      },
      {
        syntax: "\\1",
        description: "Backreference to group 1",
        example: "(\\w)\\1 → 'aa', 'bb'",
      },
      {
        syntax: "(?:a|b)",
        description: "Alternation inside group",
        example: "(?:cat|dog) → 'cat' or 'dog'",
      },
    ],
  },
  {
    id: "flags",
    title: "Flags / Modifiers",
    entries: [
      {
        syntax: "i",
        description: "Case-insensitive matching",
        example: "/hello/i → 'Hello', 'HELLO'",
        tryPattern: null,
      },
      {
        syntax: "g",
        description: "Global — find all matches, not just first",
        example: "/a/g → all 'a's in string",
        tryPattern: null,
      },
      {
        syntax: "m",
        description: "Multiline — ^ and $ match line starts/ends",
        example: "/^foo/m → 'foo' at start of any line",
        tryPattern: null,
      },
      {
        syntax: "s",
        description: "Dotall — . matches newline too",
        example: "/a.b/s → 'a\\nb'",
        tryPattern: null,
      },
      {
        syntax: "u",
        description: "Unicode — enable full Unicode support",
        example: "/\\u{1F600}/u → emoji match",
        tryPattern: null,
      },
      {
        syntax: "y",
        description: "Sticky — match at exact position only",
        example: "/foo/y at index 0",
        tryPattern: null,
      },
      {
        syntax: "x",
        description: "Extended — allow whitespace and comments (some engines)",
        example: "# comment",
        tryPattern: null,
      },
    ],
  },
];

export interface NavCard {
  href: string;
  title: string;
  description: string;
  icon: string;
}

// Maximum four
export const navCards: NavCard[] = [
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
      "re module — named groups, verbose mode, and Python-specific flags.",
    icon: "🐍",
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
    description: "Real-world patterns: email, URL, date, phone, and more.",
    icon: "⚡",
  },
];
