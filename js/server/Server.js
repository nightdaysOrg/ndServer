let express = require('express');
let http = require('http');
let https = require('https');
let fs = require('fs');
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();

let cors = require("../util/cors")

class Server {
    constructor() {
        let flag = this.loadJSONFile();
        if(!flag) return;
        this.status = 0 ; //0 初始化中 1 启动中 2 已启动  3 停止中 4 已停止 
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.requestConfig();
        this.loadServer();
      
    }

    requestConfig() {
        this.app.use(bodyParser.json());
    }


    loadJSONFile() {
        delete require.cache[require.resolve("../../server/config.json")];
        let config = require("../../server/config.json");
        if(!config.port || !config.items || !config.items instanceof Array) {
            return false;
        }
        this.port = config.port;
        this.items = config.items;
        return true;
    }

    loadServer() {
      
        for(let item of this.items) {
            let path = item.path || "";
            path = "/" + path;
            if(item.front) {
                this.app.use(path , express.static(item.front));
            }
            if(item.back) {
                this.backEnd(path , item.back);
            }
        }
    }

    open(cb) {
        this.status = 1;
        this.httpServer.listen(this.port,()=>{
            console.log("服务器启动"+this.port);
            this.status = 2;
            cb();
        });
    }

    close(cb) {
        this.status = 3;
        this.httpServer.close(()=>{
            this.status = 4;
            cb();
        });
    }

    backEnd(path , ctrlUrl) {
        delete require.cache[require.resolve(ctrlUrl)];
        let ctrl = require(ctrlUrl);
        let keys = Object.keys(ctrl);
        for(let key of keys) {
            this.app.use(path + "/" + key  , function(req,res,next){
                //处理跨域
                cors(res);
                ctrl[key](req,res,next);
            });
        }

    }

}

module.exports=Server;