/*
 * @Description: 
 * @Author: changhong.wang
 * @Date: 2021-07-27 22:53:09
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-07-27 23:36:55
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./",
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "管理输出",
      template: "./index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    // new OptimizeCssAssetsWebpackPlugin({
    //   assetNameReqExp: /\.css$/g,
    //   cssProcessor: require("cssnano"),
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      overrideBrowserslist: ["last 2 version", ">1%", "ios 7"],
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        }, 'eslint-loader'],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8][ext]",
            },
          },
        ],
      },
    ],
  },
};
