# ndServer #
基于express编写的nodejs web服务器
因此请先安装nodejs

## 安装 ##
1. git clone https://github.com/nightdaysOrg/ndServer.git
2. cd ndsServer
3. npm install
4. 安装完毕

## 使用 ##
1. 静态html资源路径
config/server.js 中
修改staticResourcePath的值即可
 
2. 后端nodejs资源路径
config/server.js 中
修改controllersPath的值
之后在自己的项目中创建controllers.js,加入以下代码


>const controllers = function (server) {
>    server.use('/hello', function (req, res, next) {
>        res.send('Hello world');
>    });
>}
>module.exports = {
>    init: controllers
>}
>

例子位于web/manager
