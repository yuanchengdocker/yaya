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
    next()
})
router.get('*', function(req, res, next) {
    if(req.url.indexOf('/api')>-1||req.url.indexOf('/images')>-1||req.url.indexOf('favicon.ico')>-1){
        next()
    }
})
router.post('*', function(req, res, next) {
    if(req.url.indexOf('/api')>-1||req.url.indexOf('/images')>-1||req.url.indexOf('favicon.ico')>-1){
        next()
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
router.post(urlPath.user.add, function(req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    var newUser= new dao.user(req.body)
    newUser.add(function(err,user){
        errCheck(err,res);
        if (user) {
            res.end(JSON.stringify({ code: 1000, data:user }))
        }
    })
})
router.post(urlPath.user.delete, function(req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    var newUser= new dao.user(req.body)
    newUser.delete(function(err,user){
        errCheck(err,res);
        if (user) {
            res.end(JSON.stringify({ code: 1000, data:user }))
        }
    })
})
router.post(urlPath.user.list, function(req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    var newPage = new dao.page(req.body)
    var total = 0;
    newPage.query(function(err,page,param){
        errCheck(err,res);
        if (page) {
            res.end(JSON.stringify({ code: 1000, data: page,total:param }))
        }
    },total)
})

router.post(urlPath.user.info, getOrValidUser)

router.post(urlPath.user.login, function(req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    var newUser = new dao.user(req.body)
    newUser.getUserbyUsername(function(err, user) {
        errCheck(err,res);
        if (user && user.length > 0) {
            user = user[0];
            if (user.password == newUser.password) {
                var token = encrypt(user.id,user.name)
                var data = {'user':user,'token':token}
                res.end(JSON.stringify({ code: 1000, messgage: "登录成功", data: data }))
            } else {
                res.end(JSON.stringify({ code: 1001, messgage: "密码错误" }))
            }
        } else {
            res.end(JSON.stringify({ code: 1002, messgage: "用户名不存在" }))
        }
    })
})

router.post(urlPath.user.update,getOrValidUser);
router.post(urlPath.user.update, function(req,res){
    var newUser = new dao.user(req.body)
    var oldPass = req.body.oldPass;
    var updateSecreate = req.body.updateSecreate;
    if(!newUser.id) paramsErr();
    if(updateSecreate){
        newUser.getUserbyId(function(err,user){
            if (user) {
                if(user instanceof Array) user = user[0];
                //先校验原密码是否正确
                if (user.password == oldPass) {
                    //开始更新密码和其他信息
                    newUser.updateUserById(true,function(err, result) {
                        errCheck(err,res);
                        res.end(JSON.stringify({ code: 1000, data:result.changedRows&&true }))
                    })
                }else{
                    res.end(JSON.stringify({ code: 1001, messgage: "输入原密码错误" }))
                }
            }
        })
    }else{
        newUser.updateUserById(false,function(err, result) {
            errCheck(err,res);
            res.end(JSON.stringify({ code: 1000, data:result.changedRows&&true }))
        })
    }
})
function getOrValidUser(req, res,next) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    var newUser = new dao.user(req.body)
    var valid = req.body.valid;
    var isUpdate = req.body.isUpdate;
    newUser.getUserbyId(function(err,user){
        errCheck(err,res);
        if (user && user.length > 0) {
            if(user instanceof Array) user = user[0];
            delete user.password;
            var data = {'user':user}
            isUpdate?
            res.end(JSON.stringify({ code: 1002, messgage: "用户名已存在" }))
            :
            res.end(JSON.stringify({ code: 1000, data: data }))
        } else {
            isUpdate?next():res.end(JSON.stringify({ code: 1002, messgage: "用户不存在" }))
        }
    },valid)
}
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

function errCheck(err,res){
    if (err) {
        res.end(JSON.stringify({ code: 1009, messgage: err }))
    }
}

function paramsErr(){
    res.end(JSON.stringify({ code: 2009, messgage: "参数异常" }))
}

router.post(urlPath.member.add, function(req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    var newMember= new dao.member(req.body)
    newMember.add(function(err,member){
        errCheck(err,res);
        if (member) {
            res.end(JSON.stringify({ code: 1000, data:member }))
        }
    })
})
router.post(urlPath.member.batchadd, function(req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    var newMember= new dao.member(req.body)
    var members= req.body.members;
    newMember.batchAdd(members,function(err,member){
        errCheck(err,res);
        if (member) {
            res.end(JSON.stringify({ code: 1000, data:member }))
        }
    })
})
router.post(urlPath.member.delete, function(req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    var newMember= new dao.member(req.body)
    newMember.delete(function(err,member){
        errCheck(err,res);
        if (member) {
            res.end(JSON.stringify({ code: 1000, data:member }))
        }
    })
})
router.post(urlPath.member.list, function(req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    var newPage = new dao.page(req.body)
    var total = 0;
    newPage.query(function(err,page,param){
        errCheck(err,res);
        if (page) {
            res.end(JSON.stringify({ code: 1000, data: page,total:param }))
        }
    },total)
})
router.post(urlPath.member.update, function(req,res){
    var newMember = new dao.member(req.body)
    
    newMember.updateMemberById(function(err, result) {
        errCheck(err,res);
        res.end(JSON.stringify({ code: 1000, data:result.changedRows&&true }))
    })
})
router.post(urlPath.member.info, function(req,res){
    var newMember = new dao.member(req.body)
    var valid = req.body.valid;
    newMember.getMemberbyId(function(err, member) {
        errCheck(err,res);
        if (member && member.length > 0) {
            if(member instanceof Array) member = member[0];
            var data = {'member':member}
            res.end(JSON.stringify({ code: 1000, data: data }))
        }else{
            res.end(JSON.stringify({ code: 1000 }))
        }
    },valid)
})


module.exports = router