var express = require('express')
var fs = require('fs')
var path = require('path')
var multer = require('multer')

var router = express.Router()
var jwt = require('jwt-simple')
var dao = require('../dao/conn.js')
var urlPath = config.urlPath;

function verification(req, res, next){
    var token = req.cookies[config.cookieName]||req.body.token
}

function encrypt(userId,userName){
    return jwt.encode({
        userId:userId,
        userName:userName,
        expires:new Date().getTime()+(1000*60*60*24*config.expires)
    },config.jwtSecret)
}

function decrypt(str){
    return jwt.decode(str,config.jwtSecret)
}

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Credentials', true) //支持跨域传cookie
    console.log(req.session,req.cookies,req.originalUrl)
    next()

})

router.get('*', function(req, res, next) {
    
    if(req.url.indexOf('/api')>-1||req.url.indexOf('/images')>-1||req.url.indexOf('favicon.ico')>-1){
        next()
    }else{
        
    }

})

router.post('*', function(req, res, next) {
    
    if(req.url.indexOf('/api')>-1||req.url.indexOf('/images')>-1||req.url.indexOf('favicon.ico')>-1){
        next()
    }else{
        
    }

})

router.post('/api/auth',function(req,res){

    var token = decrypt(req.body.token)
    if( token ){
        auth(token,function(err,user){
            if (err) {
                return res.json({ code: 1009, messgage: err })
            }
            if(user){
                if(user.name == token.userName){
                    var token1 = encrypt(user._id,user.name)
                    var data = {'userName':user.name,'token':token1}
                    res.json({ code: 1000, messgage: "认证成功，token合法", data: data })
                }else{
                    res.json({ code: 1001, messgage: "认证失败，非法的token", data: '' })
                }
            }
        })
    } else {
        return false
    }
})

router.get('/api/getUserInfo', function(req, res) {
    
    if (req.cookies[config.cookieName]) {
        var cookies = JSON.parse(req.cookies[config.cookieName])
        var data = { name: cookies[config.cookieName].name }
        return res.json({ code: 1000, messgage: "已登录", data: data })
    } else {
        return res.json({ code: 1001, messgage: "未登录" })
    }

})

router.post(urlPath.user_login, function(req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})

    var newUser = new dao.user(req.body)
    newUser.getUserbyUsername(newUser.username, function(err, user) {
        if (err) {
            res.end(JSON.stringify({ code: 1009, messgage: err }))
        }
        if (user) {
            if(user instanceof Array)
                user = user[0];
            if (user.password == newUser.password) {
                var token = encrypt(user._id,user.name)
                //res.cookie(config.cookieName,JSON.stringify(user))
                var data = {'userName':user.name,'token':token}

                res.end(JSON.stringify({ code: 1000, messgage: "登录成功", data: data }))
            } else {
                res.end(JSON.stringify({ code: 1001, messgage: "密码错误" }))
            }
        } else {
            res.end(JSON.stringify({ code: 1002, messgage: "用户名不存在" }))
        }
    })

})

function checkLogin(req, res, next) {
    var token = req.cookies[config.cookieName] && decrypt(req.cookies[config.cookieName])
    if( token ){
        auth(token,function(err,user){
            if (err) {
                return res.json({ code: 1009, messgage: err })
            }
            if(user){
                if(user.name == token.userName){
                    console.log(77777)
                    next()
                }else{
                    return res.json({ code: 1009, messgage: "您还未登录,请先登录" })
                }
            }
        })
    } else {
        next()
    }
}

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        return res.json({ code: 1000, messgage: "您已登录,不需重新登录" })
    }
    next()
}

function auth(token,callback){
    dao.user.getUserbyUsername()
}

module.exports = router