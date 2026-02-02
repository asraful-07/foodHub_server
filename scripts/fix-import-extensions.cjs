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
  const replacer = function(m, p1, q1, pth, q2) {
    // Only handle relative imports
    if (!pth.startsWith('./') && !pth.startsWith('../')) return p1 + q1 + pth + q2;
    const fileDir = path.dirname(file);
    const candidateBase = path.resolve(fileDir, pth);
    const tryPaths = [candidateBase + '.js', path.join(candidateBase, 'index.js'), candidateBase + '.mjs', candidateBase];
    for (const t of tryPaths) {
      if (fs.existsSync(t)) {
        // compute replacement relative path from fileDir
        let rel = path.relative(fileDir, t);
        if (!rel.startsWith('.')) rel = './' + rel;
        rel = rel.replace(/\\/g, '/');
        return p1 + q1 + rel + q2;
      }
    }
    // fallback: append .js
    return p1 + q1 + pth + '.js' + q2;
  };

  s = s.replace(/(import\s+[\s\S]+?from\s+)(['"])(\.\/?\.?[^'"\n]*?)(['"])/g, replacer);
  s = s.replace(/(export\s+[\s\S]+?from\s+)(['"])(\.\/?\.?[^'"\n]*?)(['"])/g, replacer);
  s = s.replace(/(^|\n)(import\s+)(['"])(\.\/?\.?[^'"\n]*?)(['"];?)/g, replacer);
  fs.writeFileSync(file, s, 'utf8');
}

const dist = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(dist)) {
  console.error('dist/ not found, skipping import fix');
  process.exit(0);
}
walk(dist);
console.log('Fixed import extensions in dist/');
