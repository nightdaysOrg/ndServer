const path = require("path");
const express = require("express");
const Server = require("./server/AdminServer");
const ProcessManager = require("./server/ProcessManager");

const __base = path.resolve(__dirname, "../");

const managerOption = {
  port: 8888,
  items: [
    {
      back: path.resolve(__base, "web/manager")
    }
  ]
};

let processManager;

//主进程入口
function start() {
  //管理子进程
  processManager = new ProcessManager(
    path.resolve(__base, "js/server/ServerManager")
  );
  
  const _manager = new Server(processManager);
  _manager.init(managerOption);
  _manager.start(() => {
    console.log("管理服务器启动：" + _manager.port);
    processManager.start();
  });
}

//总结束入口  监听停止端口
function stop() {
  let stopServer = express();
  stopServer.listen(3370, "localhost", function() {});
  stopServer.use("/", function(req, res) {
    res.send("关闭服务器");
    console.log("总服务器关闭");
    if(processManager && processManager.process) {
      processManager.process.exit();
    }
    setTimeout(() => process.exit(), 0);
  });
}

start();
stop();
