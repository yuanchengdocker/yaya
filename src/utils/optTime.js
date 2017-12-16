export function getDate(time){
    let date = "";
    if(typeof(time) == "undefined" || time == null)
        date = null;
    else if(typeof(time) == "object")
        date = time.getDate();
    else if(typeof(time) == "number")
        date = (new Date(time)).getDate();
    return date;
}

export function getMonth(time){
    let month = "";
    if(typeof(time) == "undefined" || time == null)
        month = null;
    else if(typeof(time) == "object")
        month = time.getMonth();
    else if(typeof(time) == "number")
        month = (new Date(time)).getMonth();
    return month;
}

export function getYear(time){
    let year = "";
    if(typeof(time) == "undefined" || time == null)
        year = null;
    else if(typeof(time) == "object")
        year = time.getFullYear();
    else if(typeof(time) == "number")
        year = (new Date(time)).getFullYear();
    return year;
}

export function formatDateTime(time){
    var date = new Date(time);
    if(time == undefined || null == time || "" == time){
        return "";
    }
    var y = date.getFullYear();  
    var m = date.getMonth() + 1; 
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h; 
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    return y + '-' + m + '-' + d;  
}