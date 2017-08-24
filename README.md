# ndServer #
基于express编写的nodejs web服务器
因此请先安装nodejs

## 安装 ##
1. git clone https://github.com/nightdaysOrg/ndServer.git
2. cd ndsServer
3. npm install
4. 安装完毕
5. cd bin
6. startup.bat
7. 服务器启动成功

## 使用 ##
1. 静态html资源路径
config/server.js 中
修改staticResourcePath的值即可
 
2. 后端nodejs资源路径
config/server.js 中
修改controllersPath的值
之后在自己的项目中创建controllers.js,加入以下代码


>const controllers =  {
>     helloWorld (req, res, next) {
>        res.send('Hello world');
>    });
>}
>module.exports = {
>    controllers: controllers
>}
>
访问localhost:8080/helloWorld 就可以看到Hello world


例子位于web/manager
