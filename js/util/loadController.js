let serverManager = require("./ServerManager");

function directRequest(expressInst, ctrl ,path){
    let keys = Object.keys(ctrl);
    for(let key of keys) {
        expressInst.use(path + "/" + key , ctrl[key]);
    }
}

function interceptRequest(expressInst, ctrl ,path, intercept) {
    let keys = Object.keys(ctrl);
    for(let key of keys) {
        expressInst.use(path + "/" + key , function(req,res,next){
            intercept(req,res,next,serverManager);
            ctrl[key](req,res,next,serverManager);
        });
    }
}

module.exports = function(expressInst, ctrl ,path, intercept) {

  if(arguments.length == 4) {
    interceptRequest(...arguments);
  }
  else if(arguments.length == 3) {
      if(typeof arguments[2] =="function") {
        interceptRequest(arguments[0],arguments[1],"",arguments[2]);
      }else{
          directRequest(...arguments);
      }
  }

}