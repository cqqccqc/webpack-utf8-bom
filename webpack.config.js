var path = require('path');
var webpack = require('webpack');
var BomPlugin = require('./webpack-utf8-bom');

var srcPath = './src/';
var libPath = './node_modules';

module.exports = {
  entry: {
    test: './test'
    },
    
  output: {
    path: path.resolve(__dirname, "build"),
    filename: '[name].js'
  },

  plugins: [
    new BomPlugin()
  ],


  module: {
    loaders: [
      // html
      // { test: /\.htm(l?)$/, loader: 'html-loader' },
      // 提取css
      //{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      //.css 文件使用 style-loader 和 css-loader 来处理
      // { test: /\.css$/, loader: 'style-loader!css-loader' },
      // es6 use babel-loader
      // { test: /\.es(6?)$/, loader: 'babel-loader', query: { compact: false } },
      
      //.jsx 文件使用 jsx-loader 来编译处理
      // { test: /\.jsx$/, loaders: ['jsx?harmony'], include: [path.join(__dirname, 'src')] },
      
      //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
      // { test: /\.scss$/, loader: 'style!css!scss?sourceMap' },
      //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
      // { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      // { test: /\.woff(2*)$/, loader: "url?limit=10000&minetype=application/font-woff" },
      // { test: /\.ttf$/, loader: "file" },
      // { test: /\.eot$/, loader: "file" },
      // { test: /\.svg$/, loader: "file" },
      // export jquery to window
      //{test: libPath + 'jquery/jquery.min.js', loader: 'expose?jQuery'},
    ],
  },
  // externals: {
  //   '$': 'window.jquery',
  // },
  resolve: {
    root: [srcPath, libPath],
    extensions: ['', '.js', '.jsx', '.coffee', '.html', '.css', '.scss'],
    
  }
};
