var text_box = document.getElementById('text-box');
var search_btn = document.getElementById('search-btn');
var div = document.createElement('div');
div.id = "search-tips";
//获取搜索结果请求地址
function getUrl(value){
    var url = "https://www.baidu.com/s?ie=utf-8&mod=1&isbd=1&isid=1BA2CE1C3CA13165&ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=" +value+"&oq="+ value + "&rsv_pq=80c1375500034151&rsv_t=cae7cZSmg1M3By1VJ8MQaRzOqQSfA3h805PSqUNwiQ0kkH2HjesvkrPl6pc&rqlang=cn&rsv_enter=0&bs=" + value + "&rsv_sid=undefined&_ss=1&clist=&hsug=&f4s=1&csor=2&_cr1=24705";
    return url;
}
//点击按钮显示搜索结果
search_btn.onclick = function(){
    var value = text_box.value;
    window.open(getUrl(value));
};
//跨域回调函数，获取搜索提示词数据
function jQuery110202750719030882576_1475638016359(data){
    div.innerHTML = "";
    for(let i = 0; i < data.g.length; ++i){
       render(data.g[i].q);
    }         
    text_box.parentNode.insertBefore(div, text_box.nextSibling);
    //删除过多的script
    var scriptXHR = document.getElementsByClassName('xhr');
    for (let i = 0; i < scriptXHR.length; i++) {
        scriptXHR[i].parentNode.removeChild(scriptXHR[i]);
    }       
}
//搜索提示词渲染并绑定点击事件，点击提示词显示搜索结果
function render(text){
    var p = document.createElement('p');
    var p_text = document.createTextNode(text);
    p.appendChild(p_text);
    div.appendChild(p);
    p.onclick = function(){
        window.open(getUrl(text));
    }    
}
//jsonp跨域
function jsonp(url){   
    var script = document.createElement("script");
    script.src = url;
    script.className = "xhr";
    document.body.insertBefore(script, document.body.firstChild);
}
//监控输入值变化，发起跨域请求
text_box.onkeyup = function(){
    console.log("value的值是：" + text_box.value)
    var value = text_box.value;
    if(!value){
        console.log("value的值是：" + value);
        div.style.display = "none";
        return;    
    }else{
        div.style.display = "block";
        //提示词请求url
        var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + value + "&sugmode=2&json=1&p=3&sid=1432_18280_21119_18559_21193_21161&req=2&bs=" + value + "&pbs=" + value + "&csor=2&pwd=" + value +"&cb=jQuery110202750719030882576_1475638016359&_=1475638016366";
        jsonp(url);
    }             
}       
