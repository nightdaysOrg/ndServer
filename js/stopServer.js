let http = require('http');

let options = {
    path:'/',
    port:13001
}

let req = http.request(options,function(res){
    console.log('成功关闭服务器');
});
req.end();