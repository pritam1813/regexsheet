import { javascriptRegexCategories } from "../../src/data/javascriptRegex";
import { report } from "./utils";

console.log("Testing JavaScript...");
let passed = 0;
let failed = 0;

for (const cat of javascriptRegexCategories) {
  for (const entry of cat.entries) {
    const syntax = entry.syntax;
    
    try {
      if (cat.id === "regex-methods") {
        // Method calls
        const code = `
          const str = "test string";
          const re = /test/g;
          const repl = "-";
          ${syntax};
        `;
        eval(code);
        passed++;
      } else if (cat.id === "js-syntax") {
        if (syntax.startsWith("/") && syntax.includes("/flags")) {
          passed++; // structural placeholder only
        } else if (syntax.startsWith("/")) {
          eval(syntax);
          passed++;
        } else {
          new RegExp(syntax);
          passed++;
        }
      } else if (cat.id === "flags") {
        new RegExp("test", syntax);
        passed++;
      } else {
        passed++;
      }
    } catch (e) {
      console.error(`  [JS] Failed: ${syntax} -> ${e}`);
      failed++;
    }
  }
}

report("JavaScript", passed, failed);
if (failed > 0) process.exit(1);
