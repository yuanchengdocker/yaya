import React from 'react'
import ReactDOM from 'react-dom'
import {getUser,delUser} from './userInit'
import {ep} from '../utils/create-events'

class Menu extends React.Component{
    constructor(props){
        super(props)
        let user = getUser();
        let self = this;
        ep.on("update-user-flag",function(user){
            self.updateUser(user)
        });
        let active = location.hash.substr(2,location.hash.indexOf("?")-2);
        this.state = {
            active:active,
            user:user||{}
        }
    }
    updateUser(user){
        this.setState({
            user:user
        })
    }
	menuChange(page){
        this.setState({
            active:page
        })
    }
    render(){
        let active = this.state.active;
        let user = this.state.user;
        return (
            <section className="sidebar">
                <div className="user-panel">
                    <div className="pull-left image">
                    <img src="./img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
                    </div>
                    <div className="pull-left info">
                    <p>{user.name}</p>
                    <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                    </div>
                </div>
    
                <ul className="sidebar-menu" data-widget="tree">
                    <li className="header">MAIN NAVIGATION</li>
                    <li className={active=="index"||active==""?"active":""}>
                        <a href="#/index" onClick={this.menuChange.bind(this,"index")}>
                            <i className="fa fa-dashboard"></i><span>首页</span>
                            <span className="pull-right-container">
                            </span>
                        </a>
                    </li>        

                    <li className={active=="user"?"active":""}>
                        <a href="#/user" onClick={this.menuChange.bind(this,"user")}>
                            <i className="fa fa-th"></i> <span>用户管理</span>
                            <span className="pull-right-container">
                            {/* <small className="label pull-right bg-green">new</small> */}
                            </span>
                        </a>
                    </li>
                </ul>
            </section>
        )
    }
}

export default Menu;
