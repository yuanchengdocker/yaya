import {setCookie,getCookie,delCookie,clearCookie} from '../utils/optCookie'
import {ep} from '../utils/create-events'

export function getUser(){
    var user = getCookie("user");
    user = JSON.parse(user)
    return user;
}
export function delUser(){
    clearCookie();
    ep.emit("is_login_flag", false);//登出
}
export function setUser(user){
    setCookie("user",JSON.stringify(user),"d30");
    ep.emit("is_login_flag", true);//登陆
    ep.emit("update-user-flag",user);
}
export function setToken(token){
    setCookie("token",token,"d30");
}