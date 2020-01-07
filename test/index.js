const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');

let bomBuffer = Buffer.from([0xef, 0xbb, 0xbf]);
let data = fs.readFileSync(path.resolve(__dirname, 'build', 'test.js'));

console.log('[Tests] File should contain BOM');
assert.strictEqual(data.includes(bomBuffer), true);

console.log('[Tests] Passed!');
