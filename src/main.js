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

import style1 from './css/base.styl';

import Header from './components/Header'
import Menu from './components/menu'
import Index from './components/index/index'
import Index2 from './components/index/index2'

class main extends React.Component{
    constructor(props){
        super(props)
    }
	componentDidMount () {
		
	}
	componentDidUpdate (prevProps, prevState) {
		
	}
    render(){
        return (
            <div className="wrapper">
				<header className="main-header">
					<Header/>
				</header>
				<aside className="main-sidebar">
					<Menu/>
				</aside>
				<section className="content-wrapper">
					{this.props.children}
				</section>
			</div>
        )
    }
}

// 配置路由
ReactDOM.render((
    <Router history={hashHistory} >
        <Route path="/" component={main}>
			<Route path="index" component={Index}/>
			<Route path="index2" component={Index2}/>
        </Route>
    </Router>
), document.getElementById('root'));


