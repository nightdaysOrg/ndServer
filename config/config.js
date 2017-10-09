const port = 8080;

const staticResourcePath = `F:/mySelfItem/fileSystem_frontEnd`;

const controllersPath = `F:/mySelfItem/fileSystem-backEnd/service/controllers`;

const httpsPath = ``;

//https 端口号 默认为443
const httpsPort = 443;

//服务器关闭端口号 13001
const closePort = 13001; 

module.exports = {
    port:port,
    staticResourcePath : staticResourcePath.trim(),
    controllersPath : controllersPath.trim(),
    httpsPath : httpsPath.trim(),
    httpsPort : httpsPort,
    closePort : closePort
}

