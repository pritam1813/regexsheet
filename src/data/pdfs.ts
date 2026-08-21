export interface PdfCheatSheet {
  title: string;
  lang: string;
  slug: string;
  icon: string;
  badge: string;
  description: string;
  highlights: string[];
  pages: string;
  fileSizeEstimate?: string;
  targetPage: string;
}

export const pdfCheatSheets: PdfCheatSheet[] = [
  {
    title: "Universal Regex Cheat Sheet",
    lang: "Universal",
    slug: "universal",
    icon: "📄",
    badge: "All Engines",
    description:
      "Core syntax, character classes, anchors, quantifiers, groups, lookarounds, and flags compatible across major engines.",
    highlights: ["Character Classes", "Anchors & Boundaries", "Quantifiers & Lookarounds", "Common Flags"],
    pages: "1 Page",
    fileSizeEstimate: "A4 / Letter",
    targetPage: "/",
  },
  {
    title: "JavaScript Regex Cheat Sheet",
    lang: "JavaScript",
    slug: "javascript",
    icon: "💛",
    badge: "ECMAScript 2024",
    description:
      "RegExp methods (test, exec), String methods (match, matchAll, replace, replaceAll, split), v flag, and named capture groups.",
    highlights: ["RegExp & String Methods", "Flags (g, i, m, s, u, v, y)", "Named Groups & Indices", "Code Snippets"],
    pages: "1 Page",
    fileSizeEstimate: "A4 / Letter",
    targetPage: "/javascript",
  },
  {
    title: "Python Regex Cheat Sheet",
    lang: "Python",
    slug: "python",
    icon: "🐍",
    badge: "Python 3 re",
    description:
      "re module functions (search, match, findall, sub), Match object methods, verbose mode (re.X), and raw string notation.",
    highlights: ["re Module Functions", "Match Object API", "re Flags (I, M, S, X, A)", "Regex Recipes"],
    pages: "1 Page",
    fileSizeEstimate: "A4 / Letter",
    targetPage: "/python",
  },
  {
    title: "Java Regex Cheat Sheet",
    lang: "Java",
    slug: "java",
    icon: "☕",
    badge: "Java 8+",
    description:
      "Pattern and Matcher classes, double escaping (\\\\d), embedded flag expressions, and regex stream operations.",
    highlights: ["Pattern & Matcher", "Double Escape Rules", "Embedded Flags (?i)", "MatchResult & Streams"],
    pages: "1 Page",
    fileSizeEstimate: "A4 / Letter",
    targetPage: "/java",
  },
  {
    title: "R Regex Cheat Sheet",
    lang: "R",
    slug: "r",
    icon: "📊",
    badge: "Base R & stringr",
    description:
      "Base R functions (grep, grepl, regexpr, sub) and Tidyverse stringr functions (str_detect, str_extract, str_replace).",
    highlights: ["Base R Functions", "stringr / tidyverse", "PCRE vs TRE engines", "Vectorized Operations"],
    pages: "1 Page",
    fileSizeEstimate: "A4 / Letter",
    targetPage: "/r",
  },
  {
    title: "C# Regex Cheat Sheet",
    lang: "C#",
    slug: "csharp",
    icon: "🔷",
    badge: ".NET 7 / 8 / 9",
    description:
      "System.Text.RegularExpressions, [GeneratedRegex] source generators, Match/Group/Capture model, balancing groups, and timeouts.",
    highlights: ["Regex Class API", "[GeneratedRegex] Source Gen", "RegexOptions Flags", "Balancing Groups & Recipes"],
    pages: "1 Page",
    fileSizeEstimate: "A4 / Letter",
    targetPage: "/csharp",
  },
  {
    title: "SQL Regex Cheat Sheet",
    lang: "SQL",
    slug: "sql",
    icon: "🗄️",
    badge: "Cross-RDBMS",
    description:
      "PostgreSQL POSIX operators (~, ~*), MySQL REGEXP/RLIKE, Oracle/Snowflake REGEXP_LIKE, and BigQuery functions.",
    highlights: ["REGEXP_LIKE / SUBSTR", "PostgreSQL ~ & ~*", "Cloud DW Functions", "Data Masking & Parsing"],
    pages: "1 Page",
    fileSizeEstimate: "A4 / Letter",
    targetPage: "/sql",
  },
  {
    title: "Perl Regex Cheat Sheet",
    lang: "Perl",
    slug: "perl",
    icon: "🐪",
    badge: "Perl 5.14+ & PCRE",
    description:
      "Pattern binding (=~, !~), s/// substitutions, special variables ($1, %+, \\K), recursive regex (?R), and modifiers.",
    highlights: ["Pattern Binding (=~, !~)", "Modifiers (/g, /i, /e, /r)", "Special Vars ($&, %+, \\K)", "Recursive Patterns"],
    pages: "1 Page",
    fileSizeEstimate: "A4 / Letter",
    targetPage: "/perl",
  },
  {
    title: "Notepad++ Regex Cheat Sheet",
    lang: "Notepad++",
    slug: "notepad-plus-plus",
    icon: "📝",
    badge: "Find & Replace",
    description:
      "PCRE regex search mode, universal newlines (\\R), case modifications (\\U, \\L, \\u), keep-out (\\K), and batch text recipes.",
    highlights: ["Universal Newlines (\\R)", "Case Modifiers (\\U, \\L)", "Capture Groups ($1, $2)", "Find & Replace Recipes"],
    pages: "1 Page",
    fileSizeEstimate: "A4 / Letter",
    targetPage: "/notepad-plus-plus",
  },
];

/**
 * Returns the public download URL for a given PDF slug
 */
export function pdfPath(slug: string): string {
  return `/pdfs/regex-${slug}.pdf`;
}
