var fs = require('fs'),
    path=require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    nodeModulesPath = path.resolve(process.cwd(), 'node_modules'),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
    deps = [
      'react/dist/react.min.js',
      'react-dom/dist/react-dom.min.js',
      'jquery/dist/jquery.min.js'
    ];

var webapckConfig = {
    cache: true,
    debug:true,
    devtool: "cheap-module-source-map",                     //生成sourcemap,便于开发调试
    entry:[                                                 //获取项目入口js文件
        'babel-polyfill',
        "./src/js/index"
        // vendors:['react', 'jquery']
    ],
    output:{
        path: path.join(__dirname,'build'),                 //文件输出目录
        publicPath: "/demo/build/",                         //用于配置文件发布路径，如CDN或本地服务器
        filename: "js/[name].js",                           //根据入口文件输出的对应多个文件名
        chunkFilename: "js/[name].[chunkhash:8].chunk.js"   // *按需加载生成的文件(非入口文件的命名规则)
    },
    resolve: {
        root: 'E:/demo',                    //绝对路径
        extensions: ['', '.js', '.jsx', '.json', '.scss'],          //文件扩展名
        alias: {                                            //配置别名，在项目中可缩减引用路径
        }
    },
    module: {                                               //各种加载器，即让各种文件格式可用require引用
        noParse: [ "/node_modules"],
        loaders: [
            {
               'loader':'babel-loader',
               test: /[\.jsx|\.js ]$/,
               include:[
                   path.resolve(__dirname,'src'),           //指定app这个文件里面的采用babel
               ],
               exclude:[
                   path.resolve(__dirname,'node_modules'),  //在node_modules的文件不被babel理会
               ],
               query:{
                   plugins:['transform-runtime'],
                   presets:['react-hmre', 'es2015','stage-0','react']
               }
            },
            { test: /\.css$/, loader: "style!css" },
            {
               test: /\.(scss|sass)$/,
               loader: 'style!css!postcss!sass?sourceMap'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/, 
                loader: 'url-loader?limit=8192&name=./images/[name]-[hash].[ext]'
            },
            {   
                test: /\.(woff|woff2|eot|ttf|svg|svgz)(\?.*$|$)/, 
                loader: 'url?importLoaders=1&limit=25000&name=/fonts/[name].[ext]' 
            }
        ]
    },
    plugins:[
        new webpack.optimize.OccurenceOrderPlugin(),
        new CommonsChunkPlugin({ name: "common", filename: "js/common.js" }),                  //将公共代码抽离出来合并为一个文件
        new webpack.ProvidePlugin({
            'React':'react',                                  //提供全局的变量，在模块中使用无需用require引入
             $: 'jquery'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
        }),
        new HtmlWebpackPlugin({                               //根据模板插入css/js等生成最终HTML
            // favicon:'./src/img/favicon.ico',                  //favicon路径
            template:'./src/view/index.html',                 //html模板路径
            filename:'/view/index.html',                      //生成的html存放路径，相对于 path
            inject:true,                                      //允许插件修改哪些内容，包括head与body
            hash:true,                                        //为静态资源生成hash值
            minify:{                                          //压缩HTML文件
                removeComments:false,                         //移除HTML中的注释
                collapseWhitespace:false                      //删除空白符与换行符
            }
        })
    ],
    devServer:{
        hot: true,
        inline: true,
        progress: true,
        contentBase:'./build/view',
        headers: { 'Access-Control-Allow-Origin': '*' },
        historyApiFallback: true
    }
};

deps.forEach(function(dep){
  var depPath = path.resolve(nodeModulesPath, dep);
  webapckConfig.resolve.alias[dep.split(path.sep)[0] = depPath];
  webapckConfig.module.noParse.push(depPath);
});

module.exports = webapckConfig;