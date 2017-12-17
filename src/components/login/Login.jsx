import React from 'react';
import style from './Login.styl';
import {axiosAjax} from '../../service/getService';
import {setCookie,getCookie,delCookie,clearCookie} from '../../utils/optCookie'
import {getUser,setUser,setToken,delUser} from '../userInit'
import {notification } from 'antd';

class Login extends React.Component{
	constructor(props) {
        super(props);
        this.state={
            username:"",
            password:""
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            username:"",
            password:""
        })
    }
    componentDidMount () {
    }
    async submitLogin(){
        if(!this.checkData()) return;

        let state = this.state;
        var param = {
            name:state.username,
            password:state.password
        }
        let { data } = await axiosAjax(["user","login"], param, 'post');
        if(!data) {
            notification['warn']({
                message: '登陆失败',
                description: "用户名或密码错误！",
            });
            return;
        }
        setToken(data.token);
        setUser(data.user); 
    }
    checkData(){
        let msg = "";
        if(!this.state.username){
            msg = "用户名不能为空！";
        }
        if(!this.state.password){
            msg = "密码不能为空！";
        }
        
        if(msg){
            notification['warn']({
                message: '警告',
                description: msg,
            });
            return false;
        }else{
            return true;
        }
    }
    
    nameChange(e){
        this.setState({
            username:e.target.value
        })
    }
    passChange(e){
        this.setState({
            password:e.target.value
        })
    }
  
	render() {
		return (
			<div className="LoginBg m-warpper">
                <div className="m-loginArea">
                    <h4>登录</h4>
                    <form>
                        <div className="m-input-row">
                            <label>邮箱/手机：</label>
                            <div className="m-input">
                                <input value={this.state.username} type="text" name="" onChange={this.nameChange.bind(this)}/>
                            </div>
                        </div>
                        <div className="m-input-row">
                            <label>密码：</label>
                            <div className="m-input">
                                <input value={this.state.password} type="password" name="" onChange={this.passChange.bind(this)}/>
                            </div>
                        </div>
                        <div className="m-input-row autoLogon">
                            <input type="checkbox" name="" id="mycheck" /> <label><a href="#/forgotPassword">忘记密码</a></label>
                            <div className="clearfix"></div>
                        </div>
                    </form>
                    <div className="clearfix"></div>
                    <div className="loginBar">
                        <button onClick={this.submitLogin.bind(this)}>登录</button>
                    </div>
                </div>
            </div>
		)
	}
}

export default Login;