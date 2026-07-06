import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');

const zoneHtml = read('zone.html');
const zonesHtml = read('zones.html');
const loginHtml = read('login.html');
const indexHtml = read('index.html');
const readme = read('README.md');
const gitignore = read('.gitignore');

const htmlFiles = {
  'index.html': indexHtml,
  'login.html': loginHtml,
  'zone.html': zoneHtml,
  'zones.html': zonesHtml,
};

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

for (const [name, html] of [
  ['zone.html', zoneHtml],
  ['zones.html', zonesHtml],
]) {
  assert.match(
    html,
    /const escapeHtml = \(value\) => \{/,
    `${name} should provide HTML escaping for API-rendered values`
  );

  assert.match(
    html,
    /return escapeAttr\(escaped\);/,
    `${name} should attribute-escape inline handler arguments after JS escaping`
  );
}

assert.match(
  zonesHtml,
  /escapeHtml\(zone\.name\)/,
  'zones page should escape zone names before rendering'
);

assert.match(
  zonesHtml,
  /escapeHtml\(zone\.plan\.name\)/,
  'zones page should escape plan names before rendering'
);

assert.match(
  zoneHtml,
  /escapeHtml\(record\.content\)/,
  'records page should escape DNS record content before rendering'
);

assert.match(
  zoneHtml,
  /escapeAttr\(record\.name\)/,
  'records page should escape DNS record names in attributes'
);

assert.match(
  zoneHtml,
  /escapeHtml\(item\.name\)/,
  'records page should escape zone option text before rendering'
);

for (const [file, html] of Object.entries(htmlFiles)) {
  for (const link of html.match(/<a\b[^>]*target="_blank"[^>]*>/g) || []) {
    assert.match(
      link,
      /rel="noopener noreferrer"/,
      `${file} external link should include rel="noopener noreferrer": ${link}`
    );
  }
}

assert.doesNotMatch(
  zonesHtml,
  /data-zones=/,
  'zones page Umami script should not use data-zones'
);

assert.match(
  zonesHtml,
  /data-domains="dns\.imyrs\.cn,dns\.imyrs\.com"/,
  'zones page Umami script should use data-domains'
);

assert.match(
  gitignore,
  /^\.DS_Store$/m,
  '.gitignore should ignore .DS_Store with the correct case'
);

assert.doesNotMatch(
  readme,
  /Add readme/i,
  'README should not contain the old todo placeholder'
);

assert.match(readme, /## Usage/, 'README should document usage');
assert.match(readme, /## Token permissions/, 'README should document token permissions');

console.log('static checks passed');
