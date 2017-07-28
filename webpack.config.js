var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require("html-webpack-plugin")
var ExtractTextPlugin  = require("extract-text-webpack-plugin")
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        main : './app/main.jsx',
        vendor : 'react'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/',
        filename: 'js/[name].[chunkhash].js',
        chunkFilename : "[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use : ExtractTextPlugin.extract({
                    use : [
                        {
                            loader : 'css-loader',
                            options : {
                                modules : true
                            }
                        },
                        {
                            loader : 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader?outputPath=fonts/'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader?outputPath=img/'
            }
        ]
    },
    // 插件
    plugins : [
        // 生成html插件
        new HtmlWebpackPlugin({
            title : '温叶react小项目',
            template : './template.ejs'
        }),
        // 分离css插件
        new ExtractTextPlugin('css/style.css'),
        // 提取公共库插件
        new webpack.optimize.CommonsChunkPlugin({
            name : ["vendor", "manifest"],			// 指定公共bundle的名称
            minChunks : function(moudle) {
                return module.context && module.indexOf("node_modules") !== -1;     // 设置引入的vendor存在于node_moudles目录中
            }
        }),
        // webpack3的范围提升插件
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    // 调试工具
    devtool: '#eval-source-map',
    // 解析模块
    resolve : {
        extensions : [".js", ".jsx", ".scss"],
        alias: {
            '@': path.resolve(__dirname, './app'),
            '@assets': path.resolve(__dirname, './app/assets'),
            '@components': path.resolve(__dirname, './app/components'),
            '@containers': path.resolve(__dirname, './app/containers'),
            '@store': path.resolve(__dirname, './app/store'),
            '@config': path.resolve(__dirname, './app/config'),
        }
    }
}

// 开发模式
if (process.env.NODE_ENV === 'development') {
    // 更改文件名
    module.exports.output.filename = 'js/[name].[hash].js';
    // 开发设置
    module.exports.devServer = {
        historyApiFallback: true,
        noInfo: true,
        contentBase : path.resolve(__dirname, 'build'),
        publicPath : '/',
        proxy : {
            "/json" : "http://localhost:4002",
            "/banner_pic" : "http://localhost:4002",
            "/list_pic" : "http://localhost:4002",
        }
    },
    // 新增插件
    module.exports.plugins = (module.exports.plugins || []).concat([
        // 热更新模块插件
        // new webpack.HotModuleReplacementPlugin(),
        // 定义环境变量插件
        new webpack.DefinePlugin({
            'process.env': {
            NODE_ENV: '"development"'
            }
        }),
    ])
}

// 生产模式
if (process.env.NODE_ENV === 'production') {
    // 改变调试模式
    module.exports.devtool = '#source-map'
    // 添加插件
    module.exports.plugins = (module.exports.plugins || []).concat([
        // 清除插件
        new CleanWebpackPlugin(['build']),
        // 定义环境变量插件
        new webpack.DefinePlugin({
            'process.env': {
            NODE_ENV: '"production"'
            }
        }),
        // 压缩插件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
            warnings: false
            }
        }),
        // 升级插件
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
