# webpack学习

### webpack核心
- entry
- output
- mode
- loader
- plugin

#### 拓展
- 热更新
- code spliting
- tree shaking

##### 为什么需要构建工具
- 转换ES6语法
- 转换JSX / TSX
- CSS Prefix 前缀补全/预处理器(sass/lass)
- Uglify 压缩混淆
- 图片压缩

##### Grunt
本质上是一个Task Runner，Grunt可以将整个构建过程分成一个一个任务
比如，可以将打包过程分为解析HTML/CSS/JS，图片压缩、代码压缩、文件指纹（可以拆分成小任务）
任务处理完之后会将结果放到本地 /.temp 目录下，会导致打包速度慢（由于本地IO操作）

##### Gulp
Gulp有文件流的概念，每一个任务结果不会存到磁盘，而是存在内存中，在下一个步骤时可以直接使用上一个步骤的内存，大大加快打包速度