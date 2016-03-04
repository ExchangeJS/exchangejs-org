const fs = require('fs');
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
  'webpack.production.config.js',
  'worker.bundle.js',
  'worker.bundle.js.map'
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
  __VERSION__: Date.now(),
  __FILES_TO_CACHE__: JSON.stringify(FILES_TO_CACHE)
});

module.exports = {
    entry: {
        index: "./src/index.js",
        worker: "./src/worker.js"
    },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel', // 'babel-loader' is also a legal name to reference
              query: {
                presets: ['es2015']
              }
            }
        ]
    },
    plugins: [definePlugin]
};
