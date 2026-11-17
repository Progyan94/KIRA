import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Absolute No-Emoji Compliance Audit', () => {
  // Regex to detect Unicode emojis: emoticons, pictographs, transport, misc symbols, flags, dingbats
  const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

  function getAllSourceFiles(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
          getAllSourceFiles(fullPath, fileList);
        }
      } else if (
        file.endsWith('.ts') ||
        file.endsWith('.tsx') ||
        file.endsWith('.css') ||
        file.endsWith('.html') ||
        file.endsWith('.svg')
      ) {
        fileList.push(fullPath);
      }
    }
    return fileList;
  }

  it('verifies that zero emojis exist anywhere in source code, content, or styling', () => {
    const srcDir = path.resolve(__dirname, '..');
    const allFiles = getAllSourceFiles(srcDir);
    expect(allFiles.length).toBeGreaterThan(15);

    const violations: { file: string; line: number; match: string }[] = [];

    for (const file of allFiles) {
      // Skip this test file itself since it contains the regex definition
      if (file.endsWith('noEmojiAudit.test.ts')) continue;

      const content = fs.readFileSync(file, 'utf-8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        const match = line.match(emojiRegex);
        if (match) {
          violations.push({
            file: path.relative(srcDir, file),
            line: index + 1,
            match: match[0],
          });
        }
      });
    }

    if (violations.length > 0) {
      console.error('EMOJI VIOLATIONS FOUND:', violations);
    }

    expect(violations).toHaveLength(0);
  });
});
