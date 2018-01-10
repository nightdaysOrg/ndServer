let express = require('express');
let http = require('http');
let https = require('https');
let fs = require('fs');
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();

let cors = require("./util/cors");

let config = require("../../server/config");


function makeItem( item, app) {
    let pathName = item.path || "";
    pathName = "/" + pathName;

    //加载静态资源
    for (let staticPath of item.static) {
        app.use(pathName, express.static(staticPath))
    }

    let loadContrl = require("./loadController");
    //加载后端controller资源
    for (let controllerPath of item.controller) {
        //重启服务器 清楚缓存
        delete require.cache[require.resolve(controllerPath)];
        loadContrl(app , require(controllerPath) , pathName , function(req,res,next) {
            //跨域处理
            cors(res);
        });
    }


}

function makeServer(port, config) {
    var app = express();
    app.use(bodyParser.json());
    var server = http.createServer(app);

    for (let name in config) {
        let item = config[name];
        makeItem( item, app);
    }

    return server;
}

module.exports = makeServer;
