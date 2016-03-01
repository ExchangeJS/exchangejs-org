const childProcess = require('child_process');
const path = require('path');
const node_modules_dir = path.resolve(__dirname, 'node_modules');
const webpack = require('webpack');

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
const definePlugin = new webpack.DefinePlugin({
  __DEV__: false,
  __VERSION__: childProcess.execSync('git rev-list HEAD --count').toString()
});

const config = {
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
