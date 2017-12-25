import React from 'react'
import ReactDOM from 'react-dom'
import {axiosAjax} from '../service/getService'
import {getUser,delUser} from './userInit'
import Profile from './profile/Profile'
import {ep} from '../utils/create-events'

class Header extends React.Component{
    constructor(props){
        super(props)
        let user = getUser();
        let self = this;
        ep.on("update-user-flag",function(user){
            self.updateUser(user)
        });
        this.state = {
            visible:false,
            user:user||{}
        };
    }
	
	updateUser(user){
        this.setState({
            user:user||{}
        })
    }
	userLogOut(){
        delUser()
    }
    userProfileSet(flag){
        this.setState({
            visible:flag
        })
    }
    render(){
        return (
            <header className="main-header">
                <Profile flag={"update"} sucFn={this.updateUser.bind(this)} visibleFn={this.userProfileSet.bind(this)} visible={this.state.visible} user={this.state.user}/>
                <a href="#/index" className="logo">
                    <span className="logo-mini"><b>ya</b>ya</span>
                    <span className="logo-lg"><b>yaya服装</b></span>
                </a>
                <nav className="navbar navbar-static-top">
                <a className="sidebar-toggle" data-toggle="push-menu" role="button">
                    <span className="sr-only">Toggle navigation</span>
                </a>
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                   
                    <li className="dropdown user user-menu">
                        <a className="dropdown-toggle" data-toggle="dropdown">
                            <img src="./img/user2-160x160.jpg" className="user-image" alt="User Image"/>
                            <span className="hidden-xs">{this.state.user.name}</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="user-header">
                                <img src="./img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
                                <p>
                                姓名：{this.state.user.name} 
                                <small>电话：{this.state.user.phone}  店面：{this.state.user.address}</small>
                                </p>
                            </li>
                            <li className="user-footer">
                                <div className="pull-left">
                                <a  className="btn btn-default btn-flat" onClick={this.userProfileSet.bind(this,true)}>个人资料</a>
                                </div>
                                <div className="pull-right">
                                <a className="btn btn-default btn-flat" onClick={this.userLogOut.bind(this)}>退出系统</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                    </ul>
                </div>
                </nav>
            </header>
        )
    }
}

export default Header;
