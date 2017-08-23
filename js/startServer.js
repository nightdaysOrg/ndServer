let express = require('express');
let config = require('../config/server');
let controllers = require(config.controllersPath);

let server = express();

//前端资源
server.use('/',express.static(config.staticResourcePath));

//后端资源
controllers.init(server);

server.listen(config.port,'127.0.0.1',function(){
    console.log("服务启动中");
});