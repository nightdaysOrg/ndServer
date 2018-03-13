let express = require('express');
let http = require('http');
let https = require('https');
let fs = require('fs');
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();

let cors = require("../util/cors")

let ServerManager = require("./ServerManager");

class AdminServer {
    constructor() {
        this.config = express();
        this.app = http.createServer(this.config);
        this.serverManager = new ServerManager();
        this.requestConfig();
        this.frontEnd();
        this.backEnd();
        
        this.app.listen(8888,function(){
            console.log("总服务器启动8888")
        });
    }



    requestConfig() {
        this.config.use(bodyParser.json());
    }

    frontEnd() {
        this.config.use("/",express.static("../web/manager/pages"));
    }

    backEnd() {
        let ctrl = require("../../web/manager/controller")
        let keys = Object.keys(ctrl);
        for(let key of keys) {
            this.config.use("/" + key  , (req,res,next)=>{
                //处理跨域
                cors(res);
                ctrl[key](req,res,next,this.serverManager);
            });
        }

    }
}

module.exports=AdminServer;