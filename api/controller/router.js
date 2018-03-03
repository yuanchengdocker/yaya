var express = require('express')
var fs = require('fs')
var path = require('path')
var multer = require('multer')

var router = express.Router()
var jwt = require('jwt-simple')
var dao = require('../dao/conn.js')
var urlPath = config.urlPath;

function encrypt(userId, userName) {
    return jwt.encode({
        userId: userId,
        userName: userName,
        expires: new Date().getTime() + (1000 * 60 * 60 * 24 * config.expires)
    }, config.jwtSecret)
}

function decrypt(str) {
    return jwt.decode(str, config.jwtSecret)
}

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Credentials', true) //支持跨域传cookie
    next()
})
router.get('*', function(req, res, next) {
    if (req.url.indexOf('/api') > -1 || req.url.indexOf('/images') > -1 || req.url.indexOf('favicon.ico') > -1) {
        next()
    }
})
router.post('*', function(req, res, next) {
    if (req.url.indexOf('/api') > -1 || req.url.indexOf('/images') > -1 || req.url.indexOf('favicon.ico') > -1) {
        next()
    }
})

router.post(urlPath.user.add,checkLogin);
router.post(urlPath.user.add, function(req, res) {
    var newUser = new dao.user(req.body)
    newUser.add(function(err, user) {
        errCheck(err, res);
        if (user) {
            res.end(JSON.stringify({ code: 1000, data: user }))
        }
    })
})
router.post(urlPath.user.delete,checkLogin);
router.post(urlPath.user.delete, function(req, res) {
    var newUser = new dao.user(req.body)
    newUser.delete(function(err, user) {
        errCheck(err, res);
        if (user) {
            res.end(JSON.stringify({ code: 1000, data: user }))
        }
    })
})
router.post(urlPath.user.list,checkLogin);
router.post(urlPath.user.list, function(req, res) {
    var newPage = new dao.page(req.body)
    var reqUser = JSON.parse(unescape(req.cookies.user))
    var total = 0;
    newPage.query(function(err, page, param) {
        errCheck(err, res);
        if (page) {
            res.end(JSON.stringify({ code: 1000, data: page, total: param }))
        }
    }, total,reqUser.id)
})

router.post(urlPath.user.info,checkLogin);
router.post(urlPath.user.info, getOrValidUser)

router.post(urlPath.user.login, function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    var newUser = new dao.user(req.body)
    newUser.getUserbyUsername(function(err, user) {
        errCheck(err, res);
        if (user && user.length > 0) {
            user = user[0];
            if (user.password == newUser.password) {
                var token = encrypt(user.id, user.name)
                delete user.password;
                var data = { 'user': user, 'token': token }
                res.end(JSON.stringify({ code: 1000, messgage: "登录成功", data: data }))
            } else {
                res.end(JSON.stringify({ code: 1001, messgage: "密码错误" }))
            }
        } else {
            res.end(JSON.stringify({ code: 1002, messgage: "用户名不存在" }))
        }
    })
})

router.post(urlPath.user.update,checkLogin);
router.post(urlPath.user.update, getOrValidUser);
router.post(urlPath.user.update, function(req, res) {
    var newUser = new dao.user(req.body)
    var oldPass = req.body.oldPass;
    var updateSecreate = req.body.updateSecreate;
    if (!newUser.id) paramsErr();
    if (updateSecreate) {
        newUser.getUserbyId(function(err, user) {
            if (user) {
                if (user instanceof Array) user = user[0];
                //先校验原密码是否正确
                if (user.password == oldPass) {
                    //开始更新密码和其他信息
                    newUser.updateUserById(true, function(err, result) {
                        errCheck(err, res);
                        res.end(JSON.stringify({ code: 1000, data: result.changedRows && true }))
                    })
                } else {
                    res.end(JSON.stringify({ code: 1001, messgage: "输入原密码错误" }))
                }
            }
        })
    } else {
        newUser.updateUserById(false, function(err, result) {
            errCheck(err, res);
            res.end(JSON.stringify({ code: 1000, data: result.changedRows && true }))
        })
    }
})

function getOrValidUser(req, res, next) {
    var newUser = new dao.user(req.body)
    var valid = req.body.valid;
    var isUpdate = req.body.isUpdate;
    newUser.getUserbyId(function(err, user) {
        errCheck(err, res);
        if (user && user.length > 0) {
            if (user instanceof Array) user = user[0];
            delete user.password;
            var data = { 'user': user }
            isUpdate ?
                res.end(JSON.stringify({ code: 1002, messgage: "用户名已存在" })) :
                res.end(JSON.stringify({ code: 1000, data: data }))
        } else {
            isUpdate ? next() : res.end(JSON.stringify({ code: 1002, messgage: "用户不存在" }))
        }
    }, valid)
}

function checkLogin(req, res, next) {
    if (!req.cookies.token || !req.cookies.user) {
        res.writeHead(403, { 'Content-Type': 'text/html;charset=utf-8'})
        res.end(JSON.stringify({ code: 1009, messgage: "您还未登录,请先登录" }));
    }
    
    var user = decrypt(req.cookies.token)
    var reqUser = JSON.parse(unescape(req.cookies.user))
    
    if (!user || !reqUser || reqUser.id != user.userId || reqUser.name != user.userName) {
        res.writeHead(403, { 'Content-Type': 'text/html;charset=utf-8' })
        res.end(JSON.stringify({ code: 1009, messgage: "您还未登录,请先登录" }));
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
        next()
    }
}

function errCheck(err, res) {
    if (err) {
        res.end(JSON.stringify({ code: 1009, messgage: err }))
    }
}

function paramsErr() {
    res.end(JSON.stringify({ code: 2009, messgage: "参数异常" }))
}

router.post(urlPath.member.add,checkLogin);
router.post(urlPath.member.add, function(req, res) {
    var newMember = new dao.member(req.body)
    newMember.add(function(err, member) {
        errCheck(err, res);
        if (member) {
            res.end(JSON.stringify({ code: 1000, data: member }))
        }
    })
})
router.post(urlPath.member.batchadd,checkLogin);
router.post(urlPath.member.batchadd, function(req, res) {
    var newMember = new dao.member(req.body)
    var members = req.body.members;
    newMember.batchAdd(members, function(err, member) {
        errCheck(err, res);
        if (member) {
            res.end(JSON.stringify({ code: 1000, data: member }))
        }
    })
})
router.post(urlPath.member.delete,checkLogin);
router.post(urlPath.member.delete, function(req, res) {
    var newMember = new dao.member(req.body)
    newMember.delete(function(err, member) {
        errCheck(err, res);
        if (member) {
            res.end(JSON.stringify({ code: 1000, data: member }))
        }
    })
})
router.post(urlPath.member.list,checkLogin);
router.post(urlPath.member.list, function(req, res) {
    var newPage = new dao.page(req.body)
    var total = 0;
    newPage.query(function(err, page, param) {
        errCheck(err, res);
        if (page) {
            res.end(JSON.stringify({ code: 1000, data: page, total: param }))
        }
    }, total)
})
router.post(urlPath.member.update,checkLogin);
router.post(urlPath.member.update, function(req, res) {
    var newMember = new dao.member(req.body)

    newMember.updateMemberById(function(err, result) {
        errCheck(err, res);
        res.end(JSON.stringify({ code: 1000, data: result.changedRows && true }))
    })
})
router.post(urlPath.member.info,checkLogin);
router.post(urlPath.member.info, function(req, res) {
    var newMember = new dao.member(req.body)
    var valid = req.body.valid;
    newMember.getMemberbyId(function(err, member) {
        errCheck(err, res);
        if (member && member.length > 0) {
            if (member instanceof Array) member = member[0];
            var data = { 'member': member }
            res.end(JSON.stringify({ code: 1000, data: data }))
        } else {
            res.end(JSON.stringify({ code: 1000 }))
        }
    }, valid)
})

module.exports = router