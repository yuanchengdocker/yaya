var express = require('express')
var fs = require('fs')
var path = require('path')
var multer = require('multer')

var router = express.Router()
var jwt = require('jwt-simple')

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
    res.header('Access-Control-Allow-Origin', 'http://localhost:'+config.port)
    res.header('Access-Control-Allow-Headers', 'Content-Type=application/jsoncharset=UTF-8')
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

router.post('/api/login', function(req, res) {
    
    var newUser = new User(req.body)
    newUser.get(newUser.name, function(err, user) {
        if (err) {
            res.end(JSON.stringify({ code: 1009, messgage: err }))
        }
        if (user) {

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

router.post('/api/reg', function(req, res) {

    var newUser = new User(req.body)
    newUser.get(newUser.name, function(err, user) {
        if (err) {
            res.end(JSON.stringify({ code: 1009, messgage: err }))
        }
        if (user) {
            res.end(JSON.stringify({ code: 1002, messgage: '用户名已存在' }))
        }
        newUser.save(function(user) {
            res.end(JSON.stringify({ code: 1000, messgage: '注册成功' }))
        })
    })

})

router.get('/api/loginout', function(req, res) {

    return res.json({ code: 1000, messgage: "退出成功" })
})

router.post('/api/publish', checkLogin)
router.post('/api/publish', function(req, res) {
    
    uploadImg(req, res, function(err) {
        
        if (err) {
            return console.log(err)
        }
        Upload.getTitle(req.body.title, function(err, title) {
            if (title) {
                return res.json({ code: 1002, messgage: "标题已存在" })
            }
            var token = decrypt(req.cookies[config.cookieName])
            var newUpload = new Upload({
                name: token.userName,
                title: req.body.title,
                content: req.body.content,
                upload: req.file ? "/images/" + req.file.filename : "",
                category:req.body.category,

            })
            newUpload.save(function(err) {
                return res.json({ code: 1000, messgage: "发布成功" })
            })
        })
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

var User = function(user) {
    this.name = user.userName
    this.password = user.password
    this.email = user.email
}

/*保存用户密码*/
User.prototype.save = function(callback) {
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    }
    
}

/*获取用户名，防止用户名相同*/
User.prototype.get = function(name, callback) {
    
}

//token认证
function auth(token,callback){
    
}

module.exports = router