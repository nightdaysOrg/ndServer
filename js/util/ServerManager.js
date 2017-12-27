
let loadServer = require("./loadServer");

function Server(port) {
    this.port = port;
    this.status = 0 ; //0 初始化中 1 启动中 2 已启动  3 停止中 4 已停止 
    this._server = null;
}

Server.prototype.create = function() {
    let config = require("../../server/config.json");
    this._server = loadServer(this.port, config[this.port]);
}

Server.prototype.open = function(cb) {
    this.create();
    this._server.listen(this.port, ()=>{
        this.status = 2;
        console.log("服务器已启动", this.port);
        if(cb){
            cb();
        }
    });
}

Server.prototype.close = function(cb) {
    if(this._server){
        this._server.close(()=>{
            this.status = 4;
            this._server = null;
            console.log("服务器已停止", this.port);
            if(cb){
                cb();
            }
        });
    }
}


function ServerManager() {
    this.list = [];
    this.index = 0;
}

ServerManager.prototype.createServer = function(port) {
    var server = new Server(port);
    server.id = this.index++;
    server.open();
    this.list.push(server);
}

ServerManager.prototype.init = function(){
    let config = require("../../server/config.json");
    for(let port in config){
        this.createServer(port);
    }
}

var server;

module.exports = (function(){
    if(!server) {
        server = new ServerManager();
    }
    return server;
})();