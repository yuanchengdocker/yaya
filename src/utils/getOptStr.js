export function optUrlParams(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.hash.substr(3).split("?")[1].match(reg);  
        if (r != null) return unescape(r[2]);  
        return null;  
}

export function removeHTMLTag(str) {
    if(!str) return "";
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/\{.*?\}/g,'');
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    str=str.replace(/\s/g,''); //将空格去掉
    str=str.substr(str.lastIndexOf("};")+1);
    return str;
} 