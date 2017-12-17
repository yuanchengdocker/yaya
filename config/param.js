var isDev = process.env.NODE_ENV == 'development'
console.log(isDev,process.env.NODE_ENV)
var basePath = "/api"

var devConfig = {
    mysqlHost : 'localhost',
    mysqlPort : '3306',
    mysqlName : 'yuan',
    mysqlUser : 'root',
    mysqlPass : '5696289',
    host : 'localhost',
    port : '7070',
    isDev : isDev,
    apiPort:8888,
    requestAPI:'http://localhost:8888/api/',//api地址
    cookieName:'hchBlog',	//cookie名字
    expires:'30',			//cookie失效时间（天）
    jwtSecret:'hechuanhua',	//jwt加密钥匙
    urlPath:{
        user_login:basePath+"/user/login",
        user_update:basePath+"/user/update",
        user_info:basePath+"/user/info",
        user_list:basePath+"/user/list",
        user_delete:basePath+"/user/delete",
        user_add:basePath+"/user/add"
    }
}

var proConfig = {
    mysqlHost : 'localhost',
    mysqlPort : '3306',
    mysqlName : 'yuan',
    mysqlUser : 'root',
    mysqlPass : '5696289',
    host : 'localhost',
    port : '8089',
    isDev : isDev,
    apiPort:8888,
    requestAPI:'http://localhost:8888/api/',//api地址
    cookieName:'hchBlog',	//cookie名字
    expires:'30',			//cookie失效时间（天）
    jwtSecret:'hechuanhua',	//jwt加密钥匙
    urlPath:{
        user_login:basePath+"/user/login",
        user_update:basePath+"/user/update",
        user_info:basePath+"/user/info",
        user_list:basePath+"/user/list",
        user_delete:basePath+"/user/delete",
        user_add:basePath+"/user/add"
    }
}


module.exports = isDev ? devConfig : proConfig