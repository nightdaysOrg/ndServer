module.exports =  {

    helloWorld: function (req,res,next) {
        process.serverManager.send("hellow");
        console.log(req.data);
        res.send('Hello');
    },

    webhook: function (req,res,next,serverManager) {
        let code = req.data.code;
        for(let item of serverManager.server.items) {
            if(item.code == code) {
                let gitUrl = item["git"];
                let noPullRestart = item["noPullRestart"];
                serverManager.gitPull(gitUrl,function() {
                    if(noPullRestart){
                        return;
                    }
                    serverManager.restart(function(){
                            res.send({success: true});
                    });
                });
            }
        }
    },

    getServer: function (req,res,next,serverManager) {
        let temp = {};
        temp.port = serverManager.server && serverManager.server.port  || '';
        temp.items = serverManager.server && serverManager.server.items || [];
        temp.status = serverManager.server.status;
        res.send(temp);
    },

    closeServer: function (req,res,next,serverManager) {
        serverManager.close(function(){
            res.send({success: true});
        });
    },

    restartServer: function (req,res,next,serverManager) {
        serverManager.restart(function(){
            res.send({success: true});
        });
    },

    openServer: function (req,res,next,serverManager) {
        serverManager.start(function(){
            res.send({success: true});
        });
    },

    gitPull: function (req,res,next,serverManager) {
        serverManager.gitPull(req.data.url,function() {
            res.send({success: true});
        });
    },

    addServer: function(req, res, next , serverManager){
        serverManager.addServer(req.data , function(e) {
            if(!e) {
                res.send({success: true});
            } else {
                res.send({success: false , errmsg : '已经存在该项目'});
            }
        })
    }




}
