/* global Buffer */
const fs = require('fs');
const path = require('path');

function UTF8BOMPlugin(addBOM, fileMask) {
  this.fileMask = fileMask || /\.(html|htm|css|js|map)$/;
  this.addBOM = addBOM;
}

UTF8BOMPlugin.prototype.apply = function(compiler) {
  compiler.hooks.done.tap('UTF8BOMPlugin', (stats) => {
    const outputPath = stats.compilation.outputOptions.path;
    const files = stats.compilation.assets;
    const logger = compiler.getInfrastructureLogger('UTF8BOMPlugin');

    for (const fileName in files) {
      if (!fileName.match(this.fileMask)) {
        continue;
      }

      const existingFilePath = path.resolve(outputPath, fileName);

      let buff = fs.readFileSync(existingFilePath);

      if (this.addBOM) {
        logger.log('Add BOM: ' + fileName);
        if (
          buff.length < 3 ||
          buff[0].toString(16).toLowerCase() !== 'ef' ||
          buff[1].toString(16).toLowerCase() !== 'bb' ||
          buff[2].toString(16).toLowerCase() !== 'bf'
        ) {
          const bom = Buffer.from([0xef, 0xbb, 0xbf]);
          buff = bom + buff;
          fs.writeFileSync(existingFilePath, buff.toString(), 'utf8');
        }
      } else {
        logger.log('Remove BOM: ' + fileName);
        if (
          buff.length >= 3 &&
          buff[0].toString(16).toLowerCase() === 'ef' &&
          buff[1].toString(16).toLowerCase() === 'bb' &&
          buff[2].toString(16).toLowerCase() === 'bf'
        ) {
          buff = buff.slice(3);
          fs.writeFileSync(existingFilePath, buff.toString(), 'utf8');
        }
      }
    }
  });
};

module.exports = UTF8BOMPlugin;
