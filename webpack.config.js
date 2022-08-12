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
  entry: "./src/lib/index.tsx",
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

// "prosemirror-model": "~1.16.1",
// "@types/prosemirror-model": "~1.16.0",

// "prosemirror-model": "^1.16.1",
// "@types/prosemirror-model": "^1.16.0",

// "prosemirror-view": "^1.23.6",
// "@types/prosemirror-view": "^1.23.0",

// "prosemirror-view": "~1.23.6",
// "@types/prosemirror-view": "~1.23.1"

// "resolutions": {
//   "prosemirror-commands": "~1.2.1",
//   "prosemirror-keymap": "~1.1.5",
//   "prosemirror-schema-list": "~1.1.6",
//   "prosemirror-state": "~1.3.4",
//   "prosemirror-transform": "~1.3.3",
//   "@types/prosemirror-commands": "~1.0.4",
//   "@types/prosemirror-keymap": "~1.0.4",
//   "@types/prosemirror-schema-list": "~1.0.3",
//   "@types/prosemirror-state": "~1.2.8",
//   "@types/prosemirror-transform": "~1.1.5"
// },

// "prosemirror-model@^1.11.0".
// "prosemirror-view@^1.15.5".

// "@types/prosemirror-keymap": "^1.0.4",
// "@types/prosemirror-commands": "^1.0.4",
// "@types/prosemirror-schema-list": "^1.0.3",
// "@types/prosemirror-state": "^1.2.8",
// "@types/prosemirror-transform": "^1.1.5",
// "prosemirror-commands": "^1.2.1",
// "prosemirror-schema-list": "^1.1.6",
// "prosemirror-state": "^1.3.4",
// "prosemirror-keymap": "^1.1.5",
// "prosemirror-transform": "^1.3.3",
