/**
 * 
 * @authors yuancheng
 * @date    2017-05-31 16:42:35
 * @description 主入口模块
 */
import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill';//对于IE9 es6中像Object.assign函数的转es5

// 引入React-Router模块
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink,browserHistory} from 'react-router'

import style1 from './css/reset.styl';
import style2 from './css/main.styl';
import style3 from './css/public.styl';
import pages from './params/pageParams'
import Header from './components/Header'
import Menu from './components/menu'
import Login from './components/login/Login'
import {getUser} from './components/userInit'
import {ep} from './utils/create-events'

class main extends React.Component{
    constructor(props){
		super(props)
		let self = this;
		ep.on("is_login_flag",function(user){
			self.setLoginPage(user)
		});
		var user = getUser();
		self.setLoginPage(user&&true)
	}
	componentDidMount(){
		let contentHeight =  document.body.clientHeight-document.getElementsByClassName("main-header")[0].clientHeight;
		this.setState({
			contentHeight:contentHeight
		})
	}
	setLoginPage(flag){
		if(!this.state){
			this.state = {
				isUser:flag,
				contentHeight:0
			}
		}else{
			this.setState({
				isUser:flag
			})
		}
	}
    render(){
		let isUser = this.state.isUser
        return (
            <div className="wrapper">
				<div className={isUser?"hidden-login main-login":"main-login"}>
					{
						isUser?"":<Login/>
					}
				</div>
				
				<div className={isUser?"main-content show-content":"main-content"}>
						<header className="main-header" style={{zIndex:900}}>
							<Header/>
						</header>
						<aside className="main-sidebar">
							<Menu/>
						</aside>
						<section className="content-wrapper" style={{height:this.state.contentHeight}}>
							{this.props.children}
						</section>
					</div>
			</div>
        )
    }
}

// 配置路由
ReactDOM.render((
    <Router history={hashHistory} >
        <Route path="/" component={main}>
			<IndexRoute getComponent={pages[0]&&pages[0].com}/>
			{
				pages.map((page,index)=>{
					return <Route key={index} path={page.path} getComponent={page.com}/>
				})
			}
        </Route>
    </Router>
), document.getElementById('root'));


