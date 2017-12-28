let express = require('express');
let http = require('http');
let https = require('https');
let fs = require('fs');
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();

let loadContrl = require("./util/loadController");
let serverManager = require("./util/ServerManager");

let cors = require("./util/cors")

var admin = express();
var adminServer = http.createServer(admin);

admin.use("/",express.static("../web/manager/pages"));
loadContrl(admin, require("../web/manager/controller") , function(req,res,next){
    //处理跨域
    cors(res);
});

serverManager.init();



adminServer.listen(8888,function(){
    console.log("服务器启动8888")
});


//关闭进程
let stopServer = express();
stopServer.listen(3370, 'localhost', function () {
});
stopServer.use('/', function (req, res) {
    res.send('关闭服务器');
    console.log('服务器关闭');
    setTimeout(() => process.exit(), 0);
})
