const fs = require('fs');
const path = require('path');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && full.endsWith('.js')) fixFile(full);
  }
}

function fixFile(file) {
  let s = fs.readFileSync(file, 'utf8');
  // Replace import ... from './foo' -> './foo.js'
  s = s.replace(/(import\s+[\s\S]+?from\s+)(['"])(\.\/[^'"\n]+?)(['"])/g, (m, p1, q1, pth, q2) => {
    if (pth.endsWith('.js') || pth.endsWith('.json') || pth.includes('.')) return `${p1}${q1}${pth}${q2}`;
    return `${p1}${q1}${pth}.js${q2}`;
  });
  // Replace export ... from './foo' -> './foo.js'
  s = s.replace(/(export\s+[\s\S]+?from\s+)(['"])(\.\/[^'"\n]+?)(['"])/g, (m, p1, q1, pth, q2) => {
    if (pth.endsWith('.js') || pth.endsWith('.json') || pth.includes('.')) return `${p1}${q1}${pth}${q2}`;
    return `${p1}${q1}${pth}.js${q2}`;
  });
  // Replace bare import './foo';
  s = s.replace(/(^|\n)(import\s+)(['"])(\.\/[^'"\n]+?)(['"];?)/g, (m, pre, p1, q1, pth, q2) => {
    if (pth.endsWith('.js') || pth.endsWith('.json') || pth.includes('.')) return `${pre}${p1}${q1}${pth}${q2}`;
    return `${pre}${p1}${q1}${pth}.js${q2}`;
  });

  fs.writeFileSync(file, s, 'utf8');
}

const dist = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(dist)) {
  console.error('dist/ not found, skipping import fix');
  process.exit(0);
}
walk(dist);
console.log('Fixed import extensions in dist/');
