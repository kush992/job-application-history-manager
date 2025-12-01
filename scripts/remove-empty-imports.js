#!/usr/bin/env node
/**
 * Script: remove-empty-imports.js
 * Scans project files (src/) for import statements that have empty specifiers like:
 *   import {} from 'module';
 * and removes those lines. This helps automatically get rid of accidental empty imports
 * before linting/formatting.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGET_DIRS = ['src', 'app', 'components', 'utils'];
const exts = ['.ts', '.tsx', '.js', '.jsx'];

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      walk(full, cb);
    } else {
      cb(full);
    }
  }
}

const emptyImportRegex = /^\s*import\s*{\s*}\s*from\s*['"][^'"]+['"];?\s*$/gm;

let changedFiles = 0;
for (const t of TARGET_DIRS) {
  const base = path.join(ROOT, t);
  if (!fs.existsSync(base)) continue;
  walk(base, (file) => {
    if (!exts.includes(path.extname(file))) return;
    let src = fs.readFileSync(file, 'utf8');
    if (!emptyImportRegex.test(src)) return;
    // remove matching lines
    const cleaned = src.replace(emptyImportRegex, '').replace(/\n{3,}/g, '\n\n');
    fs.writeFileSync(file, cleaned, 'utf8');
    changedFiles++;
    console.log('Removed empty imports from', path.relative(ROOT, file));
  });
}

if (changedFiles === 0) {
  console.log('No empty imports found.');
} else {
  console.log(`Fixed empty imports in ${changedFiles} file(s).`);
}
