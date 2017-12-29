function serverListRow(server){
    var elem = createElement("div","");
    var open = createElement("button","开启" , elem);
    open.style["margin-right"] = "20px";
    open.addEventListener('click',async ()=>{
        await this.api.openServer({port:server.port});
    });
    var close = createElement("button","关闭", elem);
    close.style["margin-right"] = "20px";
    close.addEventListener('click',async ()=>{
        await this.api.closeServer({port:server.port});
    });

    var portSpan = createElement("span", server.port , elem);
    var statusSpan = createElement("span", server.status , elem);

    return elem;
}