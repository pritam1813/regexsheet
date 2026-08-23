import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { pythonRegexCategories } from "../../src/data/pythonRegex";
import { hasCLI, report } from "./utils";

console.log("Testing Python...");
let pyCommand = "python";
if (!hasCLI("python --version")) {
  if (hasCLI("python3 --version")) {
    pyCommand = "python3";
  } else {
    console.log("  ⚠️ Python CLI not found, skipping.");
    process.exit(0);
  }
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
# Provide a mock match object that contains the groups referenced in the cheat sheet
m = re.search(r"(?P<name>[a-z]+) (?P<year>\\d{4})", "test 2026")

passed = 0
failed = 0

def run_test(test_code, category):
    global passed, failed
    # For python raw strings, strip the r"..." so it compiles purely
    test_str = test_code
    if category == "python-syntax" and test_str.startswith('r"') and test_str.endswith('"'):
        test_str = test_str[2:-1]

    # Inject required context for dependent regex fragments
    if test_str == "(?P=name)":
        test_str = "(?P<name>.*)(?P=name)"
    elif test_str == "(?(id)yes|no)":
        test_str = "(?P<id>.*)(?(id)yes|no)"

    try:
        if category == "python-syntax":
            if test_str.startswith("\\\\g"):
                # It is a replacement string, test it using m.expand()
                m.expand(test_str)
            else:
                # It is a regex pattern
                re.compile(test_str)
        elif category == "flags":
            # Test flag by combining it in compile
            flag_val = eval(test_code)
            try:
                re.compile("test", flag_val)
            except ValueError:
                # re.LOCALE requires bytes pattern
                re.compile(b"test", flag_val)
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
    pyCode += `run_test(${JSON.stringify(entry.syntax)}, "${cat.id}")\n`;
  }
}

pyCode += `\nsys.exit(failed)\n`;
fs.writeFileSync(scriptPath, pyCode);

try {
  const out = execSync(`${pyCommand} ${scriptPath}`).toString();
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
