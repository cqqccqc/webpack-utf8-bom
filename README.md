# webpack-utf8-bom

ADD or REMOVE UTF-8 BOM(byte order mark) for webpack.

## Usage

In webpack config file:

```javascript
var webpack = require('webpack');

// import plugin
var BomPlugin = require('webpack-utf8-bom');

module.exports = {
  // ...
  plugins: [
    // Add plugin in plugins list
    // true for adding bom
    // false for removing bom
    new BomPlugin(true)
  ],
 // ...
};
```
