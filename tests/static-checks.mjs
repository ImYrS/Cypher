import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');

const zoneHtml = read('zone.html');

assert.match(
  zoneHtml,
  /contentType:\s*['"]application\/json['"]/,
  'DNS record create/update requests should declare JSON content-type'
);

console.log('static checks passed');
