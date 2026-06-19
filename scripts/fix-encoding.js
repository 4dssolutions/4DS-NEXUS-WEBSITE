const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const arrowMojibake = '\u00e2\u2020\u2019'; // â†' style corruption of
const harrMojibake = '\u00e2\u2020\u201d'; // â†" for ↔

const replacements = [
  [new RegExp(`\\s*${arrowMojibake}`, 'g'), ''],
  [//g, ''],
  [new RegExp(harrMojibake, 'g'), '&harr;'],
  [/\u00e2\u20ac\u201c/g, '\u2013'], // â€" en dash
  [/\u00e2\u20ac\u201d/g, '\u2014'], // â€" em dash  
  [/\u00c3\u00a0/g, '\u00e0'], // à
  [/\u00c3\u00a9/g, '\u00e9'], // é
  [/\u00c2\u00b7/g, '\u00b7'], // ·
];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      walk(p);
      continue;
    }
    if (!/\.(html|js)$/.test(name)) continue;

    let content = fs.readFileSync(p, 'utf8');
    const original = content;
    for (const [pattern, replacement] of replacements) {
      content = content.replace(pattern, replacement);
    }
    if (content !== original) {
      fs.writeFileSync(p, content, 'utf8');
      console.log('Fixed:', path.relative(root, p));
    }
  }
}

walk(root);
