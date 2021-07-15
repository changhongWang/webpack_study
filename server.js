const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const config = require("./webpack.config");
const complier = webpack(config);

// 告诉express使用webpack-dev-middleware，以及将webpack.config.js配置文件作为基础配置
console.log(config.output.publicPath);
app.use(
  webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath,
  })
);

// 将文件server到3000端口
app.listen(3000, function () {
  console.log("Example App is running in PORT 3000");
});
