/*
 * @Description:
 * @Author: changhong.wang
 * @Date: 2021-07-27 22:53:09
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-08-17 16:49:13
 */
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

// const smp = new SpeedMeasurePlugin();
const PATHS = {
  src: path.join(__dirname, 'src'),
};
const prodConfig = {
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
    new FriendlyErrorsWebpackPlugin(),
    // new OptimizeCssAssetsWebpackPlugin({
    //   assetNameReqExp: /\.css$/g,
    //   cssProcessor: require("cssnano"),
    // }),
    // new BundleAnalyzerPlugin(),
    new PurgeCSSPlugin({
      // 插件支持的路径为绝对路径; 多页面场景下需要传递数组
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
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
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          "eslint-loader",
        ],
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

// smp包裹之后minicss会出问题
// module.exports = smp.wrap(prodConfig);
module.exports = prodConfig;
