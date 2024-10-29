const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = path.join(__dirname, '..', 'src');

module.exports = {
  devtool: 'source-map',
  entry: {
    popup: path.join(srcDir, 'popup/index.tsx'),
    background: path.join(srcDir, 'background/index.ts'),
    scripts: path.join(srcDir, 'scripts/index.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name].js',
  },
  // optimization: {
  //   splitChunks: {
  //     name: 'vendor',
  //     chunks(chunk) {
  //       return chunk.name !== 'background' || chunk.name !== 'scripts';
  //     },
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    alias: {
      popup: path.resolve(srcDir, 'popup'),
      background: path.resolve(srcDir, 'background'),
      assets: path.resolve(srcDir, 'assets'),
      styles: path.resolve(srcDir, 'styles'),
      types: path.resolve(srcDir, 'types'),
    },
    extensions: ['.d.ts', '.ts', '.tsx', '.js', '.svg'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: '../', context: 'public' }],
      options: {},
    }),
  ],
};
