import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { csharpRegexCategories } from "../../src/data/csharpRegex";
import { hasCLI, report } from "./utils";

console.log("Testing C#...");
if (!hasCLI("dotnet --version")) {
  console.log("  ⚠️ dotnet CLI not found, skipping.");
  process.exit(0);
}

const tempDir = path.join(process.cwd(), "temp_regex_tests");
const csProjPath = path.join(tempDir, "RegexTests");

if (!fs.existsSync(csProjPath)) {
  fs.mkdirSync(tempDir, { recursive: true });
  try {
    execSync(`dotnet new console -o ${csProjPath}`, { stdio: 'ignore' });
  } catch (e) {
    console.log("  ⚠️ Failed to create dotnet console project, skipping C#.");
    process.exit(0);
  }
}

let csCode = `
using System;
using System.Text.RegularExpressions;

class Program {
    static int passed = 0;
    static int failed = 0;
    
    static void Main() {
        // Mocks for evaluating methods and properties
        string pattern = @"\\d+";
        string input = "test 123";
        string replacement = "-";
        string replacementPattern = "-";
        RegexOptions options = RegexOptions.IgnoreCase;
        TimeSpan timeout = TimeSpan.FromSeconds(1);
        MatchEvaluator matchEvaluator = m => m.Value;
        int index = 0;
        string name = "test";
        string str = "test";
        ReadOnlySpan<char> span = "test".AsSpan();
        
        Regex regex = new Regex(pattern);
        Match match = regex.Match(input);
        Group group = match.Groups[0];
        Capture capture = group.Captures[0];
        
`;

for (const cat of csharpRegexCategories) {
  for (const entry of cat.entries) {
    if (cat.id === "csharp-syntax") {
      // Split by " / " or ", " for documentation lists so we test each variant
      const variants = entry.syntax.split(/ \/ |,\s+/);
      for (const variant of variants) {
        csCode += `        TestRegex(${JSON.stringify(variant)});\n`;
      }
    } else if (cat.id === "regex-options") {
      csCode += `        TestFlag(${entry.syntax});\n`;
    } else if (cat.id === "source-generator") {
      // Skip source generator attributes as they must be attached to partial methods
    } else {
      // It's a method call or property access
      // Split entries that contain multiple expressions like "Regex.Escape(str) / Regex.Unescape(str)"
      const variants = entry.syntax.split(/ \/ /);
      for (const variant of variants) {
        const stmt = variant.trim();
        if (stmt.includes("=")) {
          csCode += `        { ${stmt}; passed++; }\n`;
        } else {
          csCode += `        { _ = ${stmt}; passed++; }\n`;
        }
      }
    }
  }
}

csCode += `
        if (failed > 0) Environment.Exit(1);
    }
    
    static void TestRegex(string regexPat) {
        // Intercept dependent fragments to provide minimum viable context
        if (regexPat == "(?<close-open>pattern)") {
            regexPat = "(?<open>.*)(?<close-open>pattern)";
        } else if (regexPat == "(?(name)yes|no)") {
            regexPat = "(?<name>.*)(?(name)yes|no)";
        } else if (regexPat == "(?(1)yes|no)") {
            regexPat = "(.*)(?(1)yes|no)";
        } else if (regexPat.StartsWith("$")) {
            // Replacement string format
            try {
                Regex.Replace("test", "(?<name>test)", regexPat);
                passed++;
            } catch (Exception e) {
                Console.WriteLine("FAIL: " + regexPat + " -> " + e.Message);
                failed++;
            }
            return;
        }

        try {
            new Regex(regexPat);
            passed++;
        } catch (Exception e) {
            Console.WriteLine("FAIL: " + regexPat + " -> " + e.Message);
            failed++;
        }
    }

    static void TestFlag(RegexOptions options) {
        passed++;
    }
}
`;

fs.writeFileSync(path.join(csProjPath, "Program.cs"), csCode);

try {
  const out = execSync(`dotnet run --project ${csProjPath}`).toString();
  if (out.trim()) console.log(out.trim());
  let total = 0;
  for (const cat of csharpRegexCategories) {
    if (cat.id === "source-generator") continue;
    if (cat.id === "csharp-syntax") {
      total += cat.entries.reduce((sum, e) => sum + e.syntax.split(/ \/ |,\s+/).length, 0);
    } else if (cat.id === "regex-options") {
      total += cat.entries.length;
    } else {
      total += cat.entries.reduce((sum, e) => sum + e.syntax.split(/ \/ /).length, 0);
    }
  }
  report("C#", total, 0);
} catch (e: any) {
  const output = e.stdout?.toString() || e.message;
  console.log(output);
  const failedCount = (output.match(/FAIL:/g) || []).length;
  // Fallback total calculation
  report("C#", -1, failedCount); // Use -1 to indicate error in count logic, user will see the output
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
