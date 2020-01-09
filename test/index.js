const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const BomPlugin = require('../webpack-utf8-bom');

const getWebpackConfig = (fileName, withBom) => {
  return {
    mode: 'development',
    entry: path.resolve(__dirname, 'test.js'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: fileName + '.js'
    },
    plugins: [new BomPlugin(withBom)]
  };
};

const build = config => {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

let data;
let bomBuffer = Buffer.from([0xef, 0xbb, 0xbf]);

return Promise.resolve()
  .then(() => {
    console.log('[Tests] Build');

    return build([
      getWebpackConfig('main-with-bom', true),
      getWebpackConfig('main', false)
    ]);
  })
  .then(() => {
    console.log('[Tests] File should contain BOM');

    data = fs.readFileSync(path.resolve(__dirname, 'build', 'main-with-bom.js'));
    assert.strictEqual(data.includes(bomBuffer), true);
  })
  .then(() => {
    console.log('[Tests] File should not contain BOM');

    data = fs.readFileSync(path.resolve(__dirname, 'build', 'main.js'));
    assert.strictEqual(data.includes(bomBuffer), false);
  })
  .then(() => {
    console.log('[Tests] Passed!');
  })
  .catch(error => {
    console.log(error);
    console.log('[Tests] Failed!');
  });
