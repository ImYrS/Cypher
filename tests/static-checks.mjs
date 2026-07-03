import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');

const zoneHtml = read('zone.html');
const loginHtml = read('login.html');

assert.match(
  zoneHtml,
  /contentType:\s*['"]application\/json['"]/,
  'DNS record create/update requests should declare JSON content-type'
);

assert.match(
  loginHtml,
  /<form\s+id="login-form">/,
  'login form should have a stable submit target'
);

assert.doesNotMatch(
  loginHtml,
  /onclick="login\(\)"/,
  'login submit should not depend on an inline onclick handler'
);

assert.match(
  loginHtml,
  /const login = \(event\) => \{/,
  'login handler should receive the submit event explicitly'
);

assert.match(
  loginHtml,
  /\$\('#login-form'\)\.on\('submit', login\);/,
  'login form should bind submit through JavaScript'
);

assert.match(
  loginHtml,
  /const getErrorMessage = \(resp\) => \{/,
  'login page should centralize API error message fallback'
);

assert.match(
  loginHtml,
  /if \(!resp\.result \|\| resp\.result\.length === 0\)/,
  'login page should handle accounts responses with no result'
);

console.log('static checks passed');
