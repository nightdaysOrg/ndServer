const port = 8080;

//该属性不能为空
// const staticResourcePath = `
//     E:/workspace/ShopkeeperFE/dist
// `;

const staticResourcePath = `F:/mySelfItem/fileSystem/web`;

const controllersPath = `F:/mySelfItem/fileSystem/web/controllers.js`;

module.exports = {
    port:port,
    staticResourcePath : staticResourcePath.trim(),
    controllersPath : controllersPath.trim()
}

