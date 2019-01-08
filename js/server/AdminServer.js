let express = require("express");
let http = require("http");
let https = require("https");
let cors = require("../util/cors")
let bodyParser = require('body-parser');

class Server {
  constructor(processManager) {
    this.processManager = processManager;
    this.serverConfig = new express();
    this._server = http.createServer(this.serverConfig);
  }

  init(option) {

    //配置服务器参数
    this.config(option);

    //配置服务器请求路由
    for (let item of option.items) {
       //根据配置文件中的 items 处理项目
      this.build(item);
    }
  }

  config(option) {
    this.status = 0 ; //0 初始化中 1 启动中 2 已启动  3 停止中 4 已停止 

    //端口号
    this.port = option.port;
    
    // 配置请求处理方式 application/json
    this.serverConfig.use(bodyParser.json());
    //配置请求处理方式 application/x-www-form-urlencoded
    // this.serverConfig.use(bodyParser.urlencoded());

  }

  build(item) {
    let path = item.path || "";
    if (item.front) {
      //如果配置项存在front 则作为前端项目处理
      this.buildFront(path, item.front);
    } else if (item.back) {
      //如果配置项存在back  则作为后端项目处理
      this.buildBack(path, item.back);
    }
  }

  buildFront(path, front) {
    this.serverConfig.use("/" + path, express.static(front));
  }

  buildBack(path, back) {
    //后端必须配置请求处理controller
    let controllerList = require(back);
    for(let controllerName in controllerList) {
      let p = path ? path + "/" + controllerName : controllerName;
      let controller = controllerList[controllerName];
      this.makeController(p , controller);
    }
  }

  makeController(path , controller) {
    this.serverConfig.use( "/" +  path , (req , res , next)=>{
        //处理跨域
        cors(res);
        if(req.method.toUpperCase() != 'POST' && req.method.toUpperCase() != 'GET') {
            res.send("跨域检测完成");
        }else {
          if(req.method.toUpperCase() == 'POST') {
            req.data = {...req.query , ...req.body};
          }else if(req.method.toUpperCase() == 'GET') {
            req.data = req.query;
          }
          controller(req,res,next,this.processManager);
        }
    })
  }

  start(cb) {
    this.status = 1;//启动中
    this._server.listen(this.port , ()=>{
      this.status = 2; //已启动
      cb();
    });
  }

  close(cb) {
    this.status = 3; //关闭中
    this._server.close(()=>{
      this.status = 4; //已关闭
    });
  }
}

module.exports = Server;
