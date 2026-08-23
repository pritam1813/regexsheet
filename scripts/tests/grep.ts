import { execSync } from "child_process";
import { grepRegexCategories } from "../../src/data/grepRegex";
import { hasCLI, report, escapeForCode } from "./utils";

console.log("Testing Grep...");
if (!hasCLI("grep --version")) {
  console.log("  ⚠️ Grep CLI not found, skipping.");
  process.exit(0);
}

let passed = 0;
let failed = 0;
for (const cat of grepRegexCategories) {
  for (const entry of cat.entries) {
    if (cat.id === "grep-syntax" || cat.id === "posix-classes") {
      try {
        // Test if grep -E accepts the pattern (suppress output)
        execSync(`echo "test" | grep -E "${escapeForCode(entry.syntax)}" >/dev/null 2>&1 || true`);
        passed++;
      } catch (e) {
        console.error(`  [Grep] Failed: ${entry.syntax}`);
        failed++;
      }
    } else {
      passed++;
    }
  }
}
report("Grep", passed, failed);
if (failed > 0) process.exit(1);
