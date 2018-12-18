let path = require('path');
module.exports = {
    outputDir : path.resolve(__dirname , '../pages'),
    configureWebpack : {
        resolve: {
            alias : {
                '@' : path.resolve(__dirname , './src'),
                'pages' : '@/pages',
                'comp' : '@/components'
            },
            modules: [
                path.resolve(__dirname,'./src/components'),
                'node_modules/nightdays-comp/components'
            ]
        }
    }
}