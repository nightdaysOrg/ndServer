module.exports =  {

    helloWorld:function(req,res,next){
        res.send('Hello');
    },

    getServerList:function(req,res,next,server){
        var list = [];
        for(let [key,value] of server.list){
            let statusText = "初始化中";
            switch (value.status) {
                case 0: statusText = "初始化中"; break;
                case 1: statusText = "启动中"; break;
                case 2: statusText = "已启动"; break;
                case 3: statusText = "停止中"; break;
                case 4: statusText = "已停止"; break;
            }
            list.push({port: key , id: value.id , status: statusText}); //0 初始化中 1 启动中 2 已启动  3 停止中 4 已停止 
        }
        res.send(list);
    },

    closeServer: function(req,res,next,server){
        let serverInst = server.list.get(req.body.port+"");
        if(!serverInst){
            res.send({success: true});
            return;
        }
        serverInst.close(function(){
            res.send({success: true});
        });
    },

    openServer: function(req,res,next,server){
        let serverInst = server.list.get(req.body.port+"");
        if(!serverInst){
            res.send({success: true});
            return;
        }
        serverInst.open(function(){
            res.send({success: true});
        });
    }

}
