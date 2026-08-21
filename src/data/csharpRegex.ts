import type { RegexCategory, NavCard } from "./regex";

export interface CSharpRecipe {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const csharpRegexCategories: RegexCategory[] = [
  {
    id: "regex-class",
    title: "Regex Class (System.Text.RegularExpressions.Regex)",
    entries: [
      {
        syntax: "Regex.IsMatch(input, pattern)",
        description:
          "Checks if regular expression finds a match anywhere within the input string (returns bool)",
        example: 'bool ok = Regex.IsMatch("Order-1234", @"^Order-\\d+$");',
        tryPattern: null,
      },
      {
        syntax: "Regex.IsMatch(input, pattern, options, timeout)",
        description:
          "Checks match with RegexOptions and TimeSpan timeout to protect against catastrophic backtracking (ReDoS)",
        example:
          'Regex.IsMatch(text, @"\\b[A-Z]+\\b", RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));',
        tryPattern: null,
      },
      {
        syntax: "Regex.Match(input, pattern)",
        description:
          "Searches input string for first occurrence of regular expression; returns Match object",
        example: 'Match m = Regex.Match("id: 4209", @"\\d+");',
        tryPattern: null,
      },
      {
        syntax: "Regex.Matches(input, pattern)",
        description:
          "Searches input string for all occurrences of regular expression; returns MatchCollection",
        example: 'MatchCollection mc = Regex.Matches("10, 20, 30", @"\\d+");',
        tryPattern: null,
      },
      {
        syntax: "Regex.Replace(input, pattern, replacement)",
        description:
          "Replaces all matched substrings with specified replacement string (supports $1, ${name}, $&)",
        example: 'string res = Regex.Replace("hello   world", @"\\s+", " ");',
        tryPattern: null,
      },
      {
        syntax: "Regex.Replace(input, pattern, matchEvaluator)",
        description:
          "Replaces matches using a MatchEvaluator delegate / lambda function for dynamic substitutions",
        example: 'Regex.Replace("cat and dog", @"\\b\\w+\\b", m => m.Value.ToUpper());',
        tryPattern: null,
      },
      {
        syntax: "Regex.Split(input, pattern)",
        description:
          "Splits input string into an array of substrings at positions defined by regex match",
        example: 'string[] parts = Regex.Split("apple, banana; cherry", @"[,;]\\s*");',
        tryPattern: null,
      },
      {
        syntax: "Regex.Count(input, pattern, options)",
        description:
          "Counts total number of non-overlapping matches without allocating Match objects (.NET 7+)",
        example: 'int count = Regex.Count("banana", "an"); // 2',
        tryPattern: null,
      },
      {
        syntax: "Regex.EnumerateMatches(span, pattern)",
        description:
          "Zero-allocation high-performance ref struct enumerator over ReadOnlySpan<char> (.NET 7+)",
        example: "foreach (ValueMatch vm in Regex.EnumerateMatches(span, pattern)) { ... }",
        tryPattern: null,
      },
      {
        syntax: "Regex.Escape(str) / Regex.Unescape(str)",
        description:
          "Escapes regex metacharacters with backslashes or unescapes any escaped characters in a string",
        example: 'Regex.Escape("user[1].id") → @"user\\[1\\]\\.id"',
        tryPattern: null,
      },
      {
        syntax: "new Regex(pattern, options, timeout)",
        description:
          "Creates an instance of Regex with compiled or interpreted options and optional match timeout",
        example: 'var rx = new Regex(@"\\d+", RegexOptions.Compiled, TimeSpan.FromSeconds(1));',
        tryPattern: null,
      },
    ],
  },
  {
    id: "source-generator",
    title: "Source Generators & Modern C# (.NET 7/8/9+)",
    entries: [
      {
        syntax: '[GeneratedRegex("pattern")]',
        description:
          "C# 11 / .NET 7+ compile-time source generator attribute on partial Regex method (Zero startup overhead, AOT-friendly)",
        example: '[GeneratedRegex(@"^\\w+@\\w+\\.\\w+$", RegexOptions.IgnoreCase)]\nprivate static partial Regex EmailRegex();',
        tryPattern: null,
      },
      {
        syntax: '[GeneratedRegex("pattern", options, matchTimeoutMilliseconds: 500)]',
        description:
          "Generates C# source code for regex matching engine at compile time with timeout safeguard",
        example: '[GeneratedRegex(@"\\d+", RegexOptions.None, 200)]\nprivate static partial Regex Numbers();',
        tryPattern: null,
      },
      {
        syntax: 'RegexOptions.NonBacktracking',
        description:
          ".NET 7+ engine using linear time DFA/NFA matching algorithms to guarantee O(n) runtime and eliminate ReDoS vulnerabilities",
        example: 'new Regex(@"^(a+)+$", RegexOptions.NonBacktracking)',
        tryPattern: null,
      },
      {
        syntax: '@"pattern"',
        description:
          "Verbatim string literal — backslashes are treated literally, avoiding double-escaping in C#",
        example: '@"\\d{4}-\\d{2}-\\d{2}" instead of "\\\\d{4}-\\\\d{2}-\\\\d{2}"',
        tryPattern: null,
      },
      {
        syntax: '"""pattern"""',
        description:
          "Raw string literal (C# 11+) — allows quotes and unescaped characters across multiple lines without escape sequences",
        example: 'var pat = """^[a-z0-9"\'_]+$""";',
        tryPattern: null,
      },
    ],
  },
  {
    id: "match-group-capture",
    title: "Match, Group, & Capture Object Model",
    entries: [
      {
        syntax: "match.Success",
        description:
          "Boolean property indicating whether the regex match succeeded",
        example: "if (m.Success) { ... }",
        tryPattern: null,
      },
      {
        syntax: "match.Value / match.ValueSpan",
        description:
          "The matched substring value (or ReadOnlySpan<char> in .NET 7+ for zero allocation)",
        example: 'm.Value → "2026"',
        tryPattern: null,
      },
      {
        syntax: "match.Index / match.Length",
        description:
          "The zero-based start index and character length of the matched substring in original input",
        example: "m.Index → 12, m.Length → 4",
        tryPattern: null,
      },
      {
        syntax: "match.NextMatch()",
        description:
          "Searches the input string for the next match starting after the previous match ended",
        example: "while (m.Success) { ...; m = m.NextMatch(); }",
        tryPattern: null,
      },
      {
        syntax: "match.Groups[index] / match.Groups[name]",
        description:
          "Accesses captured groups by 0-based integer index (Groups[0] is entire match) or named group string key",
        example: 'string year = m.Groups["year"].Value;',
        tryPattern: null,
      },
      {
        syntax: "group.Success / group.Value",
        description:
          "Indicates if an optional capturing group participated in the match and retrieves its captured value",
        example: 'if (m.Groups["ext"].Success) { ... }',
        tryPattern: null,
      },
      {
        syntax: "group.Captures",
        description:
          "Collection of all individual Capture substrings for repeated capture groups (e.g. (\\w+)+)",
        example: 'foreach (Capture c in m.Groups["word"].Captures) { ... }',
        tryPattern: null,
      },
      {
        syntax: "capture.Index / capture.Length / capture.Value",
        description:
          "Zero-based starting position, length, and substring captured by a single repetition capture",
        example: "c.Index → 5, c.Length → 3, c.Value → 'foo'",
        tryPattern: null,
      },
      {
        syntax: "match.Result(replacementPattern)",
        description:
          "Expands replacement pattern string ($1, ${name}, $&) in context of this match",
        example: 'm.Result("${first} ${last}") → "Jane Doe"',
        tryPattern: null,
      },
    ],
  },
  {
    id: "regex-options",
    title: "RegexOptions Flags & Modifiers",
    entries: [
      {
        syntax: "RegexOptions.IgnoreCase",
        description:
          "Enables case-insensitive matching (inline syntax: (?i)...(?-i))",
        example: 'Regex.IsMatch("ABC", "abc", RegexOptions.IgnoreCase) → true',
        tryPattern: null,
      },
      {
        syntax: "RegexOptions.Multiline",
        description:
          "Changes ^ and $ to match at the beginning and end of each line instead of whole string (inline: (?m))",
        example: 'Regex.Matches(lines, @"^#\\s+", RegexOptions.Multiline)',
        tryPattern: null,
      },
      {
        syntax: "RegexOptions.Singleline",
        description:
          "Dot-all mode: allows the dot (.) character to match every character, including newline \\n (inline: (?s))",
        example: 'Regex.Match(html, @"<div>.*</div>", RegexOptions.Singleline)',
        tryPattern: null,
      },
      {
        syntax: "RegexOptions.ExplicitCapture",
        description:
          "Only captures explicitly named groups (?<name>...); unnamed parentheses ( ... ) act as non-capturing (inline: (?n))",
        example: 'new Regex(@"(abc)(?<num>\\d+)", RegexOptions.ExplicitCapture)',
        tryPattern: null,
      },
      {
        syntax: "RegexOptions.IgnorePatternWhitespace",
        description:
          "Extended/verbose mode: ignores unescaped whitespace and enables line comments with # (inline: (?x))",
        example: '@"\\d{4} # Year\\n-\\d{2} # Month"',
        tryPattern: null,
      },
      {
        syntax: "RegexOptions.Compiled",
        description:
          "Compiles regular expression to MSIL bytecode at runtime for faster execution at cost of startup time",
        example: 'new Regex(@"\\w+", RegexOptions.Compiled)',
        tryPattern: null,
      },
      {
        syntax: "RegexOptions.NonBacktracking",
        description:
          ".NET 7+ non-backtracking engine with guaranteed linear-time matching; cannot be combined with RightToLeft, ECMAScript",
        example: 'new Regex(@"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}", RegexOptions.NonBacktracking)',
        tryPattern: null,
      },
      {
        syntax: "RegexOptions.RightToLeft",
        description:
          "Searches input string from right to left instead of left to right",
        example: 'new Regex(@"\\d+", RegexOptions.RightToLeft).Match("10 20 30").Value → "30"',
        tryPattern: null,
      },
      {
        syntax: "RegexOptions.CultureInvariant",
        description:
          "Ignores cultural language differences in string casing comparisons (uses invariant culture)",
        example: 'RegexOptions.IgnoreCase | RegexOptions.CultureInvariant',
        tryPattern: null,
      },
      {
        syntax: "RegexOptions.ECMAScript",
        description:
          "Enables ECMAScript-compliant behavior (can be combined only with IgnoreCase, Multiline, Compiled)",
        example: 'RegexOptions.ECMAScript | RegexOptions.IgnoreCase',
        tryPattern: null,
      },
    ],
  },
  {
    id: "csharp-syntax",
    title: ".NET Specific Syntax & Advanced Constructs",
    entries: [
      {
        syntax: "(?<name>pattern) / (?'name'pattern)",
        description:
          "Named capture group — captures matched subexpression and assigns it a group name",
        example: "(?<area>\\d{3})-(?<local>\\d{4})",
        tryPattern: "(?<area>\\d{3})-(?<local>\\d{4})",
      },
      {
        syntax: "(?<close-open>pattern)",
        description:
          "Balancing group definition (unique to .NET!) — deletes open group and captures interval between nested pairs",
        example: "^[^()]*(((?'Open'\\()[^()]*)+((?'Close-Open'\\))[^()]*)+)*(?(Open)(?!))$",
        tryPattern: null,
      },
      {
        syntax: "(?(name)yes|no) / (?(1)yes|no)",
        description:
          "Conditional matching — if named/numbered group matched, matches 'yes' pattern, else matches 'no' pattern",
        example: "^(?<paren>\\()?(\\d{3})(?(paren)\\)|-)(\\d{4})$",
        tryPattern: null,
      },
      {
        syntax: "(?(?=pattern)yes|no)",
        description:
          "Conditional matching with zero-width lookahead assertion as test condition",
        example: "(?(?=\\d{2}-)\\d{2}-\\d{2}|\\d{4})",
        tryPattern: null,
      },
      {
        syntax: "(?im-s:pattern)",
        description:
          "Scoped inline flag modifiers — enables 'i' and 'm' and disables 's' only within enclosed subexpression",
        example: "(?i:hello) (?-i:WORLD)",
        tryPattern: "(?i:hello) (?-i:WORLD)",
      },
      {
        syntax: "(?<=pattern) / (?<!pattern)",
        description:
          "Lookbehind assertions — .NET fully supports variable-length and non-fixed-width lookbehinds",
        example: "(?<=[a-z]+:)\\d+",
        tryPattern: "(?<=[a-z]+:)\\d+",
      },
      {
        syntax: "\\p{L} / \\p{N} / \\p{P} / \\p{Lu}",
        description:
          "Unicode general categories: Letter (\\p{L}), Number (\\p{N}), Punctuation (\\p{P}), Uppercase Letter (\\p{Lu})",
        example: "\\p{Lu}\\p{Ll}+",
        tryPattern: "\\p{Lu}\\p{Ll}+",
      },
      {
        syntax: "\\p{IsBasicLatin} / \\p{IsCyrillic}",
        description:
          "Unicode named block matching (e.g. \\p{IsGreek}, \\p{IsArabic}, \\p{IsDevanagari})",
        example: "\\p{IsBasicLatin}+",
        tryPattern: "\\p{IsBasicLatin}+",
      },
      {
        syntax: "$1, ${name}, $&, $`, $', $+",
        description:
          "Replacement tokens: numbered group ($1), named group (${name}), full match ($&), before ($`), after ($'), last group ($+)",
        example: 'Regex.Replace("John Smith", @"(?<first>\\w+) (?<last>\\w+)", "${last}, ${first}")',
        tryPattern: null,
      },
      {
        syntax: "\\G",
        description:
          "Matches at the position where the previous match ended (contiguous matching)",
        example: "\\G\\d{2}",
        tryPattern: "\\G\\d{2}",
      },
    ],
  },
];

export const csharpRecipes: CSharpRecipe[] = [
  {
    id: "recipe-source-gen",
    title: "Compile-Time Source Generated Regex (.NET 7/8/9)",
    description:
      "The modern high-performance standard in C#. Emits highly optimized C# regex code during compilation with zero startup delay and full Native AOT support.",
    code: `using System;
using System.Text.RegularExpressions;

public static partial class RegexPatterns
{
    // C# 11+ compile-time generated regex
    [GeneratedRegex(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", RegexOptions.IgnoreCase, matchTimeoutMilliseconds: 250)]
    public static partial Regex EmailValidator();

    [GeneratedRegex(@"\\b(?<area>\\d{3})-(?<prefix>\\d{3})-(?<line>\\d{4})\\b")]
    public static partial Regex PhoneNumber();
}

public class Program
{
    public static void Main()
    {
        string email = "user.name+tag@example.com";
        bool isValid = RegexPatterns.EmailValidator().IsMatch(email);
        Console.WriteLine($"Valid: {isValid}"); // Valid: True
    }
}`,
  },
  {
    id: "recipe-find-iterate",
    title: "Find & Iterate All Matches with Named Groups",
    description:
      "Extract structured data from logs or text into strongly-typed C# records using Regex.Matches and named capture groups.",
    code: `using System;
using System.Text.RegularExpressions;

public record LogEntry(string Timestamp, string Level, string Message);

public class LogParser
{
    private static readonly Regex LogRegex = new(
        @"^\\[(?<time>\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})\\] \\[(?<level>INFO|WARN|ERROR)\\] (?<msg>.+)$",
        RegexOptions.Multiline | RegexOptions.Compiled
    );

    public static void Main()
    {
        string logData = """
        [2026-08-21 10:15:30] [INFO] Server started on port 5000
        [2026-08-21 10:16:02] [WARN] High memory usage detected
        [2026-08-21 10:17:45] [ERROR] Database connection failed
        """;

        MatchCollection matches = LogRegex.Matches(logData);
        foreach (Match match in matches)
        {
            var entry = new LogEntry(
                Timestamp: match.Groups["time"].Value,
                Level: match.Groups["level"].Value,
                Message: match.Groups["msg"].Value
            );
            Console.WriteLine($"{entry.Level} at {entry.Timestamp}: {entry.Message}");
        }
    }
}`,
  },
  {
    id: "recipe-dynamic-replace",
    title: "Dynamic String Replacement with MatchEvaluator",
    description:
      "Transform matched tokens dynamically using a C# lambda delegate, such as converting snake_case identifiers to camelCase.",
    code: `using System;
using System.Text.RegularExpressions;

public class Replacer
{
    public static void Main()
    {
        string input = "first_name, last_name, user_account_id, is_active";

        // Convert snake_case to camelCase
        string camelCase = Regex.Replace(input, @"_([a-z])", m =>
        {
            return m.Groups[1].Value.ToUpperInvariant();
        });

        Console.WriteLine(camelCase);
        // Output: firstName, lastName, userAccountId, isActive

        // Mask sensitive credit card digits keeping last 4
        string rawCard = "Card: 4532-8971-9823-1234";
        string masked = Regex.Replace(rawCard, @"\\b(?:\\d{4}-){3}(\\d{4})\\b", "****-****-****-$1");
        Console.WriteLine(masked);
        // Output: Card: ****-****-****-1234
    }
}`,
  },
  {
    id: "recipe-span-enumerate",
    title: "Zero-Allocation Match Enumeration with ReadOnlySpan<char>",
    description:
      "High-performance regex scanning in .NET 7/8/9 with Regex.EnumerateMatches and ValueMatch ref structs without heap allocations.",
    code: `using System;
using System.Text.RegularExpressions;

public class HighPerfScanner
{
    // Fast non-allocating regex search over spans
    private static readonly Regex TokenRegex = new(@"\\b[A-Z]{2,}\\d+\\b", RegexOptions.Compiled);

    public static void ProcessPayload(ReadOnlySpan<char> payload)
    {
        // EnumerateMatches returns ValueMatchEnumerator without allocating Match objects
        foreach (ValueMatch vm in TokenRegex.EnumerateMatches(payload))
        {
            ReadOnlySpan<char> matchSpan = payload.Slice(vm.Index, vm.Length);
            Console.WriteLine($"Found token at index {vm.Index} ({vm.Length} chars): {matchSpan.ToString()}");
        }
    }

    public static void Main()
    {
        string text = "Order AB102 processed with voucher DISCOUNT50 and ref UK999.";
        ProcessPayload(text.AsSpan());
    }
}`,
  },
  {
    id: "recipe-balancing-groups",
    title: "Balancing Groups for Nested Parentheses / Brackets",
    description:
      ".NET's unique balancing group feature allows matching recursively nested structures like balanced brackets, mathematical expressions, or tags.",
    code: `using System;
using System.Text.RegularExpressions;

public class BalancingGroupExample
{
    // Matches properly balanced nested parentheses: (a + (b * (c - d)))
    private static readonly Regex BalancedParens = new(
        @"^[^()]*(((?'Open'\\()[^()]*)+((?'Close-Open'\\))[^()]*)+)*(?(Open)(?!))$",
        RegexOptions.Compiled
    );

    public static void Main()
    {
        string[] testCases = {
            "(a + b)",
            "(a + (b * (c - 1)))",
            "((a + b) * (c + d))",
            "(a + b))",          // unbalanced closing
            "((a + b)"           // unbalanced opening
        };

        foreach (var test in testCases)
        {
            bool isBalanced = BalancedParens.IsMatch(test);
            Console.WriteLine($"{test,-25} -> {(isBalanced ? "Balanced ✅" : "Unbalanced ❌")}");
        }
    }
}`,
  },
  {
    id: "recipe-redos-timeout",
    title: "ReDoS Prevention: NonBacktracking & Timeouts",
    description:
      "Safeguard your ASP.NET Core APIs and background jobs from catastrophic backtracking using NonBacktracking engine and explicit Timeouts.",
    code: `using System;
using System.Text.RegularExpressions;

public class SafeRegexExample
{
    // 1. Using NonBacktracking (.NET 7+) for linear O(n) execution guarantee
    private static readonly Regex SafePattern = new(
        @"^([a-zA-Z0-9_-]+\\.)+[a-zA-Z]{2,}$",
        RegexOptions.NonBacktracking
    );

    // 2. Using explicit match timeout on classic backtracking engine
    public static bool TryValidateInput(string untrustedInput, out string error)
    {
        try
        {
            var timeout = TimeSpan.FromMilliseconds(100);
            bool match = Regex.IsMatch(untrustedInput, @"^(a+)+$", RegexOptions.None, timeout);
            error = string.Empty;
            return match;
        }
        catch (RegexMatchTimeoutException ex)
        {
            error = $"Regex matching exceeded limit ({ex.MatchTimeout.TotalMilliseconds}ms)";
            return false;
        }
    }

    public static void Main()
    {
        string attackPayload = new string('a', 30) + "!";
        bool ok = TryValidateInput(attackPayload, out string err);
        Console.WriteLine($"Result: {ok}, Error: {err}");
    }
}`,
  },
];

// Maximum four
export const csharpNavCards: NavCard[] = [
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
    href: "/java",
    title: "Java",
    description:
      "java.util.regex — Pattern, Matcher, stream ops, and double escape rules.",
    icon: "☕",
  },
  {
    href: "/examples",
    title: "Examples",
    description:
      "Real-world patterns: email, URL, date, IPv4/v6, and phone numbers.",
    icon: "⚡",
  },
];
