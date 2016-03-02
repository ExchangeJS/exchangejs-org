const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const node_modules_dir = path.resolve(__dirname, 'node_modules');
const webpack = require('webpack');

const FILES_TO_EXCLUDE = [
  '.eslintrc',
  '.git',
  '.gitignore',
  'CNAME',
  'README.md',
  'build',
  'events',
  'node_modules',
  'package.json',
  'src',
  'webpack.config.js',
  'webpack.production.config.js'
];
function arr_includes(arr, target) {
  return arr.filter((elem) => elem === target).length > 0;
}
const FILES_TO_CACHE =
  fs.readdirSync('.').
    filter((file) => !arr_includes(FILES_TO_EXCLUDE, file));

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
const definePlugin = new webpack.DefinePlugin({
  __CACHE_ENABLED__: true,
  __VERSION__: childProcess.execSync('git rev-list HEAD --count').toString(),
  __FILES_TO_CACHE__: JSON.stringify(FILES_TO_CACHE)
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
  devtool: "#sourcemap",
  plugins: [definePlugin]
};

module.exports = config;
