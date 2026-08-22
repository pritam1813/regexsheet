import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { javaRegexCategories } from "../../src/data/javaRegex";
import { hasCLI, report, escapeForCode } from "./utils";

console.log("Testing Java...");
if (!hasCLI("java --version")) {
  console.log("  ⚠️ Java CLI not found, skipping.");
  process.exit(0);
}

const tempDir = path.join(process.cwd(), "temp_regex_tests");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
const scriptPath = path.join(tempDir, "TestJavaRegex.java");

let javaCode = `
import java.util.regex.*;

public class TestJavaRegex {
    static int passed = 0;
    static int failed = 0;
    
    public static void main(String[] args) {
        // Mocks for evaluating methods (if needed in future)
        String regex = "\\\\d+";
        String replacement = "-";
        CharSequence input = "test 123";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        matcher.find();
        
`;
for (const cat of javaRegexCategories) {
  for (const entry of cat.entries) {
    if (cat.id === "java-syntax" || cat.id === "posix-classes") {
      javaCode += `        testRegex("${escapeForCode(entry.syntax)}");\n`;
    } else if (cat.id === "flags") {
      // In Java, flags are passed as ints (e.g. Pattern.CASE_INSENSITIVE)
      // Since it's Java code, we just evaluate if it compiles by assigning it
      javaCode += `        testFlagCode(${entry.syntax});\n`;
    }
  }
}
javaCode += `
        if (failed > 0) System.exit(1);
    }
    
    static void testRegex(String regexPat) {
        try {
            Pattern.compile(regexPat);
            passed++;
        } catch (Exception e) {
            System.out.println("FAIL: " + regexPat + " -> " + e.getMessage());
            failed++;
        }
    }

    static void testFlagCode(int flag) {
        passed++;
    }
}
`;
fs.writeFileSync(scriptPath, javaCode);

try {
  const out = execSync(`java ${scriptPath}`).toString();
  if (out.trim()) console.log(out.trim());
  let total = javaRegexCategories.filter(c => c.id === "java-syntax" || c.id === "posix-classes" || c.id === "flags")
                .reduce((acc, c) => acc + c.entries.length, 0);
  report("Java", total, 0);
} catch (e: any) {
  const output = e.stdout?.toString() || e.message;
  console.log(output);
  const failedCount = (output.match(/FAIL:/g) || []).length;
  let total = javaRegexCategories.filter(c => c.id === "java-syntax" || c.id === "posix-classes" || c.id === "flags")
                .reduce((acc, c) => acc + c.entries.length, 0);
  report("Java", total - failedCount, failedCount);
  process.exit(1);
} finally {
  fs.rmSync(scriptPath, { force: true });
}
