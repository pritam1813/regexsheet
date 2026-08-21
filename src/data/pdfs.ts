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
];

/**
 * Returns the public download URL for a given PDF slug
 */
export function pdfPath(slug: string): string {
  return `/pdfs/regex-${slug}.pdf`;
}
