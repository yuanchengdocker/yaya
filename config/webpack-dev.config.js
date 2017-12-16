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
    //小到中性的项目上，eval-source-map是一个很好的选项
    //cheap-module-eval-source-map方法构建速度更快，但是不利于调试,用在大型项目
    devtool : 'source-map',
   //入口文件
    entry:  {
        vendor: ['react','redux','react-redux','react-router','redux-thunk','react-dom'],
        bundle:rootPath + appPath +'main.js'
    },
    //输出文件目录，名称
    output: {
        path: rootPath + '/dist',
        filename: '[name].js'
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
        
        new CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity //Infinity
        }),
        new extractTextPlugin('css/style.css'),
        //配合热替换作用
        new webpack.HotModuleReplacementPlugin(),
    ],
    //启动node服务应用配置
    //contentBase规定应用的根目录
    //inline模式下支持热启动
    //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    devServer:{
        contentBase: rootPath + '/dist',
        inline: true,
        hot:true,
        historyApiFallback: true
    }
}