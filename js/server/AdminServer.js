let express = require('express');
let http = require('http');
let https = require('https');
let fs = require('fs');
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();

let cors = require("../util/cors")

let ServerManager = require("./ServerManager");

/**
 * 管理器对象 是一个单独的服务器程序 和其他项目是隔离开的  如果要看 加载其他项目 需要看ServerManager
 */
class AdminServer {
    constructor() {
        this.config = express();
        this.app = http.createServer(this.config);
        this.serverManager = new ServerManager();
        this.requestConfig();
        this.frontEnd();
        this.backEnd();
        
        this.app.listen(8888,()=>{
            console.log("总服务器启动8888");
            //启动ServerManager 进行加载其他项目
            this.serverManager.start();
        });
    }


    requestConfig() {
        this.config.use(bodyParser.json());
    }

    //管理服务器的前端项目位置
    frontEnd() {
        this.config.use("/",express.static("../web/manager/pages"));
    }

    //管理服务器的后端项目位置
    backEnd() {
        let ctrl = require("../../web/manager/controller")
        let keys = Object.keys(ctrl);
        for(let key of keys) {
            this.config.use("/" + key  , (req,res,next)=>{
                //处理跨域
                cors(res);
                if(req.method.toUpperCase() != 'POST' && req.method.toUpperCase() != 'GET') {
                    res.send("跨域检测完成");
                }else{
                    ctrl[key](req,res,next,this.serverManager);
                }
            });
        }

    }
}

module.exports=AdminServer;