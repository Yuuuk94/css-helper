const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
  devtool: "source-map",
  entry: {
    popup: path.join(srcDir, "popup/index.tsx"),
    options: path.join(srcDir, "options/index.tsx"),
    background: path.join(srcDir, "background/index.ts"),
    content_script: path.join(srcDir, "content_script/index.tsx"),
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks(chunk) {
        return chunk.name !== "background";
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    alias: {
      popup: path.resolve(srcDir, "popup"),
      options: path.resolve(srcDir, "options"),
      background: path.resolve(srcDir, "background"),
      contentScript: path.resolve(srcDir, "content_script"),
      assets: path.resolve(srcDir, "assets"),
      components: path.resolve(srcDir, "components"),
      styles: path.resolve(srcDir, "styles"),
      types: path.resolve(srcDir, "types"),
    },
    extensions: [".ts", ".tsx", ".js", ".svg"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: "../", context: "public" }],
      options: {},
    }),
  ],
};
