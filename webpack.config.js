const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dronecode_sdk.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
