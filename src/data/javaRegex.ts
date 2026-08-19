import type { RegexCategory, NavCard } from "./regex";

export const javaRegexCategories: RegexCategory[] = [
  {
    id: "pattern-class",
    title: "Pattern Class (java.util.regex.Pattern)",
    entries: [
      {
        syntax: "Pattern.compile(regex)",
        description: "Compiles the given regular expression string into a reusable Pattern object",
        example: 'Pattern p = Pattern.compile("\\\\d+");',
        tryPattern: null,
      },
      {
        syntax: "Pattern.compile(regex, flags)",
        description: "Compiles pattern with one or more bitwise-OR flags (e.g. Pattern.CASE_INSENSITIVE)",
        example: 'Pattern p = Pattern.compile("abc", Pattern.CASE_INSENSITIVE);',
        tryPattern: null,
      },
      {
        syntax: "Pattern.matches(regex, input)",
        description: "Quick one-liner check if regex matches the entire input CharSequence",
        example: 'Pattern.matches("\\\\d{4}", "2026") → true',
        tryPattern: null,
      },
      {
        syntax: "pattern.matcher(input)",
        description: "Creates a Matcher object that will match the given input against this pattern",
        example: "Matcher m = p.matcher(inputSequence);",
        tryPattern: null,
      },
      {
        syntax: "pattern.split(input)",
        description: "Splits the input around matches of this pattern into a String[] array",
        example: 'p.split("apple,banana,cherry") → String[3]',
        tryPattern: null,
      },
      {
        syntax: "pattern.split(input, limit)",
        description: "Splits input with threshold limit on the number of matching substrings",
        example: 'p.split("a:b:c:d", 2) → ["a", "b:c:d"]',
        tryPattern: null,
      },
      {
        syntax: "pattern.splitAsStream(input)",
        description: "Creates a Stream<String> from the input split around matches (Java 8+)",
        example: 'p.splitAsStream(text).forEach(System.out::println);',
        tryPattern: null,
      },
      {
        syntax: "pattern.asPredicate()",
        description: "Creates a Predicate<String> for filtering streams using matcher.find() (Java 8+)",
        example: 'list.stream().filter(p.asPredicate()).toList();',
        tryPattern: null,
      },
      {
        syntax: "pattern.asMatchPredicate()",
        description: "Creates a Predicate<String> that matches entire string using matcher.matches() (Java 11+)",
        example: 'list.stream().filter(p.asMatchPredicate()).toList();',
        tryPattern: null,
      },
      {
        syntax: "Pattern.quote(s)",
        description: "Returns a literal pattern String wrapped in \\Q...\\E for exact matching",
        example: 'Pattern.quote("user[1].id") → "\\Quser[1].id\\E"',
        tryPattern: null,
      },
      {
        syntax: "pattern.pattern()",
        description: "Returns the original regular expression string from which this pattern was compiled",
        example: 'p.pattern() → "\\\\d+"',
        tryPattern: null,
      },
      {
        syntax: "pattern.flags()",
        description: "Returns this pattern's match flags bitmask",
        example: "p.flags() → 2 (Pattern.CASE_INSENSITIVE)",
        tryPattern: null,
      },
    ],
  },
  {
    id: "matcher-methods",
    title: "Matcher Class (java.util.regex.Matcher)",
    entries: [
      {
        syntax: "m.find()",
        description: "Attempts to find the next subsequence of the input sequence that matches the pattern",
        example: "while (m.find()) { ... }",
        tryPattern: null,
      },
      {
        syntax: "m.find(start)",
        description: "Resets this matcher and attempts to find next match starting from the specified index",
        example: "m.find(10) → boolean",
        tryPattern: null,
      },
      {
        syntax: "m.matches()",
        description: "Attempts to match the entire input region against the pattern",
        example: 'm.matches() → true for exact match',
        tryPattern: null,
      },
      {
        syntax: "m.lookingAt()",
        description: "Attempts to match the input sequence, starting at the beginning, against the pattern",
        example: 'm.lookingAt() → true if prefix matches',
        tryPattern: null,
      },
      {
        syntax: "m.group()",
        description: "Returns the input subsequence matched by the previous match (group 0)",
        example: 'm.group() → "2026-08-19"',
        tryPattern: null,
      },
      {
        syntax: "m.group(n)",
        description: "Returns the input subsequence captured by the given 1-based group index",
        example: 'm.group(1) → "2026"',
        tryPattern: null,
      },
      {
        syntax: "m.group(name)",
        description: "Returns the input subsequence captured by the named group (?<name>...) (Java 7+)",
        example: 'm.group("year") → "2026"',
        tryPattern: null,
      },
      {
        syntax: "m.groupCount()",
        description: "Returns the number of capturing groups in this matcher's pattern",
        example: "m.groupCount() → 2",
        tryPattern: null,
      },
      {
        syntax: "m.start() / m.end()",
        description: "Returns start (inclusive) and end (exclusive) character offset of the match",
        example: "m.start() → 0, m.end() → 4",
        tryPattern: null,
      },
      {
        syntax: "m.start(group) / m.end(group)",
        description: "Returns start / end offset of the subsequence captured by group index or name",
        example: 'm.start("year") → 0, m.end("year") → 4',
        tryPattern: null,
      },
      {
        syntax: "m.replaceAll(replacement)",
        description: "Replaces every subsequence of input sequence that matches pattern with replacement",
        example: 'm.replaceAll("-") → "hello-world"',
        tryPattern: null,
      },
      {
        syntax: "m.replaceFirst(replacement)",
        description: "Replaces first subsequence of input that matches pattern with replacement",
        example: 'm.replaceFirst("#") → "#123 456"',
        tryPattern: null,
      },
      {
        syntax: "m.replaceAll(function)",
        description: "Replaces each match with result of applying function to MatchResult (Java 9+)",
        example: 'm.replaceAll(mr -> mr.group().toUpperCase())',
        tryPattern: null,
      },
      {
        syntax: "m.results()",
        description: "Returns a Stream<MatchResult> of all match results in input order (Java 9+)",
        example: 'm.results().map(MatchResult::group).toList()',
        tryPattern: null,
      },
      {
        syntax: "m.appendReplacement(sb, repl)",
        description: "Non-terminal step: appends preceding text and replacement to StringBuffer/StringBuilder",
        example: "m.appendReplacement(sb, newText);",
        tryPattern: null,
      },
      {
        syntax: "m.appendTail(sb)",
        description: "Terminal step: appends remaining input text after last match to StringBuilder (Java 9+)",
        example: "m.appendTail(sb);",
        tryPattern: null,
      },
      {
        syntax: "m.reset([input])",
        description: "Resets this matcher with optional new input CharSequence",
        example: 'm.reset("new test string");',
        tryPattern: null,
      },
      {
        syntax: "m.usePattern(newPattern)",
        description: "Changes the Pattern that this Matcher uses to find matches",
        example: "m.usePattern(Pattern.compile(\"\\\\w+\"));",
        tryPattern: null,
      },
    ],
  },
  {
    id: "string-methods",
    title: "String Class Regex Methods",
    entries: [
      {
        syntax: 'str.matches(regex)',
        description: "Returns true if and only if the entire string matches the given regular expression",
        example: '"12345".matches("\\\\d+") → true',
        tryPattern: null,
      },
      {
        syntax: 'str.replaceAll(regex, repl)',
        description: "Replaces each substring matching regex with replacement string (supports $1, ${name})",
        example: '"a1b2c3".replaceAll("\\\\d", "#") → "a#b#c#"',
        tryPattern: null,
      },
      {
        syntax: 'str.replaceFirst(regex, repl)',
        description: "Replaces first substring matching regex with replacement string",
        example: '"foo 1 2".replaceFirst("\\\\d", "#") → "foo # 2"',
        tryPattern: null,
      },
      {
        syntax: 'str.split(regex)',
        description: "Splits string around matches of regex; trailing empty strings are discarded",
        example: '"a,b,,c".split(",") → ["a", "b", "", "c"]',
        tryPattern: null,
      },
      {
        syntax: 'str.split(regex, limit)',
        description: "Splits string around matches with control on result array length (limit < 0 retains trailing empty strings)",
        example: '"a:b:c:".split(":", -1) → ["a", "b", "c", ""]',
        tryPattern: null,
      },
    ],
  },
  {
    id: "flags",
    title: "Java Pattern Flags",
    entries: [
      {
        syntax: "Pattern.CASE_INSENSITIVE, (?i)",
        description: "Enables case-insensitive matching (ASCII by default; combine with UNICODE_CASE for full Unicode)",
        example: 'Pattern.compile("cat", Pattern.CASE_INSENSITIVE)',
        tryPattern: null,
      },
      {
        syntax: "Pattern.MULTILINE, (?m)",
        description: "^ and $ match just after / before line terminators, as well as start / end of input",
        example: 'Pattern.compile("^\\\\w+", Pattern.MULTILINE)',
        tryPattern: null,
      },
      {
        syntax: "Pattern.DOTALL, (?s)",
        description: "The dot (.) character matches any character including line terminators (\\n, \\r)",
        example: 'Pattern.compile("<div>.*</div>", Pattern.DOTALL)',
        tryPattern: null,
      },
      {
        syntax: "Pattern.COMMENTS, (?x)",
        description: "Permits whitespace and comments starting with # inside pattern until end of line",
        example: 'Pattern.compile("\\\\d{3} # area", Pattern.COMMENTS)',
        tryPattern: null,
      },
      {
        syntax: "Pattern.UNICODE_CHARACTER_CLASS, (?U)",
        description: "Enables Unicode version of predefined classes (\\w, \\d, \\s) matching Unicode specs (Java 7+)",
        example: 'Pattern.compile("\\\\w+", Pattern.UNICODE_CHARACTER_CLASS)',
        tryPattern: null,
      },
      {
        syntax: "Pattern.UNICODE_CASE, (?u)",
        description: "Enables Unicode-aware case folding when used alongside Pattern.CASE_INSENSITIVE",
        example: 'Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE',
        tryPattern: null,
      },
      {
        syntax: "Pattern.UNIX_LINES, (?d)",
        description: "Only the \\n character is recognized as a line terminator in ^, $, and . modes",
        example: 'Pattern.compile("^line", Pattern.UNIX_LINES)',
        tryPattern: null,
      },
      {
        syntax: "Pattern.CANON_EQ",
        description: "Enables canonical equivalence matching (e.g. character with accent vs combining accent)",
        example: 'Pattern.compile("a\u030A", Pattern.CANON_EQ)',
        tryPattern: null,
      },
      {
        syntax: "Pattern.LITERAL",
        description: "Specifies that pattern contains literal characters with no metacharacter meanings",
        example: 'Pattern.compile(".*+?", Pattern.LITERAL)',
        tryPattern: null,
      },
      {
        syntax: "Bitwise OR: FlagA | FlagB",
        description: "Combine multiple flags using the bitwise OR (|) operator",
        example: "Pattern.CASE_INSENSITIVE | Pattern.MULTILINE",
        tryPattern: null,
      },
    ],
  },
  {
    id: "java-syntax",
    title: "Java-Specific Syntax, POSIX & Properties",
    entries: [
      {
        syntax: '"\\\\d", "\\\\b", "\\\\s"',
        description: "Double backslash in Java strings: Java compiler uses 1st escape, regex engine uses 2nd",
        example: 'String pat = "\\\\b[A-Z]+\\\\b";',
        tryPattern: null,
      },
      {
        syntax: '"""\\\\d+"""',
        description: "Java 15+ Text Blocks (triple quotes) simplify multiline regex, though backslashes still escape",
        example: '"""\n\\\\d{4}-\\\\d{2}-\\\\d{2}\n"""',
        tryPattern: null,
      },
      {
        syntax: "(?<name>X)",
        description: "Named capturing group — captures matching text accessible via matcher.group(\"name\")",
        example: '(?<zip>\\d{5}) → m.group("zip")',
        tryPattern: "(?<zip>\\d{5})",
      },
      {
        syntax: "\\k<name>",
        description: "Named backreference within the regex pattern to an earlier named group",
        example: `(?<quote>['"]).*?\\k<quote>`,
        tryPattern: `(?<quote>['"]).*?\\k<quote>`,
      },
      {
        syntax: "${name} / $1",
        description: "Named and indexed group backreferences in replaceAll() replacement strings",
        example: 'm.replaceAll("Found: ${name} (id: $1)")',
        tryPattern: null,
      },
      {
        syntax: "X*+, X++, X?+, X{n,m}+",
        description: "Possessive quantifiers — eat greedily and never backtrack; prevents ReDoS vulnerabilities",
        example: '"[^\"]*+" → matches quoted string fast',
        tryPattern: null,
      },
      {
        syntax: "[a-z&&[def]]",
        description: "Character class intersection: matches characters present in both sets ('d', 'e', or 'f')",
        example: '[a-z&&[aeiou]] → vowels only',
        tryPattern: null,
      },
      {
        syntax: "[a-z&&[^bc]]",
        description: "Character class subtraction: matches a through z except 'b' and 'c'",
        example: '[0-9&&[^2468]] → odd digits',
        tryPattern: null,
      },
      {
        syntax: "[a-d[m-p]]",
        description: "Character class union: matches union of sets (equivalent to [a-dm-p])",
        example: '[a-c[1-3]] → [a-c1-3]',
        tryPattern: "[a-dm-p]",
      },
      {
        syntax: "\\p{Lower}, \\p{Upper}, \\p{Digit}",
        description: "POSIX character classes: Lowercase [a-z], Uppercase [A-Z], Digits [0-9]",
        example: '\\p{Digit}+ → matches numbers',
        tryPattern: null,
      },
      {
        syntax: "\\p{Alpha}, \\p{Alnum}, \\p{Punct}",
        description: "POSIX alphabetic [a-zA-Z], alphanumeric, and punctuation characters",
        example: '\\p{Alnum}+ → "User1042"',
        tryPattern: null,
      },
      {
        syntax: "\\p{Blank}, \\p{Space}, \\p{Cntrl}",
        description: "POSIX space or tab [ \\t], whitespace [ \\t\\n\\x0B\\f\\r], and control character",
        example: '\\p{Blank} → space or tab only',
        tryPattern: null,
      },
      {
        syntax: "\\p{javaLowerCase}, \\p{javaWhitespace}",
        description: "Java character property classes matching Character.isLowerCase() / isWhitespace()",
        example: '\\p{javaWhitespace}+',
        tryPattern: null,
      },
      {
        syntax: "\\p{IsGreek}, \\p{IsLatin}, \\p{Sc}",
        description: "Unicode Scripts / Blocks and Categories (\\p{Sc} for currency symbols: $, €, ¥)",
        example: '\\p{Sc}\\\\d+ → "$100", "€50"',
        tryPattern: null,
      },
      {
        syntax: "\\Q...\\E",
        description: "Literal quotation — all characters between \\Q and \\E are treated as literal text",
        example: '\\Q*.[a-z]\\E matches literal "*.[a-z]"',
        tryPattern: null,
      },
      {
        syntax: "\\R",
        description: "Any Unicode line break sequence (\\u000D\\u000A|\\u000A|...) (Java 8+)",
        example: 'Pattern.compile("\\\\R") splits any OS newline',
        tryPattern: null,
      },
      {
        syntax: "\\A, \\Z, \\z, \\G",
        description: "Boundaries: \\A (beginning of input), \\Z (end except final terminator), \\z (strict end of input), \\G (end of previous match)",
        example: '\\\\A[a-z]+\\\\z',
        tryPattern: null,
      },
    ],
  },
];

export interface JavaRecipe {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const javaRecipes: JavaRecipe[] = [
  {
    id: "recipe-named-groups",
    title: "Named Groups & Extraction",
    description: "Extract structured components from logs or strings using named groups (?<name>...) and matcher.group(name).",
    code: `import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LogParser {
    public static void main(String[] args) {
        String log = "2026-08-19 [ERROR] User 1042 connection timed out";
        Pattern pattern = Pattern.compile(
            "(?<date>\\\\d{4}-\\\\d{2}-\\\\d{2}) \\\\[(?<level>[A-Z]+)\\\\] (?<msg>.*)"
        );

        Matcher matcher = pattern.matcher(log);
        if (matcher.find()) {
            String date  = matcher.group("date");
            String level = matcher.group("level");
            String msg   = matcher.group("msg");

            System.out.println("Date:  " + date);  // 2026-08-19
            System.out.println("Level: " + level); // ERROR
            System.out.println("Msg:   " + msg);   // User 1042 connection timed out
        }
    }
}`,
  },
  {
    id: "recipe-stream-results",
    title: "Stream All Matches (Java 9+)",
    description: "Use matcher.results() to process all matches as a standard Java Stream<MatchResult>.",
    code: `import java.util.List;
import java.util.regex.MatchResult;
import java.util.regex.Pattern;

public class StreamMatches {
    public static void main(String[] args) {
        String text = "Ports: 8080, 443, 80, 22, 5432";
        Pattern pattern = Pattern.compile("\\\\b\\\\d+\\\\b");

        // Extract all ports as integer list
        List<Integer> ports = pattern.matcher(text)
            .results()
            .map(MatchResult::group)
            .map(Integer::parseInt)
            .toList();

        System.out.println(ports); // [8080, 443, 80, 22, 5432]
    }
}`,
  },
  {
    id: "recipe-dynamic-replace",
    title: "Dynamic Replacements with Lambda (Java 9+)",
    description: "Transform matches dynamically using matcher.replaceAll(Function<MatchResult, String>).",
    code: `import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CurrencyConverter {
    public static void main(String[] args) {
        String input = "Items cost $10, $45, and $100.";
        Pattern pattern = Pattern.compile("\\\\$(\\\\d+)");
        Matcher matcher = pattern.matcher(input);

        // Convert USD prices to EUR (~0.92x)
        String converted = matcher.replaceAll(mr -> {
            int usd = Integer.parseInt(mr.group(1));
            int eur = (int) Math.round(usd * 0.92);
            return "€" + eur;
        });

        System.out.println(converted);
        // Output: Items cost €9, €41, and €92.
    }
}`,
  },
  {
    id: "recipe-possessive-redos",
    title: "Possessive Quantifiers (ReDoS Prevention)",
    description: "Use possessive quantifiers (*+, ++) to eliminate catastrophic backtracking and safeguard performance.",
    code: `import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SafeParsing {
    public static void main(String[] args) {
        String html = "<div class=\\"hero-box\\">Content</div>";

        // Possessive '*+' grabs chars without backtracking
        Pattern safePattern = Pattern.compile("\"([^\"]*+)\"");
        Matcher matcher = safePattern.matcher(html);

        while (matcher.find()) {
            System.out.println("Attribute value: " + matcher.group(1));
            // Output: Attribute value: hero-box
        }
    }
}`,
  },
  {
    id: "recipe-stream-predicates",
    title: "Pattern Predicates in Stream Filter (Java 8/11+)",
    description: "Filter collections directly with Pattern.asPredicate() (find) or Pattern.asMatchPredicate() (exact match).",
    code: `import java.util.List;
import java.util.regex.Pattern;

public class FilterList {
    public static void main(String[] args) {
        List<String> emails = List.of(
            "alice@example.com",
            "invalid-email",
            "bob@domain.org",
            "test@"
        );

        Pattern emailPattern = Pattern.compile("^[\\\\w.+-]+@[\\\\w-]+\\\\.[a-zA-Z]{2,}$");

        // Java 11+ asMatchPredicate() checks entire string
        List<String> validEmails = emails.stream()
            .filter(emailPattern.asMatchPredicate())
            .toList();

        System.out.println(validEmails);
        // [alice@example.com, bob@domain.org]
    }
}`,
  },
  {
    id: "recipe-append-replacement",
    title: "Custom String Buffer Replacements (Pre-Java 9)",
    description: "Use appendReplacement() and appendTail() for fine-grained match transformations in legacy Java code.",
    code: `import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CustomReplacer {
    public static void main(String[] args) {
        String text = "Key: foo, Key: bar, Key: baz";
        Pattern pattern = Pattern.compile("Key: (\\\\w+)");
        Matcher matcher = pattern.matcher(text);

        StringBuilder sb = new StringBuilder();
        while (matcher.find()) {
            String upper = matcher.group(1).toUpperCase();
            matcher.appendReplacement(sb, "KEY[" + upper + "]");
        }
        matcher.appendTail(sb);

        System.out.println(sb.toString());
        // KEY[FOO], KEY[BAR], KEY[BAZ]
    }
}`,
  },
];

export const javaNavCards: NavCard[] = [
  {
    href: "/",
    title: "Universal Regex",
    description: "Baseline syntax reference across JavaScript, Python, Java, and all engines.",
    icon: "🌐",
  },
  {
    href: "/javascript",
    title: "JavaScript",
    description: "RegExp object, matchAll, String methods, and JS flags (g, i, m, y, u, v).",
    icon: "💛",
  },
  {
    href: "/python",
    title: "Python",
    description: "re module — named groups (?P<name>), verbose mode, and Python-specific flags.",
    icon: "🐍",
  },
  {
    href: "/examples",
    title: "Examples",
    description: "Real-world patterns: email, URL, date, IPv4/v6, and phone numbers.",
    icon: "⚡",
  },
  {
    href: "/tester",
    title: "Live Regex Tester",
    description: "Test regular expressions with real-time matching and match group previews.",
    icon: "🔬",
  },
];
