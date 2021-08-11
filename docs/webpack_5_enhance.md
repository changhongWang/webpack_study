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

#### 构建完成后会在 8888 端口展示大小
