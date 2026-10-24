import { createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import path from 'node:path';

const root = path.resolve('assets/work');
await mkdir(root, { recursive: true });

const assets = [
  ['khwela-logo.png', 'https://getkhwela.com/khwela-logo.png'],
  ['salessaver-icon.png', 'https://salessaver.io/icons/icon-512.png'],
  ['rentz-apple-touch.png', 'https://www.getrentz.co.za/apple-touch-icon.png'],
  ['eyabantu-logo.png', 'https://life.eyabantu.co.za/branding/logo.png'],
  ['eyabantu-icon.png', 'https://life.eyabantu.co.za/branding/eyabantu-app-icon-180.png'],
];

for (const [name, url] of assets) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    console.error('FAIL', name, res.status, url);
    continue;
  }
  const dest = path.join(root, name);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  console.log('OK', name, res.headers.get('content-type'));
}
