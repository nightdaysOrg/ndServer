let Server = require("./Server");

module.exports=class ServerManager {
    constructor() {
        this.server = new Server();
    }

    start(cb) {
        this.server.open(cb);
    }

    restart(cb) {
        this.server.close(()=>{
            console.log("关闭成功");
            this.server = new Server();
            this.server.open(cb);
        });
    }

    close(cb) {
        this.server.close(()=>{
            console.log("关闭成功");
            cb();
        });
    }
}

