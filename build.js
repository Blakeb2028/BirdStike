/**
 * Build static site: inject WEB3FORMS_ACCESS_KEY from .env into HTML, output to dist/.
 * Run: node build.js
 * For CI (e.g. GitHub Actions), set WEB3FORMS_ACCESS_KEY in env; .env is optional.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname);
const dist = path.join(root, 'dist');

// Load .env if present (local dev). CI uses env vars from Secrets.
const envPath = path.join(root, '.env');
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf8');
  for (const line of env.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const i = trimmed.indexOf('=');
    if (i === -1) continue;
    const k = trimmed.slice(0, i).trim();
    let v = trimmed.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
      v = v.slice(1, -1);
    process.env[k] = v;
  }
}

const key = process.env.WEB3FORMS_ACCESS_KEY;
if (!key || key.trim() === '') {
  console.error('Missing WEB3FORMS_ACCESS_KEY. Set it in .env or as an environment variable.');
  process.exit(1);
}

const placeholder = '__WEB3FORMS_ACCESS_KEY__';

function inject(html) {
  if (!html.includes(placeholder)) {
    console.warn('Placeholder __WEB3FORMS_ACCESS_KEY__ not found in HTML.');
    return html;
  }
  return html.split(placeholder).join(key.trim());
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// dist/
ensureDir(dist);

// index.html
let index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
index = inject(index);
fs.writeFileSync(path.join(dist, 'index.html'), index, 'utf8');
console.log('Wrote dist/index.html');

// thank-you.html (no injection)
fs.copyFileSync(path.join(root, 'thank-you.html'), path.join(dist, 'thank-you.html'));
console.log('Wrote dist/thank-you.html');

// styles.css, script.js
fs.copyFileSync(path.join(root, 'styles.css'), path.join(dist, 'styles.css'));
fs.copyFileSync(path.join(root, 'script.js'), path.join(dist, 'script.js'));
console.log('Wrote dist/styles.css, dist/script.js');

// images/
const imgSrc = path.join(root, 'images');
const imgDest = path.join(dist, 'images');
ensureDir(imgDest);
for (const name of fs.readdirSync(imgSrc)) {
  const p = path.join(imgSrc, name);
  if (fs.statSync(p).isFile()) {
    fs.copyFileSync(p, path.join(imgDest, name));
  }
}
console.log('Wrote dist/images/');

console.log('Build done. Deploy the contents of dist/ to GitHub Pages.');
