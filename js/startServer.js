let express = require('express');
let config = require('../config/server');
let ctrlConfig = require(config.controllersPath);
let controllersRoot = ctrlConfig.root;
let controllers = ctrlConfig.controllers;

let server = express();

//前端资源
server.use('/',express.static(config.staticResourcePath));

let rootPath = "/";
if(controllersRoot){
    rootPath += controllersRoot + "/";
}
//后端资源
for(let ctrl in controllers){
    server.use(rootPath+ctrl,controllers[ctrl]);
}

server.listen(config.port,'127.0.0.1',function(){
    console.log("服务启动中");
});