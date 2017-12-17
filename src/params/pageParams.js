// 引入按需加载单个页面（组件导入）
const index = (location,cb) =>{
	require.ensure([], require => {
		cb(null, require('../components/index/Index').default);//当导出组建为default时添加default
	  });
}
const user = (location,cb) =>{
	require.ensure([], require => {
		cb(null, require('../components/user/User').default);
	  });
}
export default [
    {path:"index",com:index},
    {path:"user",com:user}
]
