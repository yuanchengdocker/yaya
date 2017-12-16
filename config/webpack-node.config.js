'use strict'
var path = require('path'),
    rootPath = path.resolve(__dirname, '..'),
    appPath = '/src';
var fs = require('fs')
const webpack = require('webpack');


var nodeModules = {}

fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod
    })

module.exports = {
    target: "node",
    externals: nodeModules,
    entry:{
        api:[
            rootPath+'/api/app'
        ]
    },
    output: {
        path: rootPath+"/dist",
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','stage-0']
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}

