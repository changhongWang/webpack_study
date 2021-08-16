## SSR 的优势

1. 减少白屏时间
2. SEO 友好

## 实现思路

##### 服务端

- 使用 react-dom/server 的 renderToString 方法将 React 组件渲染成字符串
- 服务端路由返回对应的模板

##### 客户端

- 打包出针对服务端的组件
