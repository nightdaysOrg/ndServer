let express = require('express');
let http = require('http');
let https = require('https');
let fs = require('fs');
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();

let loadContrl = require("./util/loadController");

let AdminServer = require("./server/AdminServer");
//ServerManager 管理某一个端口下的所有业务


//*admin 管理项目 */
new AdminServer();
//*admin 管理项目 */



//关闭进程
let stopServer = express();
stopServer.listen(3370, 'localhost', function () {
});
stopServer.use('/', function (req, res) {
    res.send('关闭服务器');
    console.log('服务器关闭');
    setTimeout(() => process.exit(), 0);
})
