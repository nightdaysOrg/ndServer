const path = require('path');
const {fork , execSync} = require('child_process');

const __base = path.resolve(__dirname , '../../');

class ProcessManager {
    constructor(path) {
        this.path = path;
    }
    
    start(cb) {
        this.process = fork(path.resolve(this.path));
        this.process.on('message' , (serverConfig)=>{
            this.server = serverConfig;
            cb && cb();
        })
    }

    restart(cb) {
        console.log("开始关闭web服务器");
        this.process.kill();
        console.log("关闭成功");
        console.log("开始重启web服务器");
        this.process = null;
        this.start();
        cb && cb();
    }

    stop(cb) {
        console.log("开始关闭web服务器");
        this.process.kill();
        console.log("关闭成功");
        this.process = null;
        cb && cb();
    }

    //拉取项目
    gitPull(url, cb) {
        execSync("git pull", { cwd: url });
        cb();
    }
}

module.exports = ProcessManager;