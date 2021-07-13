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