<!--
 * @Description: 
 * @Author: changhong.wang
 * @Date: 2021-08-17 19:09:58
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-08-18 17:11:27
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