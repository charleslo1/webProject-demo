# web项目组件化开发实践

## 环境准备
```javascript
  // 安装fis3及相关插件
  npm install fis3 fis-parser-swig fis-parser-node-sass fis3-hook-commonjs fis3-postpackager-loader -g
```

## 运行Demo
```javascript
  // 进入子系统
  cd webProject-demo/web
  
  // 安装第三方包
  fis3 install
  
  // 编译发布
  fis3 release pub
  
  // 启动fis3内置node服务器浏览
  fis3 server start
```
## 运行结果
 ![image](./docs/assets/demo.png)