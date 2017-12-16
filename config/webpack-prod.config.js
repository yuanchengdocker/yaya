var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin')
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var path = require('path'),
    rootPath = path.resolve(__dirname, '..');
    appPath = '/src/';

module.exports = {
    //入口文件
    entry:  {
        vendor: ['react','redux','react-redux','react-router','redux-thunk','react-dom'],
        bundle:rootPath + appPath +'main.js'
    },
    //输出文件目录，名称
    output: {
        path: rootPath + '/dist',
        filename: "js/[name].[chunkHash:8].js",
        chunkFilename: "js/[name].[chunkHash:8].js",
        publicPath: "./" //html里面的引用路径会变成这个
    },
    //自动扩展文件后缀名，require模块可以省略不写后缀名
    resolve: {
        extensions: ['.jsx', '.js']
    },
    //加载器
    module: {
        rules: [
            {  
                //检索js,jsx文件时，启用babel-loader转义处理
                test: /\.(js|jsx)$/,
                loader:'babel-loader',
                exclude: /node_modules/
            },
            {
                //extractTextPlugin独立生成css文件
                test: /\.(styl)$/,
                loader:extractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader!stylus-loader"
                })
            },
             {   
                test: /\.css$/,
                loader: extractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modules: false,
                            modifyVars: {
                                "primary-color":"#36bac9"
                            }
                        }
                    }]
            },
            {
                test: /\.(gif|png|jpg|svg)$/i,
                loaders: [
                    'url-loader?limit=10000&name=img/[name]-[hash:5].[ext]',
                    // 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
         options: {
            //自动补全css3前缀
           postcss: require('autoprefixer')
         }
        }),
        //自动生成html插件
        //title: 设置title的名字   
        // filename: 设置这个html的文件名   
        // template:要使用的模块的路径  
        // inject: 把模板注入到哪个标签后 'body',   
        // favicon: 给html添加一个favicon  './images/favico.ico',   
        // minify:是否压缩  true false   
        // hash:是否hash化 true false ,     
        // cache:是否缓存,   
        // showErrors:是否显示错误,  
        // xhtml:是否自动毕业标签 默认false  
        new htmlWebpackPlugin({
            title: "yaya服装",
            template: rootPath + appPath + 'index.html',
            filename: rootPath + '/dist/index.html',
            inject:'body',
            hash:false,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:false,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require', 'module', '_']
            },
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),
        new CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity //Infinity
        }),
        new extractTextPlugin('css/style.[chunkHash:8].css'),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/js/common/'),
                to:path.resolve(__dirname, '../dist/js/common') ,
                force: true
            },
            {
                from: path.resolve(__dirname, '../src/css/common/'),
                to:path.resolve(__dirname, '../dist/css/common') ,
                force: true
            },
            {
                from: path.resolve(__dirname, '../src/css/fonts/'),
                to:path.resolve(__dirname, '../dist/css/fonts') ,
                force: true
            },
            {
                from: path.resolve(__dirname, '../src/img'),
                to:path.resolve(__dirname, '../dist/img') ,
                force: true
            },
            {
                from: path.resolve(__dirname, '../src/favicon.ico'),
                to:path.resolve(__dirname, '../dist/favicon.ico') ,
                force: true
            }
        ]),
        new CleanPlugin(
            ['dist/js/*.js','dist/css/*.css',],　 //匹配删除的文件
            {
                root: rootPath,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        )
    ]
}