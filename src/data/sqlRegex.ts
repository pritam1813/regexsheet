import type { RegexCategory, NavCard } from "./regex";

export interface SqlRecipe {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const sqlRegexCategories: RegexCategory[] = [
  {
    id: "standard-functions",
    title: "Standard SQL Functions (PostgreSQL, Oracle, MySQL 8+, Snowflake)",
    entries: [
      {
        syntax: "REGEXP_LIKE(str, pattern [, flags])",
        description:
          "Returns TRUE/1 if regular expression matches anywhere in str; supported in Oracle, MySQL 8+, Snowflake, Databricks",
        example: "SELECT * FROM users WHERE REGEXP_LIKE(email, '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$', 'i');",
        tryPattern: null,
      },
      {
        syntax: "REGEXP_SUBSTR(str, pattern [, pos [, occ [, flags [, group]]]])",
        description:
          "Extracts the matched substring (or specific capture group) from str; pos defaults to 1, occ defaults to 1",
        example: "SELECT REGEXP_SUBSTR('invoice_2026_08.pdf', '\\d{4}') → '2026'",
        tryPattern: null,
      },
      {
        syntax: "REGEXP_REPLACE(str, pattern, replacement [, pos [, occ [, flags]]])",
        description:
          "Replaces matched substrings in str with replacement text (supports backreferences \\1, \\2 or $1, $2)",
        example: "SELECT REGEXP_REPLACE('phone: 555-1234', '\\d', 'X') → 'phone: XXX-XXXX'",
        tryPattern: null,
      },
      {
        syntax: "REGEXP_INSTR(str, pattern [, pos [, occ [, return_opt [, flags]]]])",
        description:
          "Returns 1-based start position of the N-th match (or position after match if return_opt = 1); 0 if no match",
        example: "SELECT REGEXP_INSTR('Order #4092 created', '\\d+') → 8",
        tryPattern: null,
      },
      {
        syntax: "REGEXP_COUNT(str, pattern [, pos [, flags]])",
        description:
          "Returns total count of non-overlapping matches in str (PostgreSQL 15+, Oracle, Snowflake, MySQL 8+)",
        example: "SELECT REGEXP_COUNT('cat, dog, bird, fish', '\\w+') → 4",
        tryPattern: null,
      },
    ],
  },
  {
    id: "postgres-operators",
    title: "PostgreSQL Regex Operators & Native Functions",
    entries: [
      {
        syntax: "str ~ pattern",
        description:
          "POSIX regular expression match operator (case-sensitive) — returns boolean true/false",
        example: "SELECT '2026-08' ~ '^\\d{4}-\\d{2}$' → true",
        tryPattern: null,
      },
      {
        syntax: "str ~* pattern",
        description:
          "POSIX regular expression match operator (case-insensitive) — returns boolean true/false",
        example: "SELECT 'Alice' ~* '^a.*e$' → true",
        tryPattern: null,
      },
      {
        syntax: "str !~ pattern / str !~* pattern",
        description:
          "POSIX regular expression non-match operators (case-sensitive !~ and case-insensitive !~*)",
        example: "SELECT 'hello' !~* '\\d' → true",
        tryPattern: null,
      },
      {
        syntax: "REGEXP_MATCH(str, pattern [, flags])",
        description:
          "Extracts first match as a text[] array of captured groups (or entire match if no groups); returns NULL if no match",
        example: "SELECT (REGEXP_MATCH('id: 420', 'id: (\\d+)'))[1] → '420'",
        tryPattern: null,
      },
      {
        syntax: "REGEXP_MATCHES(str, pattern [, flags])",
        description:
          "Returns set of text[] arrays for all matches (use 'g' flag for global multi-row set returning function)",
        example: "SELECT REGEXP_MATCHES('a1 b2 c3', '([a-z])(\\d)', 'g');",
        tryPattern: null,
      },
      {
        syntax: "REGEXP_SPLIT_TO_TABLE(str, pattern [, flags])",
        description:
          "Splits string by regex matches and returns each item as a separate table row (set of text)",
        example: "SELECT REGEXP_SPLIT_TO_TABLE('apple,banana;cherry', '[,;]\\s*');",
        tryPattern: null,
      },
      {
        syntax: "REGEXP_SPLIT_TO_ARRAY(str, pattern [, flags])",
        description:
          "Splits string by regex matches into a single PostgreSQL array (text[])",
        example: "SELECT REGEXP_SPLIT_TO_ARRAY('10.20.30', '\\.') → '{10,20,30}'",
        tryPattern: null,
      },
      {
        syntax: "str SIMILAR TO pattern",
        description:
          "SQL standard pattern matching using SQL99 rules (combines LIKE wildcards % _ with regex | * + ( ))",
        example: "SELECT 'abc' SIMILAR TO '%(b|d)%' → true",
        tryPattern: null,
      },
    ],
  },
  {
    id: "mysql-sqlite",
    title: "MySQL, MariaDB, & SQLite",
    entries: [
      {
        syntax: "str REGEXP pattern / str RLIKE pattern",
        description:
          "Matches regular expression anywhere within str; RLIKE is an exact synonym of REGEXP in MySQL and MariaDB",
        example: "SELECT 'Product 99' REGEXP '[0-9]+' → 1",
        tryPattern: null,
      },
      {
        syntax: "str NOT REGEXP pattern / str NOT RLIKE pattern",
        description:
          "Returns 1 if pattern does not match str, 0 if it matches, and NULL if either argument is NULL",
        example: "SELECT 'abc' NOT REGEXP '\\d' → 1",
        tryPattern: null,
      },
      {
        syntax: "REGEXP_LIKE(expr, pat [, match_type])",
        description:
          "MySQL 8.0+ functional syntax with match_type flags ('i', 'c', 'm', 'n', 'u')",
        example: "SELECT REGEXP_LIKE('Admin_User', '^admin', 'i') → 1",
        tryPattern: null,
      },
      {
        syntax: "REGEXP_SUBSTR(expr, pat [, pos [, occurrence [, match_type]]])",
        description:
          "MySQL 8.0+ function returning matched substring, or NULL if no match found",
        example: "SELECT REGEXP_SUBSTR('item #429 in stock', '\\d+') → '429'",
        tryPattern: null,
      },
      {
        syntax: "str REGEXP pattern (SQLite)",
        description:
          "SQLite regex operator — requires the regexp() extension function to be loaded/registered by the host driver",
        example: "SELECT * FROM items WHERE name REGEXP '^A[0-9]+';",
        tryPattern: null,
      },
    ],
  },
  {
    id: "cloud-dw",
    title: "Cloud Data Warehouses (Snowflake, BigQuery, Databricks, Trino)",
    entries: [
      {
        syntax: "REGEXP_CONTAINS(value, regex) (BigQuery)",
        description:
          "Returns TRUE if regex finds a match anywhere in string value in Google BigQuery",
        example: "SELECT REGEXP_CONTAINS(url, r'https?://[a-z0-9.-]+') FROM web_traffic;",
        tryPattern: null,
      },
      {
        syntax: "REGEXP_EXTRACT(value, regex [, position [, occurrence]]) (BigQuery)",
        description:
          "Extracts the first matching substring or first capturing group from value in BigQuery",
        example: "SELECT REGEXP_EXTRACT('order_id: 9941', r'\\d+') → '9941'",
        tryPattern: null,
      },
      {
        syntax: "REGEXP_EXTRACT_ALL(value, regex) (BigQuery / Trino)",
        description:
          "Returns an ARRAY of all non-overlapping matches or capture groups in BigQuery and Trino/Presto",
        example: "SELECT REGEXP_EXTRACT_ALL('v1.0, v2.1, v3.5', r'v\\d+\\.\\d+') → ['v1.0', 'v2.1', 'v3.5']",
        tryPattern: null,
      },
      {
        syntax: "REGEXP_LIKE(str, pattern [, parameters]) (Snowflake)",
        description:
          "Evaluates regex match against string column with parameter flags in Snowflake / Databricks",
        example: "SELECT * FROM sales WHERE REGEXP_LIKE(sku, '^[A-Z]{3}-\\d{4}$');",
        tryPattern: null,
      },
      {
        syntax: "str RLIKE pattern (Spark / Databricks / Hive / Trino)",
        description:
          "Tests if str matches pattern regular expression using Java regex syntax under the hood",
        example: "SELECT * FROM events WHERE event_name RLIKE '^user_(login|logout)$';",
        tryPattern: null,
      },
    ],
  },
  {
    id: "match-parameters",
    title: "SQL Match Parameters & Flag Modifiers",
    entries: [
      {
        syntax: "'i'",
        description:
          "Case-insensitive matching parameter (e.g. REGEXP_LIKE(name, '^john', 'i'))",
        example: "REGEXP_LIKE('JOHN', 'john', 'i') → TRUE",
        tryPattern: null,
      },
      {
        syntax: "'c'",
        description:
          "Case-sensitive matching parameter (default in most SQL engines except case-insensitive collations)",
        example: "REGEXP_LIKE('JOHN', 'john', 'c') → FALSE",
        tryPattern: null,
      },
      {
        syntax: "'m'",
        description:
          "Multiline mode — anchors ^ and $ match beginning and end of each physical line within string",
        example: "REGEXP_REPLACE(multiline_text, '^#\\s*', '', 1, 0, 'm')",
        tryPattern: null,
      },
      {
        syntax: "'n' / 's'",
        description:
          "Singleline / dot-all mode — permits dot (.) to match newline characters (flags vary: 'n' in Oracle/Postgres, 's' in PCRE)",
        example: "REGEXP_SUBSTR(html_doc, '<div>.*</div>', 1, 1, 'n')",
        tryPattern: null,
      },
      {
        syntax: "'x'",
        description:
          "Extended/verbose mode — ignores whitespace and allows # comments inside regex pattern string",
        example: "REGEXP_LIKE(val, '^\\d{4} # Year \\n-\\d{2} # Month', 'x')",
        tryPattern: null,
      },
      {
        syntax: "'g' (PostgreSQL)",
        description:
          "Global replacement / match parameter in PostgreSQL (replaces or matches all occurrences)",
        example: "REGEXP_REPLACE('a1 b2 c3', '\\d', 'X', 'g') → 'aX bX cX'",
        tryPattern: null,
      },
    ],
  },
  {
    id: "tsql-wildcards",
    title: "SQL Server (T-SQL) LIKE Character Ranges & Wildcards",
    entries: [
      {
        syntax: "LIKE '%[0-9]%'",
        description:
          "Matches any string containing at least one digit character (0 through 9) in T-SQL",
        example: "SELECT * FROM orders WHERE order_num LIKE 'ORD-[0-9][0-9][0-9][0-9]';",
        tryPattern: null,
      },
      {
        syntax: "LIKE '%[^0-9]%'",
        description:
          "Negated set — matches any string containing at least one character that is NOT a digit",
        example: "SELECT * FROM users WHERE zip_code LIKE '%[^0-9]%';",
        tryPattern: null,
      },
      {
        syntax: "LIKE '[A-Za-z]%'",
        description:
          "Matches strings starting with any alphabetic letter (A-Z or a-z)",
        example: "SELECT * FROM customers WHERE name LIKE '[A-M]%';",
        tryPattern: null,
      },
      {
        syntax: "PATINDEX('%[0-9]%', str)",
        description:
          "Returns 1-based start position of first occurrence of pattern in str; returns 0 if not found",
        example: "SELECT PATINDEX('%[0-9]%', 'Item #42') → 7",
        tryPattern: null,
      },
      {
        syntax: "LIKE '%[%_]%' (ESCAPE '\\')",
        description:
          "Escapes literal % or _ wildcard characters using custom ESCAPE clause",
        example: "SELECT * FROM logs WHERE message LIKE '%100\\%%' ESCAPE '\\';",
        tryPattern: null,
      },
    ],
  },
];

export const sqlRecipes: SqlRecipe[] = [
  {
    id: "recipe-email-validation",
    title: "Validate Email & Phone in WHERE Clauses",
    description:
      "Filter invalid or malformed email addresses and phone numbers in SQL queries across PostgreSQL, MySQL, Snowflake, and BigQuery.",
    code: `-- PostgreSQL: Using case-insensitive match operator ~*
SELECT id, email, phone
FROM customers
WHERE email ~* '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'
  AND phone ~ '^\\+?[0-9]{1,3}?[-.\\s]?\\(?[0-9]{3}\\)?[-.\\s]?[0-9]{3}[-.\\s]?[0-9]{4}$';

-- MySQL 8.0+ / Snowflake / Oracle: Using REGEXP_LIKE
SELECT id, email
FROM users
WHERE REGEXP_LIKE(email, '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$', 'i');

-- Google BigQuery: Using REGEXP_CONTAINS with raw string r''
SELECT user_id, contact_email
FROM \`analytics.users\`
WHERE REGEXP_CONTAINS(contact_email, r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');`,
  },
  {
    id: "recipe-extract-domain",
    title: "Extract Domain & Path from URLs with REGEXP_SUBSTR",
    description:
      "Extract hostnames, subdomains, URL parameters, or specific captured groups from unstructured text columns.",
    code: `-- PostgreSQL: Using REGEXP_MATCH with array index [1]
SELECT 
  url,
  (REGEXP_MATCH(url, 'https?://([^/]+)'))[1] AS domain_name
FROM web_logs;

-- Snowflake / Oracle / MySQL 8.0+: Using REGEXP_SUBSTR capture group
SELECT 
  url,
  REGEXP_SUBSTR(url, 'https?://([^/]+)', 1, 1, 'i', 1) AS host,
  REGEXP_SUBSTR(url, 'id=([0-9]+)', 1, 1, 'i', 1) AS item_id
FROM traffic_events;

-- Google BigQuery: Using REGEXP_EXTRACT
SELECT
  url,
  REGEXP_EXTRACT(url, r'https?://([^/]+)') AS hostname
FROM \`project.dataset.pageviews\`;`,
  },
  {
    id: "recipe-mask-pii",
    title: "Mask PII & Sensitive Digits with REGEXP_REPLACE",
    description:
      "Redact credit cards, social security numbers, and email usernames for analytics and data compliance.",
    code: `-- Redact all but the last 4 digits of a Credit Card number
-- PostgreSQL (Backreferences use \\1, \\2):
SELECT 
  card_number,
  REGEXP_REPLACE(card_number, '\\d(?=\\d{4})', '*', 'g') AS masked_pg,
  REGEXP_REPLACE(card_number, '^(\\d{4}-){3}', '****-****-****-') AS masked_groups
FROM payments;

-- Snowflake / Oracle (Backreferences use \\1, \\2):
SELECT 
  REGEXP_REPLACE('123-45-6789', '^(\\d{3})-(\\d{2})-(\\d{4})$', '***-**-\\3') AS masked_ssn
FROM dual;

-- Google BigQuery (Backreferences use \\1, \\2):
SELECT 
  REGEXP_REPLACE(email, r'^(.)(.*)(@.+)$', r'\\1****\\3') AS masked_email
FROM \`app.users\`;
-- Output: j****@example.com`,
  },
  {
    id: "recipe-split-to-rows",
    title: "Split Delimited Strings to Rows (PostgreSQL & BigQuery)",
    description:
      "Unnest comma-separated or multi-delimiter tag strings into individual normalized relational rows.",
    code: `-- PostgreSQL: Using REGEXP_SPLIT_TO_TABLE
SELECT 
  post_id,
  TRIM(tag) AS tag
FROM blog_posts,
     REGEXP_SPLIT_TO_TABLE(tags, '[,;|]\\s*') AS tag
WHERE tag <> '';

-- PostgreSQL: Using REGEXP_SPLIT_TO_ARRAY with UNNEST
SELECT 
  user_id,
  UNNEST(REGEXP_SPLIT_TO_ARRAY(roles, '\\s*,\\s*')) AS role_name
FROM auth_users;

-- Google BigQuery: Using REGEXP_EXTRACT_ALL and UNNEST
SELECT 
  order_id,
  sku
FROM \`ecommerce.orders\`,
     UNNEST(REGEXP_EXTRACT_ALL(raw_skus, r'[A-Z]{3}-\d{4}')) AS sku;`,
  },
  {
    id: "recipe-clean-non-alphanumeric",
    title: "Clean Non-Alphanumeric Characters & Normalize Text",
    description:
      "Strip emojis, punctuation, and extra whitespace to generate URL slugs and clean lookup keys.",
    code: `-- PostgreSQL: Lowercase and replace non-alphanumeric chars with hyphen
SELECT 
  title,
  TRIM(BOTH '-' FROM REGEXP_REPLACE(LOWER(title), '[^a-z0-9]+', '-', 'g')) AS slug
FROM articles;
-- 'Hello World! 2026 Regex Guide' -> 'hello-world-2026-regex-guide'

-- MySQL 8.0+: Remove extra whitespace
SELECT 
  REGEXP_REPLACE(raw_address, '[[:space:]]+', ' ') AS normalized_address
FROM locations;

-- SQL Server (T-SQL): Find rows with illegal/special characters
SELECT customer_id, username
FROM accounts
WHERE username LIKE '%[^a-zA-Z0-9_]%';`,
  },
  {
    id: "recipe-parse-key-values",
    title: "Parse Key-Value / Log Strings into Columns with CTEs",
    description:
      "Extract structured key-value pairs (e.g. status=200, duration=45ms) from unstructured log lines.",
    code: `-- PostgreSQL / Snowflake: Extract structured metrics from log strings
WITH raw_logs AS (
  SELECT 'ip=192.168.1.10 status=200 method=GET path=/api/users duration=45ms' AS log_line
  UNION ALL
  SELECT 'ip=10.0.0.5 status=404 method=POST path=/login duration=12ms' AS log_line
  UNION ALL
  SELECT 'ip=172.16.0.2 status=500 method=GET path=/checkout duration=310ms' AS log_line
)
SELECT 
  -- Extract IP Address
  (REGEXP_MATCH(log_line, 'ip=([0-9.]+)'))[1] AS client_ip,
  -- Extract HTTP Status Code as Integer
  CAST((REGEXP_MATCH(log_line, 'status=([0-9]+)'))[1] AS INTEGER) AS http_status,
  -- Extract Method and Path
  (REGEXP_MATCH(log_line, 'method=([A-Z]+)'))[1] AS http_method,
  (REGEXP_MATCH(log_line, 'path=([^ ]+)'))[1] AS request_path,
  -- Extract Duration number
  CAST((REGEXP_MATCH(log_line, 'duration=([0-9]+)ms'))[1] AS INTEGER) AS duration_ms
FROM raw_logs;`,
  },
];

// Maximum four
export const sqlNavCards: NavCard[] = [
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
    href: "/csharp",
    title: "C# (.NET)",
    description:
      "System.Text.RegularExpressions, [GeneratedRegex], and balancing groups.",
    icon: "🔷",
  },
  {
    href: "/examples",
    title: "Examples",
    description:
      "Real-world patterns: email, URL, date, IPv4/v6, and phone numbers.",
    icon: "⚡",
  },
];
