module.exports =  {

    helloWorld:function(req,res,next){
        console.log("有更新了");
        res.send('Hello');
    },

    getServer:function(req,res,next,serverManager){
        let temp = {};
        temp.port = serverManager.server && serverManager.server.port  || '';
        temp.items = serverManager.server && serverManager.server.items || [];
        temp.status = serverManager.server.status;
        res.send(temp);
    },

    closeServer: function(req,res,next,serverManager){
        serverManager.close(function(){
            res.send({success: true});
        });
        // let serverInst = server.list.get(req.body.port+"");
        // if(!serverInst){
        //     res.send({success: true});
        //     return;
        // }
        // serverInst.close(function(){
        //     res.send({success: true});
        // });
    },

    restartServer: function(req,res,next,serverManager){
        serverManager.restart(function(){
            res.send({success: true});
        });
    },

    openServer: function(req,res,next,serverManager){
        serverManager.start(function(){
            res.send({success: true});
        });
        // let serverInst = server.list.get(req.body.port+"");
        // if(!serverInst){
        //     res.send({success: true});
        //     return;
        // }
        // serverInst.open(function(){
        //     res.send({success: true});
        // });
    },

    gitPull: function(req,res,next,serverManager){
        serverManager.gitPull(req.body.url,function() {
            res.send({success: true});
        });
    }


}
