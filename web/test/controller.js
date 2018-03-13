module.exports = {

    helloWorld: function(req,res) {
        res.send("xxxxxx");
    },

    empList: function(req,res) {
        res.send([
            {
                name:'哈哈',
                age: '234'
            },
            {
                name:'牛郎',
                age: '234'
            },
            {
                name:'织女',
                age: '234'
            },
        ])
    }


}