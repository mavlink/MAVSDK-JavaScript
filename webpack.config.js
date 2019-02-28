const path = require('path');

const development = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'DronecodeSDK': path.resolve(__dirname, 'vendor/index.js')
    }
  },
  output: {
    library: 'DronecodeSDK',
    libraryTarget: 'umd',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
};

module.exports = development;
