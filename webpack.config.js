const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const getPackageJson = require("./scripts/getPackageJson");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { version, name, license, repository, author } = getPackageJson(
  "version",
  "name",
  "license",
  "repository",
  "author"
);

const banner = `
  ${name} v${version}
  ${repository.url}

  Copyright (c) ${author.replace(/ *<[^)]*> */g, " ")} and project contributors.

  This source code is licensed under the ${license} license found in the
  LICENSE file in the root directory of this source tree.
`;

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/lib/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build"),
    // library: "ProseMirrorReactWrapper",
    // libraryTarget: "umd",
    clean: true
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: false }),
      new CssMinimizerPlugin()
    ]
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|json|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/index.css"
    }),
    new webpack.BannerPlugin(banner)
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    // mainFields: ["browser", "main"]
    exportsFields: ["module", "exports"]
  }
};
