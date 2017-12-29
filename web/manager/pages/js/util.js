(function(w){


    w.createElement = function(elem,text,pnode){
        var elem = document.createElement(elem);
        var text = document.createTextNode(text);
        elem.appendChild(text);
        if(pnode){
            pnode.appendChild(elem);
        }
        return elem;
    }




    w.request = function(url,method,data) {
        return new Promise(function(resolve){
            var xhr = new XMLHttpRequest();
            xhr.open(method,url);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.onload = function(e){
                resolve(JSON.parse(e.currentTarget.responseText));
            }
            xhr.send(JSON.stringify(data));
        });
    }

    if(navigator.platform.indexOf("Linux")>-1) {
        w.url = "http://www.nightdays.net:8888/";
    }else{
        w.url = "http://localhost:8888/";
    }

    w.post = function(path){
        return function(data){
            return request(url + path,"post",data);
        }
    }


    w.api = {
        getServerList : post("getServerList"),
        openServer : post("openServer"),
        closeServer : post("closeServer")
    }

})(window);