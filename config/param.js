var isDev = process.env.NODE_ENV == 'development'
console.log(isDev, process.env.NODE_ENV)
var bashPath = "/api"

var devConfig = {
    mysqlHost: 'localhost',
    mysqlPort: '3306',
    mysqlName: 'yuan',
    mysqlUser: 'root',
    mysqlPass: 'root',
    host: 'localhost',
    port: '7070',
    isDev: isDev,
    apiPort: 8888,
    requestAPI: 'http://18.217.203.249:8888/api/', //api地址
    cookieName: 'hchBlog', //cookie名字
    expires: '30', //cookie失效时间（天）
    jwtSecret: 'hechuanhua', //jwt加密钥匙
    urlPath: {
        user: {
            login: bashPath + "/user/login",
            update: bashPath + "/user/update",
            info: bashPath + "/user/info",
            list: bashPath + "/user/list",
            delete: bashPath + "/user/delete",
            add: bashPath + "/user/add"
        },
        member: {
            add: bashPath + "/member/add",
            batchadd: bashPath + "/member/batchadd",
            delete: bashPath + "/member/delete",
            update: bashPath + "/member/update",
            list: bashPath + "/member/list",
            info: bashPath + "/member/info"
        }
    }
}

var proConfig = {
    mysqlHost: 'localhost',
    mysqlPort: '3306',
    mysqlName: 'yuan',
    mysqlUser: 'root',
    mysqlPass: 'root',
    host: 'localhost',
    port: '8089',
    isDev: isDev,
    apiPort: 8888,
    requestAPI: 'http://18.217.203.249:8888/api/', //api地址
    cookieName: 'hchBlog', //cookie名字
    expires: '30', //cookie失效时间（天）
    jwtSecret: 'hechuanhua', //jwt加密钥匙
    urlPath: {
        user: {
            login: bashPath + "/user/login",
            update: bashPath + "/user/update",
            info: bashPath + "/user/info",
            list: bashPath + "/user/list",
            delete: bashPath + "/user/delete",
            add: bashPath + "/user/add"
        },
        member: {
            add: bashPath + "/member/add",
            batchadd: bashPath + "/member/batchadd",
            delete: bashPath + "/member/delete",
            update: bashPath + "/member/update",
            list: bashPath + "/member/list",
            info: bashPath + "/member/info"
        }
    }
}


module.exports = isDev ? devConfig : proConfig