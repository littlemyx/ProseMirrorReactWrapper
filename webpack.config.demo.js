const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: "./src/demo/index.tsx",
  output: {
    // filename: "[name].bundle.js"
    filename: "index.js"
  },
  optimization: {
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       chunks: "initial",
    //       name: "vendor"
    //     }
    //   }
    // },
    minimize: false
  },
  devServer: {
    open: true,
    hot: true,
    host: "localhost",
    port: 9000
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
    new HtmlWebpackPlugin({
      name: "index.html",
      inject: true,
      template: "dist/index.html"
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    mainFields: ["module", "main"],
    exportsFields: ["module", "exports"]
  }
};
