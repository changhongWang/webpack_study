<!--
 * @Description: 
 * @Author: changhong.wang
 * @Date: 2021-08-17 19:09:58
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-09-17 23:58:17
-->
# 通过源代码掌握webpack打包原理
## webpack命令行
通过 npm scripts 运行webpack
- 开发环境 npm run dev
- 生产环境 npm run build

通过 webpack 直接运行
webpack --config webpack.dev.js / webpack entry.js

##### webpack是如何启动的
查找webpack入口文件
执行webpack xxx后，npm会让命令行工具进入 node_modules/.bin 目录下查找是否存在webpack.sh或webpack.cmd文件(windows)。（如果是全局安装，在Mac/Linux下会从/user/local/.bin下去找），如果存在就执行，否则抛出错误。
实际的入口文件是：node_modules/webpack/bin/webpack.js

###### webpack5启动
1. 先检查webpack-cli是否安装。如果未安装，就根据锁文件确定当前用的包管理工具，并询问用户是否需要安装webpack-cli
2. 已经安装了webpack-cli的话，直接执行runCli方法

###### webpack4启动
`
process.exitCode = 0; // 设定正常执行返回值
const runCommand = () => {} // 执行命令方法
const isInstalled = () => {} // 判断是否安装某个包的方法
const CLIs = []; // 声明webpack可用的cli
const installedCLIs = CLIs.filter((cli) => cli.installed); // 判断两个cli是否有安装了的(webpack-cli / webpack-command)
if (installedCLIs.length === 0) {} else if (===1) {} else {} // 根据安装数量进行处理 没安装的提示安装/1个的正常/安装两个的提示建议卸载一个，或从二进制文件目录执行webpack构建命令
`

##### 启动结果
webpack最终找到webpack-cli(webpack-command)这个包，并且执行CLI

## webpack-cli (webpack-cli@3)做了什么
1. 引入yargs，对命令行进行定制
2. 分析命令行参数，对各个参数进行转换，组成编译配置项
3. 引用webpack，根据配置项进行编译和构建（主要）

NON_COMPILATION_ARGS 数组
内含的8个命令在命令行输入时是不会去实例化webpack的，而是会直接去运行

##### webpack-cli执行结果
webpack-cli对配置文件和命令行参数进行转换最终生成配置选项参数options，最终会根据配置参数实例化webpack对象，然后执行构建流程。


## Tapable
Tapable是一个类似于Node.js中EventEmitter的库，主要是控制钩子函数的发布与订阅，控制着webpack的插件系统。
Tapable库暴露了很多钩子，为插件提供挂载的钩子。
`
const {
    SyncHook,           // 同步钩子
    SyncBailHook,       // 同步熔断钩子
    SyncWaterfallHook,  // 同步流水钩子
    SyncLoopHook,       // 同步循环钩子
    AsyncParallelHook,          // 异步并发钩子
    AsyncParallelBailHook,      // 异步并发熔断钩子
    AsyncSeriesHook,            // 异步串行钩子
    AsyncSeriesBailHook,        // 异步串行熔断钩子
    AsyncSeriesWaterfallHook    // 异步串行流水钩子
}
`

##### Hook类的使用
1. 实例化构造函数Hook
2. 注册（一次或者多次）
3. 执行（传入参数）
4. 有需要的话还可以增加对整个流程（包括注册和执行）的监听-拦截器

## webpack执行流程
按照以下的钩子调用顺序执行
1. entry-option - 初始化option
2. run - 开始编译
3. make - 从entry开始递归分析依赖，对每个依赖模块进行build
4. before-resolve - 对模块位置进行解析
5. build-module - 开始构建某个模块
6. normal-module-loader - 将loader加载完成的module进行编译，生成AST树
7. program - 遍历AST，当遇到require等一些调用表达式时，收集依赖 require('clean-webpack-plugin')
8. seal - 所有依赖build完成，开始优化
9. emit - 输出到dist目录

##### chunk生成算法
1. webpack先将entry中对应的module都生成一个新的chunk
2. 遍历module的依赖列表，将依赖的module也加入到chunk中
3. 如果一个依赖module是动态引入的模块，那么就会根据这个module创建一个新的chunk，继续遍历依赖
4. 重复上面的过程，直到得到所有chunks
