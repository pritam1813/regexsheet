import type { NavCard } from "./regex";

export interface CodeSnippet {
  code: string;
  lang: string;
}

export interface RegexExample {
  id: string;
  title: string;
  category: "web" | "inputs" | "formats" | "text";
  categoryLabel: string;
  description: string;
  pattern: string;
  flags?: string;
  explanation: { token: string; desc: string }[];
  matches: string[];
  nonMatches: string[];
  snippets: {
    javascript: string;
    python: string;
    java: string;
  };
}

export const examplesCategories = [
  { id: "all", label: "All Examples" },
  { id: "web", label: "Web & URLs" },
  { id: "inputs", label: "User Input & Auth" },
  { id: "formats", label: "Dates & Numbers" },
  { id: "text", label: "Text & Data" },
];

export const regexExamples: RegexExample[] = [
  {
    id: "email-validation",
    title: "Email Address Validation",
    category: "web",
    categoryLabel: "Web & URLs",
    description:
      "Standard practical email validation pattern matching local parts and domain names.",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    flags: "i",
    explanation: [
      {
        token: "^[a-zA-Z0-9._%+-]+",
        desc: "Start of string with 1+ alphanumeric or special chars (. _ % + -)",
      },
      { token: "@", desc: "Mandatory @ separator" },
      {
        token: "[a-zA-Z0-9.-]+",
        desc: "Domain name host with alphanumeric chars, hyphens or dots",
      },
      {
        token: "\\.[a-zA-Z]{2,}$",
        desc: "Top-level domain (TLD) of at least 2 alphabetic characters ending string",
      },
    ],
    matches: ["user@example.com", "first.last+dev@sub.domain.co"],
    nonMatches: ["user@.com", "plainaddress", "@missinguser.com"],
    snippets: {
      javascript: `const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
const isValid = emailRegex.test("user@example.com"); // true`,
      python: `import re

email_regex = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
is_valid = bool(email_regex.match("user@example.com")) # True`,
      java: `import java.util.regex.Pattern;

Pattern emailPattern = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$");
boolean isValid = emailPattern.matcher("user@example.com").matches(); // true`,
    },
  },
  {
    id: "url-validation",
    title: "HTTP / HTTPS URL Validator",
    category: "web",
    categoryLabel: "Web & URLs",
    description:
      "Matches complete web URLs with protocol (http/https), optional www, domain, port, and path.",
    pattern:
      "^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$",
    explanation: [
      { token: "^https?:\\/\\/", desc: "Protocol: http:// or https://" },
      { token: "(?:www\\.)?", desc: "Optional non-capturing 'www.' prefix" },
      {
        token: "[-a-zA-Z0-9@:%._\\+~#=]{1,256}",
        desc: "Domain name characters up to 256 length",
      },
      { token: "\\.[a-zA-Z0-9()]{1,6}\\b", desc: "Top level domain extension" },
      {
        token: "(?:[-a-zA-Z0-9()...]*)",
        desc: "Optional path, query parameters, and anchor fragments",
      },
    ],
    matches: [
      "https://example.com/api/v1?id=42#ref",
      "http://sub.domain.org/index.html",
    ],
    nonMatches: ["htp://wrong-protocol.com", "example.com", "https://"],
    snippets: {
      javascript: `const urlRegex = /^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/;
const isValid = urlRegex.test("https://example.com/page?ref=home"); // true`,
      python: `import re

url_pattern = re.compile(r"^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$")
is_valid = bool(url_pattern.match("https://example.com/page?ref=home"))`,
      java: `import java.util.regex.Pattern;

Pattern urlPattern = Pattern.compile("^https?:\\\\/\\\\/(?:www\\\\.)?[-a-zA-Z0-9@:%._\\\\+~#=]{1,256}\\\\.[a-zA-Z0-9()]{1,6}\\\\b(?:[-a-zA-Z0-9()@:%_\\\\+.~#?&\\\\/=]*)$");
boolean isValid = urlPattern.matcher("https://example.com").matches();`,
    },
  },
  {
    id: "ipv4-address",
    title: "IPv4 Address Validator",
    category: "web",
    categoryLabel: "Web & URLs",
    description:
      "Strict IPv4 validation ensuring each octet is within valid range (0-255).",
    pattern:
      "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
    explanation: [
      { token: "25[0-5]", desc: "Matches 250-255" },
      { token: "2[0-4][0-9]", desc: "Matches 200-249" },
      { token: "[01]?[0-9][0-9]?", desc: "Matches 0-199 (1 or 2 or 3 digits)" },
      {
        token: "(?:...\\.){3}",
        desc: "Repeats first 3 octets with a trailing dot separator",
      },
      { token: "(?:...)$", desc: "4th octet ending the string without dot" },
    ],
    matches: ["192.168.1.1", "127.0.0.1", "255.255.255.0"],
    nonMatches: ["256.100.0.1", "192.168.1", "192.168.1.1.5"],
    snippets: {
      javascript: `const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const isIP = ipRegex.test("192.168.1.1"); // true`,
      python: `import re

ip_regex = re.compile(r"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")
is_valid = bool(ip_regex.match("192.168.1.1")) # True`,
      java: `import java.util.regex.Pattern;

Pattern ipPattern = Pattern.compile("^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\b\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$");
boolean isValid = ipPattern.matcher("192.168.1.1").matches();`,
    },
  },
  {
    id: "slug-url",
    title: "URL Slug / Permalinks",
    category: "web",
    categoryLabel: "Web & URLs",
    description:
      "Validates kebab-case URL slugs containing lowercase letters, numbers, and hyphens without duplicates.",
    pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
    explanation: [
      {
        token: "^[a-z0-9]+",
        desc: "Starts with 1+ lowercase alphanumeric characters",
      },
      {
        token: "(?:-[a-z0-9]+)*$",
        desc: "Repeated hyphens followed by alphanumeric characters, ending without a dangling hyphen",
      },
    ],
    matches: ["how-to-use-regex", "astro-v5-guide", "post-42"],
    nonMatches: [
      "How-To-Use",
      "-leading-dash",
      "trailing-dash-",
      "double--dash",
    ],
    snippets: {
      javascript: `const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isValidSlug = slugRegex.test("my-awesome-post"); // true`,
      python: `import re

slug_pattern = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
is_valid = bool(slug_pattern.match("my-awesome-post"))`,
      java: `import java.util.regex.Pattern;

Pattern slugPattern = Pattern.compile("^[a-z0-9]+(?:-[a-z0-9]+)*$");
boolean isValid = slugPattern.matcher("my-awesome-post").matches();`,
    },
  },
  {
    id: "strong-password",
    title: "Strong Password (Lookaheads)",
    category: "inputs",
    categoryLabel: "User Input & Auth",
    description:
      "Requires minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special symbol.",
    pattern:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    explanation: [
      {
        token: "(?=.*[a-z])",
        desc: "Positive lookahead: contains at least one lowercase letter",
      },
      {
        token: "(?=.*[A-Z])",
        desc: "Positive lookahead: contains at least one uppercase letter",
      },
      {
        token: "(?=.*\\d)",
        desc: "Positive lookahead: contains at least one digit",
      },
      {
        token: "(?=.*[@$!%*?&])",
        desc: "Positive lookahead: contains at least one special character",
      },
      {
        token: "[A-Za-z\\d@$!%*?&]{8,}$",
        desc: "Allowed characters of length 8 or more",
      },
    ],
    matches: ["SecurePass1!", "Str0ng#Password2026"],
    nonMatches: ["password", "ALLCAPS123!", "Short1!"],
    snippets: {
      javascript: `const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
const isStrong = passwordRegex.test("P@ssw0rd2026"); // true`,
      python: `import re

password_regex = re.compile(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")
is_strong = bool(password_regex.match("P@ssw0rd2026"))`,
      java: `import java.util.regex.Pattern;

Pattern pwdPattern = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\\\d)(?=.*[@$!%*?&])[A-Za-z\\\\d@$!%*?&]{8,}$");
boolean isStrong = pwdPattern.matcher("P@ssw0rd2026").matches();`,
    },
  },
  {
    id: "username-validator",
    title: "Username / Handle Validator",
    category: "inputs",
    categoryLabel: "User Input & Auth",
    description:
      "3 to 16 alphanumeric characters, underscores, and hyphens. Perfect for registration forms.",
    pattern: "^[a-zA-Z0-9_-]{3,16}$",
    explanation: [
      { token: "^", desc: "Start of string" },
      {
        token: "[a-zA-Z0-9_-]",
        desc: "Letters (a-z, A-Z), numbers (0-9), underscores, or hyphens",
      },
      { token: "{3,16}", desc: "Length between 3 and 16 characters inclusive" },
      { token: "$", desc: "End of string" },
    ],
    matches: ["john_doe", "alice-99", "dev_master"],
    nonMatches: ["ab", "user name", "toolongusername123456789", "bad@user"],
    snippets: {
      javascript: `const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
const valid = usernameRegex.test("john_doe"); // true`,
      python: `import re

username_pattern = re.compile(r"^[a-zA-Z0-9_-]{3,16}$")
is_valid = bool(username_pattern.match("john_doe"))`,
      java: `import java.util.regex.Pattern;

Pattern userPattern = Pattern.compile("^[a-zA-Z0-9_-]{3,16}$");
boolean isValid = userPattern.matcher("john_doe").matches();`,
    },
  },
  {
    id: "phone-number-us",
    title: "US Phone Number (Flexible Formats)",
    category: "inputs",
    categoryLabel: "User Input & Auth",
    description:
      "Matches common US phone formats like 123-456-7890, (123) 456-7890, 1234567890, +1 123 456 7890.",
    pattern:
      "^(?:\\+?1[-. ]?)?\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$",
    explanation: [
      {
        token: "(?:\\+?1[-. ]?)?",
        desc: "Optional country code +1 with separator",
      },
      {
        token: "\\(?([0-9]{3})\\)?",
        desc: "3-digit area code with optional parentheses",
      },
      { token: "[-. ]?", desc: "Optional separator (dash, dot, or space)" },
      { token: "([0-9]{3})", desc: "3-digit exchange code" },
      { token: "([0-9]{4})$", desc: "4-digit subscriber line number" },
    ],
    matches: [
      "(555) 234-5678",
      "+1 555-234-5678",
      "555.234.5678",
      "5552345678",
    ],
    nonMatches: ["55-234-5678", "555-2345-678", "abc-def-ghij"],
    snippets: {
      javascript: `const phoneRegex = /^(?:\\+?1[-. ]?)?\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const isPhone = phoneRegex.test("(555) 234-5678"); // true`,
      python: `import re

phone_regex = re.compile(r"^(?:\\+?1[-. ]?)?\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$")
match = phone_regex.match("(555) 234-5678")
if match:
    area, prefix, line = match.groups()`,
      java: `import java.util.regex.Matcher;
import java.util.regex.Pattern;

Pattern phonePattern = Pattern.compile("^(?:\\\\+?1[-. ]?)?\\\\(?([0-9]{3})\\\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$");
Matcher m = phonePattern.matcher("(555) 234-5678");
boolean isValid = m.matches();`,
    },
  },
  {
    id: "hex-color",
    title: "Hex Color Code (#RGB, #RRGGBB, #RGBA)",
    category: "inputs",
    categoryLabel: "User Input & Auth",
    description:
      "Validates 3, 4, 6, or 8 digit hex color codes with optional leading hash sign.",
    pattern:
      "^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$",
    explanation: [
      { token: "^#?", desc: "Optional leading # character" },
      { token: "[a-fA-F0-9]{3}", desc: "3-character short RGB (e.g. #FFF)" },
      { token: "[a-fA-F0-9]{4}", desc: "4-character short RGBA with alpha" },
      {
        token: "[a-fA-F0-9]{6}",
        desc: "6-character full RRGGBB (e.g. #5B21B6)",
      },
      {
        token: "[a-fA-F0-9]{8}",
        desc: "8-character full RRGGBBAA with alpha channel",
      },
    ],
    matches: ["#5b21b6", "#FFF", "#ff00aa80", "1a1a2e"],
    nonMatches: ["#GGGGGG", "#12", "rgba(0,0,0,1)"],
    snippets: {
      javascript: `const hexRegex = /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/;
const isValidHex = hexRegex.test("#5b21b6"); // true`,
      python: `import re

hex_pattern = re.compile(r"^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$")
is_valid = bool(hex_pattern.match("#5b21b6"))`,
      java: `import java.util.regex.Pattern;

Pattern hexPattern = Pattern.compile("^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$");
boolean isValid = hexPattern.matcher("#5b21b6").matches();`,
    },
  },
  {
    id: "iso-date",
    title: "ISO 8601 Date (YYYY-MM-DD)",
    category: "formats",
    categoryLabel: "Dates & Numbers",
    description:
      "Matches calendar dates in standard ISO 8601 format with valid month (01-12) and day (01-31) ranges.",
    pattern: "^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$",
    explanation: [
      { token: "^\\d{4}-", desc: "4-digit year followed by dash" },
      {
        token: "(?:0[1-9]|1[0-2])-",
        desc: "Month: 01 to 09 or 10 to 12 followed by dash",
      },
      {
        token: "(?:0[1-9]|[12]\\d|3[01])$",
        desc: "Day: 01-09, 10-29, or 30-31",
      },
    ],
    matches: ["2026-08-19", "1999-12-31", "2024-02-29"],
    nonMatches: ["2026-13-01", "2026-00-15", "2026-05-32", "08/19/2026"],
    snippets: {
      javascript: `const isoDateRegex = /^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/;
const isDate = isoDateRegex.test("2026-08-19"); // true`,
      python: `import re

iso_date_pattern = re.compile(r"^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$")
is_valid = bool(iso_date_pattern.match("2026-08-19"))`,
      java: `import java.util.regex.Pattern;

Pattern datePattern = Pattern.compile("^\\\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\\\d|3[01])$");
boolean isValid = datePattern.matcher("2026-08-19").matches();`,
    },
  },
  {
    id: "time-24hr",
    title: "24-Hour Time Format (HH:mm:ss)",
    category: "formats",
    categoryLabel: "Dates & Numbers",
    description:
      "Validates 24-hour time clock from 00:00 to 23:59 with optional seconds (:00 to :59).",
    pattern: "^(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?$",
    explanation: [
      { token: "(?:[01]\\d|2[0-3])", desc: "Hours: 00-19 or 20-23" },
      { token: ":[0-5]\\d", desc: "Minutes: 00-59" },
      { token: "(?::[0-5]\\d)?$", desc: "Optional seconds: :00-59" },
    ],
    matches: ["14:30", "23:59:59", "00:00", "08:15:30"],
    nonMatches: ["24:00", "12:60", "25:10:00"],
    snippets: {
      javascript: `const timeRegex = /^(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?$/;
const isValid = timeRegex.test("14:30:00"); // true`,
      python: `import re

time_pattern = re.compile(r"^(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?$")
is_valid = bool(time_pattern.match("14:30:00"))`,
      java: `import java.util.regex.Pattern;

Pattern timePattern = Pattern.compile("^(?:[01]\\\\d|2[0-3]):[0-5]\\\\d(?::[0-5]\\\\d)?$");
boolean isValid = timePattern.matcher("14:30:00").matches();`,
    },
  },
  {
    id: "currency-amount",
    title: "Currency & Price Amount",
    category: "formats",
    categoryLabel: "Dates & Numbers",
    description:
      "Matches formatted financial figures with commas and optional two-decimal cents.",
    pattern: "^\\$?\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?$",
    explanation: [
      { token: "^\\$?", desc: "Optional leading currency sign ($)" },
      { token: "\\d{1,3}", desc: "Leading 1 to 3 digits" },
      { token: "(?:,\\d{3})*", desc: "Thousands groups separated by commas" },
      { token: "(?:\\.\\d{2})?$", desc: "Optional 2 decimal place cents" },
    ],
    matches: ["$1,234.56", "100", "49.99", "$1,000,000.00"],
    nonMatches: ["$12,34.5", "10.999", "$"],
    snippets: {
      javascript: `const priceRegex = /^\\$?\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?$/;
const isPrice = priceRegex.test("$1,234.56"); // true`,
      python: `import re

price_pattern = re.compile(r"^\\$?\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?$")
is_valid = bool(price_pattern.match("$1,234.56"))`,
      java: `import java.util.regex.Pattern;

Pattern pricePattern = Pattern.compile("^\\\\$?\\\\d{1,3}(?:,\\\\d{3})*(?:\\\\.\\\\d{2})?$");
boolean isValid = pricePattern.matcher("$1,234.56").matches();`,
    },
  },
  {
    id: "uuid-v4",
    title: "UUID / GUID v4 Validator",
    category: "text",
    categoryLabel: "Text & Data",
    description:
      "Matches Universally Unique Identifiers (UUID version 4) with standard 8-4-4-4-12 hex structure.",
    pattern:
      "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$",
    explanation: [
      {
        token: "^[0-9a-fA-F]{8}-",
        desc: "8 hex characters followed by hyphen",
      },
      { token: "[0-9a-fA-F]{4}-", desc: "4 hex characters followed by hyphen" },
      {
        token: "4[0-9a-fA-F]{3}-",
        desc: "4 hex characters starting with version digit '4'",
      },
      {
        token: "[89abAB][0-9a-fA-F]{3}-",
        desc: "4 hex characters with variant bits (8, 9, a, or b)",
      },
      { token: "[0-9a-fA-F]{12}$", desc: "Final 12 hex characters" },
    ],
    matches: [
      "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    ],
    nonMatches: ["9b1deb4d-3b7d-3bad-9bdd-2b0d7b3dcb6d", "not-a-uuid", "12345"],
    snippets: {
      javascript: `const uuidV4Regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
const isUUID = uuidV4Regex.test("f47ac10b-58cc-4372-a567-0e02b2c3d479"); // true`,
      python: `import re

uuid_pattern = re.compile(r"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$")
is_valid = bool(uuid_pattern.match("f47ac10b-58cc-4372-a567-0e02b2c3d479"))`,
      java: `import java.util.regex.Pattern;

Pattern uuidPattern = Pattern.compile("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$");
boolean isValid = uuidPattern.matcher("f47ac10b-58cc-4372-a567-0e02b2c3d479").matches();`,
    },
  },
  {
    id: "semver",
    title: "Semantic Versioning (SemVer)",
    category: "text",
    categoryLabel: "Text & Data",
    description:
      "Official Semantic Versioning 2.0 specification validator supporting Major.Minor.Patch and pre-release/build tags.",
    pattern:
      "^v?(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$",
    explanation: [
      { token: "^v?", desc: "Optional leading 'v' prefix" },
      {
        token: "(0|[1-9]\\d*)\\.(...)\\.(...)",
        desc: "MAJOR.MINOR.PATCH numbers without leading zeros",
      },
      {
        token: "(?:-(...))?",
        desc: "Optional pre-release identifier (e.g. -alpha.1, -beta)",
      },
      {
        token: "(?:\\+(...))?$",
        desc: "Optional build metadata (e.g. +20130313144700)",
      },
    ],
    matches: ["v1.0.0", "2.1.3-beta.1", "0.0.4+build.2026"],
    nonMatches: ["1.0", "01.2.3", "v1.2.x"],
    snippets: {
      javascript: `const semverRegex = /^v?(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$/;
const isSemver = semverRegex.test("v2.1.0-alpha.1"); // true`,
      python: `import re

semver_pattern = re.compile(r"^v?(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$")
is_valid = bool(semver_pattern.match("v2.1.0-alpha.1"))`,
      java: `import java.util.regex.Pattern;

Pattern semverPattern = Pattern.compile("^v?(0|[1-9]\\\\d*)\\\\.(0|[1-9]\\\\d*)\\\\.(0|[1-9]\\\\d*)(?:-((?:0|[1-9]\\\\d*|\\\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\\\.(?:0|[1-9]\\\\d*|\\\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\\\+([0-9a-zA-Z-]+(?:\\\\.[0-9a-zA-Z-]+)*))?$");
boolean isValid = semverPattern.matcher("v2.1.0-alpha.1").matches();`,
    },
  },
  {
    id: "markdown-links",
    title: "Markdown Link Parser [text](url)",
    category: "text",
    categoryLabel: "Text & Data",
    description:
      "Extracts label text and destination URL from Markdown hyperlinks using capturing groups.",
    pattern: "\\[([^\\]]+)\\]\\(([^)]+)\\)",
    explanation: [
      {
        token: "\\[([^\\]]+)\\]",
        desc: "Group 1: Captures link anchor text inside square brackets",
      },
      {
        token: "\\(([^)]+)\\)",
        desc: "Group 2: Captures URL / destination inside parentheses",
      },
    ],
    matches: ["[Astro Docs](https://docs.astro.build)", "[Home](/)"],
    nonMatches: ["Not a link", "[broken link](", "http://example.com"],
    snippets: {
      javascript: `const mdLinkRegex = /\\[([^\\]]+)\\]\\(([^)]+)\\)/g;
const text = "Check out [Astro](https://astro.build) and [Docs](https://docs.astro.build)";
for (const match of text.matchAll(mdLinkRegex)) {
  console.log(\`Label: \${match[1]}, URL: \${match[2]}\`);
}`,
      python: `import re

md_regex = re.compile(r"\\[([^\\]]+)\\]\\(([^)]+)\\)")
text = "Check out [Astro](https://astro.build) and [Docs](https://docs.astro.build)"
for match in md_regex.finditer(text):
    print(f"Label: {match.group(1)}, URL: {match.group(2)}")`,
      java: `import java.util.regex.Matcher;
import java.util.regex.Pattern;

Pattern mdPattern = Pattern.compile("\\\\[([^\\\\]]+)\\\\]\\\\(([^)]+)\\\\)");
Matcher m = mdPattern.matcher("Visit [Astro](https://astro.build)");
while (m.find()) {
    System.out.println("Label: " + m.group(1) + ", URL: " + m.group(2));
}`,
    },
  },
  {
    id: "duplicate-words",
    title: "Find Duplicate Words (Backreference)",
    category: "text",
    categoryLabel: "Text & Data",
    description:
      "Finds accidental repeated words in prose (e.g. 'the the') using backreferences `\\1` and word boundaries `\\b`.",
    pattern: "\\b(\\w+)\\s+\\1\\b",
    flags: "i",
    explanation: [
      {
        token: "\\b(\\w+)",
        desc: "Word boundary followed by Group 1 capturing a word",
      },
      {
        token: "\\s+",
        desc: "One or more whitespace characters separating the words",
      },
      {
        token: "\\1\\b",
        desc: "Backreference matching exact duplicate of Group 1 at word boundary",
      },
    ],
    matches: ["the the problem", "Paris in the the spring"],
    nonMatches: ["the other problem", "that is good"],
    snippets: {
      javascript: `const dupRegex = /\\b(\\w+)\\s+\\1\\b/gi;
const text = "This is the the best day.";
const cleaned = text.replace(dupRegex, "$1"); // "This is the best day."`,
      python: `import re

dup_regex = re.compile(r"\\b(\\w+)\\s+\\1\\b", re.IGNORECASE)
text = "This is the the best day."
cleaned = dup_regex.sub(r"\\1", text) # 'This is the best day.'`,
      java: `import java.util.regex.Pattern;

Pattern dupPattern = Pattern.compile("\\\\b(\\\\w+)\\\\s+\\\\1\\\\b", Pattern.CASE_INSENSITIVE);
String cleaned = dupPattern.matcher("This is the the best day.").replaceAll("$1");`,
    },
  },
];

export const examplesNavCards: NavCard[] = [
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
      "java.util.regex — Pattern, Matcher, and Java engine specifics.",
    icon: "☕",
  },
  {
    href: "/r",
    title: "R",
    description:
      "Base R & stringr — grep, sub, POSIX classes, and raw string literals.",
    icon: "📊",
  },
];
