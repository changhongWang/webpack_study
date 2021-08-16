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

## 持续集成

每一次发布版本之前 都应该有一个持续集成的功能，主要看用例是否能正常跑通
作用：

- 快速发现错误
- 防止分支大幅偏离主干
  核心措施：代码集成到主干之前，必须通过自动化测试。只要又一个测试用例失败，就不能集成。

## 发布包到 npm

每次发布之前注意打 git tag

## git 规范和 changelog 生成

良好的 git commit 优势：

- 加快 CR 流程
- 可以根据 git commit 直接生成 changelog
- 后续维护者可以知道 feature 被修改的原因

## git 提交标准规范

`
<type>(<scope>): <subject>
<BLANK LINE>

<body>
<BLANK LINE>
<footer>
`

##### 对格式的说明：

type 表示某次提交的类型，比如是修复一个 bug 还是提交一个新的 feature，现有 type 类型如下：

- feat: 新增 feature
- fix: 修复 bug
- docs: 仅仅修改了文档，比如 README、CHANGELOG 等
- style: 仅仅修改了空格、格式缩进等，不改变代码逻辑
- refactor: 优化重构，没有增加新的 feature 或者修复 bug
- perf: 优化相关，包括性能、体验
- test: 测试用例，包括单元测试、集成测试等
- chore: 改变构建流程，或者增加依赖库、工具等
- revert: 回滚

##### 本地开发阶段增加 precommit 钩子

husky + commitlint

## 语义化版本

##### semver 规范（语义化版本控制规范） semantic version

遵循 semver 规范的优势

- 避免出现循环依赖
- 依赖冲突减少

先行版本号(alpha/beta/rc[Release Candidate]): alpha 内测版，beta 测试版，rc 不会加入新的功能，主要用于 bug fix
0.1.0-alpha.0
