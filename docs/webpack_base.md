## Entry
用来指定webpack的打包入口
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
用来告诉webpack如何将编译后的文件输出到磁盘

###### 单入口配置
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/dist')
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
        path: path.join(__dirname, '/dist')
    }
}

## loaders
webpack开箱即用只支持js和json两种文件类型，其他文件类型需要loaders的支持，通过对应loader将文件转换成对应有效的模块，webpack解析时才能将这些模块加入依赖图中。
loader本身是一个函数，接收源文件作为参数，返回转换产物

#### 常见loaders
babel-loader  解析ES6/ES7等新语法
css-loader    css文件加载&解析
less-loader   less -> css
ts-loader     TS -> JS
file-loader   进行图片、字体、多媒体等的打包
raw-loader    将文件以字符串方式传入
thread-loader `多进程`打包JS和CSS

#### 使用方法
test 指定匹配规则; use 指定使用的loader名称
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
用于增强webpack的功能，loaders没办法完成的一些功能可以用plugins完成
用于bundle文件的优化, 资源管理和环境变量注入

#### 常见plugins
CommonsChunkPlugin        将chunks相同的模块代码提取成公共js
CleanWebpackPlugin        清理构建目录
ExtractTextWebpackPlugin  将CSS从bundle文件里提取成一个独立的CSS文件
CopyWebpackPlugin         将文件或者文件夹copy到构建的输出目录(output path)
HtmlWebpackPlugin         创建html文件去承载输出的bundle
UglifyjsWebpackPlugin     压缩JS
ZipWebpackPlugin          将打包出的资源生成一个Zip包

#### 使用方法
plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html'
    })
]

## mode
用于指定当前环境，可选项 production / development / none
设置mode后可以使用webpack内置的函数，默认值为production

# 解析
### 解析ES6
使用babel-loader
babel-presets preset是一系列plugins的集合
babel-plugins 一个plugin对应一个功能

### 解析JSX
babel/preset-react

### 解析图片和字体
file-loader

### 解析less/sass

### 文件监听
两种方式
- webpack观察模式: 启动webpack时，带上--watch参数。 缺点：没法自动刷新浏览器
- webpack.config.js中设置 watch: true

#### 原理
轮询判断文件的最后编辑时间是否变化
某个文件发生了变化，并不会立即告诉监听者，而是先缓存起来，等aggregateTimeout

### webpack-dev-server 热更新 HMR
webpack-dev-server --open 每次执行完自动开启浏览器
webpack-dev-middleware 适用于灵活的定制场景

#### 原理

### 文件指纹
hash
chunkHash
contentHash

### 代码压缩
HTML/CSS/JS
HTML: html-webpack-plugin 设置压缩参数
CSS: optimize-css-assets-webpack-plugin 同时使用cssnano
JS: UglifyJS ?
