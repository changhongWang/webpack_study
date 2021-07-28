# 进阶用法

## 自动清理构建目录

clean-webpack-plugin

## Tree Shaking

Tree Shaking，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)，它依赖于 ES2015 模块语法的静态结构特性，如 import 和 export。
这个术语和概念实际上是由 ES2015 模块打包工具 rollup 普及起来的。

side-effect-free 无副作用

## 代码分割

## webpack 打包工具库

## webpack 预渲染

## 静态资源内联

raw-loader

## CSS 内联

1. 借助 style-loader
2. html-inline-css-webpack-plugin

## webpack 多页面打包

## SourceMap

作用：通过 source map 定位到源代码
开发环境开启，线上环境关闭。

- 线上排查问题时可以将 sourceMap 上传到错误监控系统，如 Sentry

devtool: 'source-map'

## 提取公共资源

- 思路：将 react、react-dom 等基础包通过 CDN 引入，不打入 bundle 中
- 方法：使用 html-webpack-externals-plugin
  SplitChunksPlugin

## Scope Hoisting

###### webpack 打包存在的问题：

1. 每个模块引入时都会创建一个闭包
2. 大量函数闭包包裹代码，导致体积增大(模块越多越明显)
3. 运行代码时创建的函数作用域变多，内存开销变大

###### 使用方法

- mode 为 production 时默认开启 scode hoisting
- 必须是 ES6 语法，cjs 不适用

###### 原理

## 代码分割

对于大的 web 应用来讲，将所有的代码放在一个文件中显然是不够有效的，特别是当你的某些代码只有在某些特殊的时候才会被用到。
webpack 提供代码分割功能，当代码运行到需要他们的时候再进行加载。

##### 适用的场景

1. 抽离相同代码到一个共享块
2. 脚本**懒加载**，使得初始下载的代码更小

##### 懒加载脚本的方式

1. CommonJS: require.ensure
2. ES6: 动态 import (目前还没有浏览器原生支持，需要 babel 转换)

##### 动态 import

@babel/plugin-syntax-dynamic-import

## webpack + ESLint

ESLint 如何执行？

- 与 CI/CD 系统集成 - 不符合规则的构建不成功
  本地开发阶段增加 precommit 钩子(husky+lint-staged)
- 与 webpack 集成
  使用 eslint-loader，构建时检查 JS 规范
