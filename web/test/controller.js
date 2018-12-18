
let path = require('path');
let base = path.resolve(__dirname , "../../web/test/");

let getTable = function(tableName) {
    delete require.cache[require.resolve(`${base}/dataSource/${tableName}.json`)];
    let config = require(`${base}/dataSource/${tableName}.json`);
    return config;
}

module.exports = {

    helloWorld: function(req,res) {
        res.send("xxxxxx");
    },

    userList : function(req,res) {
        let data = getTable('user');
        let result = {
            success : true,
            data: {
                list : data
            }
        }
        res.send(JSON.stringify(result));
    },

    userAdd : function(req, res) {
        let data = getTable('user');
        let result = {
            success : true,
            data: {
                list : data
            }
        }
        res.send(JSON.stringify(result));
    }


}