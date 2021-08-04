# 编写可维护的 webpack 构建配置

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
