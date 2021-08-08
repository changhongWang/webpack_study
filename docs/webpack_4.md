# 编写可维护的 webpack 构建配置

参照项目：https://github.com/changhongWang/build_webpack

## 构建配置抽离成 npm 包的意义

##### 通用性

- 业务开发者无需关注构建配置
- 统一团队构建脚本

##### 可维护性

- 构建配置合理的拆分
- README 文档、changelog 文档等

##### 质量

- 冒烟测试、单元测试、测试覆盖率
- 持续集成

## 构建配置包设计

1. 通过多个配置文件管理不同环境的 webpack 配置，通过 webpack-merge 进行组合

- webpack.base.js / webpack.dev.js / webpack.prod.js / webpack.ssr.js ...

2. 抽成一个 npm 包统一管理

- 规范：遵循 git commit、readme、eslint、semver 规范
- 质量：冒烟测试、单元测试、测试覆盖率和 CI 持续集成

## 冒烟测试

定义：冒烟测试是指对提交测试的软件在进入详细深入的测试之前进行的预测试，主要目的是暴露导致软件需**重新发布**的基本功能失效等严重问题。（保障基本功能可用）

执行：

1. 判断构建是否成功 - 通过传入脚本给 webpack
2. 每次构建完成 build 目录是否有内容输出 - 通过 mocha 等单元测试工具

- 是否有 css、js 等静态资源文件
- 是否有 HTML 文件

## 单元测试

- Mocha / AVA: 单纯的测试框架，需要断言库(如 chai/should.js/expect/better-assert)
- Jasmine / Jest: 集成框架，开箱即用
- 极简 API

##### 利用 mocha+chai 编写单元测试

- describe 描述一个文件，每一个文件都由 describe 进行包裹
- it: 一个 it 表示一个测试用例
- expect 断言，如 expect(add(1, 2).to.equal(3))
- 命令: mocha add test.js

#### 测试覆盖率

istanbul
