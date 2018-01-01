var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var multer = require('multer')
var fs = require('fs')
var logger = require('morgan')
var app = express()
var config = require('../config/param')
global.config = config
var router = require('./controller/router')

var accessLog = fs.createWriteStream('access.log', { flags: 'a' })
var errorLog = fs.createWriteStream('error.log', { flags: 'a' })

app.set('port', config.apiPort)
app.use(logger('short'))
app.use(logger({ stream: accessLog }))
app.use(function(err, req, res, next) {
    var meta = '[' + new Date() + '] ' + req.url + '\n'
    errorLog.write(meta + err.stack + '\n')
    next()
})
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(cookieParser())

app.all('*',router)
app.listen(app.get('port'), function() {
    console.log('请打开浏览器localhost: ' + app.get('port'))
})
