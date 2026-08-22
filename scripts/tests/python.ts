import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { pythonRegexCategories } from "../../src/data/pythonRegex";
import { hasCLI, report } from "./utils";

console.log("Testing Python...");
if (!hasCLI("python --version")) {
  console.log("  ⚠️ Python CLI not found, skipping.");
  process.exit(0);
}

const tempDir = path.join(process.cwd(), "temp_regex_tests");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
const scriptPath = path.join(tempDir, "test_python.py");

let pyCode = `
import re
import sys

pat = r"\\d+"
s = "test string 123"
repl = "-"
flags = re.IGNORECASE
pattern = r"\\w+"
group = 0
n = 1
template = r"\\g<1>"
m = re.search(r"(?P<year>\\d{4})", "2026")

passed = 0
failed = 0

def run_test(test_code, category):
    global passed, failed
    try:
        if category == "python-syntax":
            # For raw strings, evaluate it to get the string, then compile
            if test_code.startswith('r"') and test_code.endswith('"'):
                re.compile(eval(test_code))
            else:
                re.compile(test_code)
        elif category == "flags":
            # Test flag by combining it in compile
            re.compile("test", eval(test_code))
        else:
            # Methods and functions
            try:
                eval(test_code)
            except SyntaxError:
                exec(test_code)
        passed += 1
    except Exception as e:
        print(f"FAIL: {test_code} -> {e}")
        failed += 1

`;

for (const cat of pythonRegexCategories) {
  for (const entry of cat.entries) {
    pyCode += `run_test("""${entry.syntax}""", "${cat.id}")\n`;
  }
}

pyCode += `\nsys.exit(failed)\n`;
fs.writeFileSync(scriptPath, pyCode);

try {
  const out = execSync(`python ${scriptPath}`).toString();
  if (out.trim()) console.log(out.trim());
  let total = pythonRegexCategories.reduce((acc, c) => acc + c.entries.length, 0);
  report("Python", total, 0);
} catch (e: any) {
  const output = e.stdout?.toString() || e.message;
  console.log(output);
  const failedCount = (output.match(/FAIL:/g) || []).length;
  let total = pythonRegexCategories.reduce((acc, c) => acc + c.entries.length, 0);
  report("Python", total - failedCount, failedCount);
  process.exit(1);
} finally {
  fs.rmSync(scriptPath, { force: true });
}
