#请在server目录下创建 config.json 格式按下面这种
{
    "port": 8081,
    "items": [
        {
            "name" : "测试1",
            "code" : "test1,
            "path" : "test",
            "front" : "E:/myitem/ndServerNew/web/test/static",
            "frontGit" : "E:/myitem/ndServerNew/web/test/static",
            "back" : "E:/myitem/ndServerNew/web/test/controller.js",
            "backGit" : "E:/myitem/ndServerNew/web/test/static"
        }
    ]
}

#如果需要使用git自动拉取 ， 请在git上配置 webhooks
#url为http://www.nightdays.net:8888/webhook?code=项目代码&url=backGit
#code 就是项目的代码
#url 是使用frontGit拉取 还是 使用 backGit拉取