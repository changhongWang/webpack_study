# webpack 性能优化（打包速度和体积优化）

## 使用内置的 stats

stats: 构建的统计信息
`"scripts": { "build:stats": "webpack --env production --json > stats.json" }`

缺点：
颗粒度太粗，看不出问题所在；无法分析出对于为什么生成的资源体积那么大、哪一个部分导致的如 js 文件的体积大；只能分析出最终的大小

## 速度分析：使用 speed-measure-webpack-plugin

可以看到每个 plugin 和 loader 的耗时情况

## 体积分析：使用 webpack-bundle-analyzer 分析体积

`
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')

module.exports = {
plugins: [
new BundlenalyzerPlugin()
]
}
`
构建完成后会在 8888 端口展示大小
找到占用体积大的模块，按需加载

## 使用高版本的 webpack 和 node 进行打包也会对打包速度有显著的提升

- V8 引擎带来的优化(for...of 代替 forEach、Map 和 Set 代替 Object、includes 代替 indexOf)
- webpack4 默认使用更快的 md4 hash 算法
- webpack AST 可以直接从 loader 传递给 AST，减少解析时间
- 使用字符串方法替代正则表达式

## 开启多进程、多实例构建

##### 可选方案

- thread-loader (webpack 官方推出)
- parallel-webpack
- HappyPack

## 多进程压缩代码

- parallel-uglify-plugin
- uglifyjs-webpack-plugin 开启 parallel 参数
- terser-webpack-plugin 开启 parallel 参数

## 分包

html-webpack-externals-plugin
splitChunks
DLLPlugin / DLLReferencePlugin

##### 进一步分包：预编译资源模块

思路：将 react、react-dom、redux、react-redux 基础包和业务基础包打包成一个文件
方法：使用 DLLPlugin 进行分包，DLLReferencePlugin 对 manifast.json 引用

DLLPlugin：可以对多个框架、组件、库进行提取，提取之后会生成一个包文件，另外会同时生成一个 manifest.json 文件。manifest.json 是对分离出来的包的描述

###### 使用 DLLPlugin 进行分包

webpack.dll.js

`
const webpack = require('webpack')

module.exports = {
// ...
entry: {
library: {
'react',
'react-dom',
'react-redux
},
// 如果有业务库的话，可以多入口打包
// busiLibrary: {},
output: {
library: '[library]'
},
plugins: [
new webpack.DllPlugin({
name: '[name]',
path: './build/library/[name].json'
})
]
}
}
`

## 缓存

目的：提升二次构建速度

##### 思路

- babel-loader 开启缓存
- terser-webpack-plugin 开启缓存
- 使用 cache-loader 或 hard-source-webpack-plugin

## 缩小构建目标

目的：尽可能的少构建模块
比如 babel-loader 不解析 node_modules

## 减少缩小范围（用 resolve）

- 优化 resolve.modules 配置（减少模块搜索层级）
- 优化 resolve.mainFields 配置
- 优化 resolve.extensions 配置
- 合理使用 alias

## Tree-shaking 擦除无用的 js 和 css

使用 purgecss-webpack-plugin，和 mini-css-extract-plugin 配合使用

## 构建体积优化：动态Polyfill
针对每台设备，所需的polyfill是固定的。
## 这里再看看 不同方案比较
es6-shim

polyfill-service
Polyfill.io
根据UA判断当前浏览器版本有哪些特性不支持，从而返回对应Polyfill

## webpack优化方法总结

- scope hoisting
- Tree shaking
- 公共资源分离
- 图片压缩
- 动态Polyfill