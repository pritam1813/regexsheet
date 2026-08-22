import { execSync } from "child_process";

export function hasCLI(command: string): boolean {
  try {
    execSync(`${command}`, { stdio: "ignore", shell: true });
    return true;
  } catch (e) {
    return false;
  }
}

export function report(lang: string, passed: number, failed: number) {
  console.log(`\n--- ${lang} Results ---`);
  console.log(`✅ Passed: ${passed}`);
  if (failed > 0) console.log(`❌ Failed: ${failed}`);
}

export function escapeForCode(syntax: string): string {
  return syntax.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}
