module.exports =  {

    helloWorld:function(req,res,next){
        res.send('Hello');
    },

    getServerList:function(req,res,next,server){
        var list = [];
        for(let s of server.list){
            list.push({port: s.port , id: s.id});
        }
        res.send(list);
    },

    closeServer: function(req,res,next,server){
        server.list[0].close(function(){
            res.send({success: true});
        });
    },

    openServer: function(req,res,next,server){
        server.list[0].open(function(){
            res.send({success: true});
        });
    }

}
