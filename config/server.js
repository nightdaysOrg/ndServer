const port = 8080;

//该属性不能为空
// const staticResourcePath = `
//     E:/workspace/ShopkeeperFE/dist
// `;

const staticResourcePath = `F:/mySelfItem/ndServer/web/manager`;

const controllersPath = `F:/mySelfItem/ndServer/web/manager/controllers.js`;

module.exports = {
    port:port,
    staticResourcePath : staticResourcePath.trim(),
    controllersPath : controllersPath.trim()
}

