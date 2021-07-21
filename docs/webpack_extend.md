# 进阶用法

## 自动清理构建目录

clean-webpack-plugin

## Tree Shaking

## 代码分割

## webpack 打包工具库

## webpack 预渲染

## CSS 内联

1. 借助 style-loader
2. html-inline-css-webpack-plugin

## webpack 多页面打包

## SourceMap

作用：通过 source map 定位到源代码
开发环境开启，线上环境关闭。

- 线上排查问题时可以将 sourceMap 上传到错误监控系统，如 Sentry

devtool: 'source-map'
