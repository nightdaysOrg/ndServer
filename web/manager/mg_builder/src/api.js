
let request = function (url, method, data) {
    return new Promise(function (resolve) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.onload = function (e) {
            resolve(JSON.parse(e.currentTarget.responseText));
        }
        xhr.send(JSON.stringify(data));
    });
}
let url = "";
if (location.origin.indexOf("www.nightdays.net") > -1) {
    url = "http://www.nightdays.net:8888/";
} else {
    url = "http://localhost:8888/";
}

let post = function (path) {
    return function (data) {
        return request(url + path, "post", data);
    }
}


export default {
    getServer: post("getServer"),
    openServer: post("openServer"),
    restartServer: post("restartServer"),
    closeServer: post("closeServer"),
    gitPull: post("gitPull"),
    addServer: post("addServer")
}