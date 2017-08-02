let express = require('express');
let config = require('../config/server')

let server = express();

server.use('/',express.static(config.staticResourcePath));

server.listen(config.port,'127.0.0.1',function(){
    console.log("服务启动中");
});