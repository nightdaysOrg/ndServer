const Server = require('./Server');
const path = require('path');

const __base = path.resolve(__dirname , '../../');

class ServerManager {

    constructor() {
        this.config = require(path.resolve(__base , './config/config.json'));
    }

    start() {
        let server = new Server();
        server.init(this.config);
        server.start(()=>{
            let config = {
                port : this.config.port,
                items : server.items
            };
            process.send(config);
            console.log("web服务器启动："+this.config.port);
        });
    }

}

let serverManager = new ServerManager();
serverManager.start();