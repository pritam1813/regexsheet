import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pdfCheatSheets } from "../src/data/pdfs.ts";
import { universalRegex, type RegexCategory } from "../src/data/regex.ts";
import { javascriptRegexCategories } from "../src/data/javascriptRegex.ts";
import { pythonRegexCategories } from "../src/data/pythonRegex.ts";
import { javaRegexCategories } from "../src/data/javaRegex.ts";
import { rRegexCategories } from "../src/data/rRegex.ts";
import { csharpRegexCategories } from "../src/data/csharpRegex.ts";
import { sqlRegexCategories } from "../src/data/sqlRegex.ts";
import { perlRegexCategories } from "../src/data/perlRegex.ts";
import { notepadppRegexCategories } from "../src/data/notepadppRegex.ts";
import { vimRegexCategories } from "../src/data/vimRegex.ts";
import { grepRegexCategories } from "../src/data/grepRegex.ts";

const dataMap: Record<string, RegexCategory[]> = {
  universal: universalRegex,
  javascript: javascriptRegexCategories,
  python: pythonRegexCategories,
  java: javaRegexCategories,
  r: rRegexCategories,
  csharp: csharpRegexCategories,
  sql: sqlRegexCategories,
  perl: perlRegexCategories,
  "notepad-plus-plus": notepadppRegexCategories,
  vim: vimRegexCategories,
  grep: grepRegexCategories,
};

const pdfDir = path.resolve("./pdf");
const typstTemplate = path.join(pdfDir, "cheatsheet.typ");
const tempJsonPath = path.join(pdfDir, "current-sheet.json");
const publicPdfsDir = path.resolve("./public/pdfs");
const rootPublicDir = path.resolve("./public");

// Ensure output directories exist
fs.mkdirSync(publicPdfsDir, { recursive: true });
fs.mkdirSync(rootPublicDir, { recursive: true });

console.log("==================================================");
console.log("  RegexSheet.com — Typst PDF Generation Tool");
console.log("==================================================\n");

// Check if Typst CLI is available
try {
  const version = execSync("typst --version", { encoding: "utf-8" }).trim();
  console.log(`Using compiler: ${version}\n`);
} catch {
  console.error("❌ Typst CLI is not installed or not found in PATH.");
  console.error("👉 Install via winget: winget install typst");
  console.error(
    "👉 Or download from: https://github.com/typst/typst/releases\n",
  );
  process.exit(1);
}

let successCount = 0;
let failCount = 0;

for (const sheet of pdfCheatSheets) {
  const categories = dataMap[sheet.slug] || [];
  if (categories.length === 0) {
    console.warn(
      `⚠️  Warning: No categories found for '${sheet.slug}', skipping.`,
    );
    continue;
  }

  const payload = {
    title: sheet.title,
    badge: sheet.badge,
    description: sheet.description,
    targetPage: sheet.targetPage,
    categories: categories.map((cat) => ({
      title: cat.title,
      entries: cat.entries.map((entry) => ({
        syntax: entry.syntax,
        description: entry.description,
        example: entry.example || null,
      })),
    })),
  };

  // Write temporary payload for Typst
  fs.writeFileSync(tempJsonPath, JSON.stringify(payload, null, 2), "utf-8");

  const pdfFileName = `regex-${sheet.slug}.pdf`;
  const outputPath = path.join(publicPdfsDir, pdfFileName);

  try {
    process.stdout.write(
      `• Building ${sheet.title} (${categories.length} pages)... `,
    );
    execSync(`typst compile "${typstTemplate}" "${outputPath}"`, {
      stdio: "pipe",
    });

    // Also copy universal to root public/ for backwards compatibility
    if (sheet.slug === "universal") {
      fs.copyFileSync(
        outputPath,
        path.join(rootPublicDir, "regex-cheat-sheet.pdf"),
      );
    }

    const stats = fs.statSync(outputPath);
    const sizeKb = (stats.size / 1024).toFixed(1);
    console.log(`✅ [${sizeKb} KB] → /pdfs/${pdfFileName}`);
    successCount++;
  } catch (error: any) {
    console.log(`❌ FAILED`);
    console.error(error.stderr ? error.stderr.toString() : error.message);
    failCount++;
  }
}

// Clean up temporary JSON file
if (fs.existsSync(tempJsonPath)) {
  fs.unlinkSync(tempJsonPath);
}

console.log("\n--------------------------------------------------");
console.log(
  `Done! ${successCount} PDFs generated successfully (${failCount} failed).`,
);
console.log(`All files saved to: ${publicPdfsDir}`);
console.log("--------------------------------------------------\n");
