## Entry

用来指定 webpack 的打包入口
根据入口文件寻找依赖

###### 单入口

适合单页应用 SPA
module.exports = {
entry: './src/index.js'
}

###### 多入口

适合多页应用
module.exports = {
entry: {
app: './src/app.js',
index: './src/index.js'
}
}

## Output

用来告诉 webpack 如何将编译后的文件输出到磁盘

###### 单入口配置

module.exports = {
entry: './src/index.js',
output: {
filename: 'bundle.js',
path: path.join(\_\_dirname, '/dist')
}
}

###### 多入口配置

module.exports = {
entry: {
app: './src/app.js',
index: './src/index.js'
},
output: {
filename: '[name].js',
path: path.join(\_\_dirname, '/dist')
}
}

## loaders

webpack 开箱即用只支持 js 和 json 两种文件类型，其他文件类型需要 loaders 的支持，通过对应 loader 将文件转换成对应有效的模块，webpack 解析时才能将这些模块加入依赖图中。
loader 本身是一个函数，接收源文件作为参数，返回转换产物

#### 常见 loaders

babel-loader 解析 ES6/ES7 等新语法
css-loader css 文件加载&解析
less-loader less -> css
ts-loader TS -> JS
file-loader 进行图片、字体、多媒体等的打包
raw-loader 将文件以字符串方式传入
thread-loader **多进程**打包 JS 和 CSS

#### 使用方法

test 指定匹配规则; use 指定使用的 loader 名称
优先级从下到上，从右到左

module: {
rules: [
{
test: /\.css$/,
use: 'css-loader'
}
]
}

## plugins

用于增强 webpack 的功能，loaders 没办法完成的一些功能可以用 plugins 完成
用于 bundle 文件的优化, 资源管理和环境变量注入

#### 常见 plugins

CommonsChunkPlugin 将 chunks 相同的模块代码提取成公共 js
CleanWebpackPlugin 清理构建目录
ExtractTextWebpackPlugin 将 CSS 从 bundle 文件里提取成一个独立的 CSS 文件
CopyWebpackPlugin 将文件或者文件夹 copy 到构建的输出目录(output path)
HtmlWebpackPlugin 创建 html 文件去承载输出的 bundle
UglifyjsWebpackPlugin 压缩 JS
ZipWebpackPlugin 将打包出的资源生成一个 Zip 包

#### 使用方法

plugins: [
new HtmlWebpackPlugin({
template: './src/index.html'
})
]

## mode

用于指定当前环境，可选项 production / development / none
设置 mode 后可以使用 webpack 内置的函数，默认值为 production

# 解析

### 解析 ES6

使用 babel-loader
babel-presets preset 是一系列 plugins 的集合
babel-plugins 一个 plugin 对应一个功能

### 解析 JSX

babel/preset-react

### 解析图片和字体

file-loader

### 解析 less/sass

### 文件监听

两种方式

- webpack 观察模式: 启动 webpack 时，带上--watch 参数。 缺点：没法自动刷新浏览器
- webpack.config.js 中设置 watch: true

#### 原理

轮询判断文件的最后编辑时间是否变化
某个文件发生了变化，并不会立即告诉监听者，而是先缓存起来，等 aggregateTimeout

### webpack-dev-server 热更新 HMR

webpack-dev-server --open --open: 每次执行完自动开启浏览器
webpack-dev-middleware 适用于灵活的定制场景 - 使用 webpack-hot-middleware package，以在自定义 server 或应用程序上启用 HMR

#### 原理

### 文件指纹

hash: 和**整个项目**的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
chunk hash: 和 webpack 打包的 **chunk** 有关，不同的 **entry** 会生成不同的 chunk hash 值
content hash: 根据**文件内容**来定义 hash, 文件内容不变, 则 content hash 不变

js 文件指纹设置
`module.exports = { output: { filename: '[name][chunkhash:8].js' } }`
CSS 文件指纹设置
设置 MiniCssExtractPlugin 的 filename，使用 [contenthash]
`module.exports = { plugins: [ new MiniCssExtractPlugin({ filename: '[name][contenthash:8].css' }) ] }`

### 代码压缩

HTML/CSS/JS
HTML: html-webpack-plugin 设置压缩参数
CSS: optimize-css-assets-webpack-plugin 同时使用 cssnano
JS: UglifyJS ?
