var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
      index: "./src/index.js",
      worker: "./src/worker.js"
  },
  output: {
      filename: "[name].bundle.js",
      chunkFilename: "[id].bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,

      // There is not need to run the loader through
      // vendors
      exclude: [node_modules_dir],
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  devtool: "#sourcemap"
};

module.exports = config;
