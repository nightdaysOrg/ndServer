const controllers = function (server) {

    server.use('/hello', function (req, res, next) {
        res.send('Hello world');
    });






}

module.exports = {
    init: controllers
}
