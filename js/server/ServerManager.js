let Server = require("./Server");
let config = require("../../server/config.json");
let path = require('path');
const fs = require('fs');

const { execSync } = require('child_process');

module.exports = class ServerManager {
    constructor() {
        this.server = new Server();
    }

    start(cb) {
        this.server.open(cb);
    }

    restart(cb) {
        this.server.close(() => {
            console.log("关闭成功");
            this.server = new Server();
            this.server.open(cb);
        });
    }

    close(cb) {
        this.server.close(() => {
            console.log("关闭成功");
            cb();
        });
    }

    gitPull(url, cb) {
        execSync("git pull", { cwd: url });
        cb();
    }

    addServer(submitForm , cb) {

        for(let item of config.items) {
            if(item.code == submitForm.code){
                cb(true);
                return;
            }
        }

        config.items.push(submitForm);

        if(submitForm.front) {
            execSync("mkdir "+submitForm.front);
        }

        let str = JSON.stringify(config);
        let reg = new RegExp("[\,]" , "g");
        str = str.replace(reg , ',\r\n');
        reg = new RegExp("[\{]" , "g");
        str = str.replace(reg , '{\r\n');
        reg = new RegExp("[\}]" , "g");
        str = str.replace(reg , '\r\n}');
        reg = new RegExp("[\[]" , "g");
        str = str.replace(reg , '[\r\n');
        reg = new RegExp("[\]]" , "g");
        str = str.replace(reg , '\r\n]');

        fs.writeFileSync(path.resolve(__dirname , '../../server/config.json' ) , str)
        this.restart(cb);
    }
}

