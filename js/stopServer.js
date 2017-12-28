let http = require('http');

let options = {
    path:'/',
    port: 3370
}

let req = http.request(options,function(res){
    console.log('成功关闭服务器');
});
req.end();