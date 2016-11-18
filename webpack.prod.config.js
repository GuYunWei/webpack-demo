process.env.NODE_ENV = 'production';
var path=require('path'),
    precss = require('precss'),
    cssnext = require('cssnext'),
    cssnano = require('cssnano'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    nodeModulesPath = path.resolve(process.cwd(), 'node_modules'),
    deps = [
      'react/dist/react.min.js',
      'react-dom/dist/react-dom.min.js'
      // 'jquery/dist/jquery.min.js'
    ];

var webapckConfig = {
    devtool: 'source-map',
    entry:{                                                     //获取项目入口js文件
        index: [ path.resolve(__dirname, './src/index.js') ],
        vendors:[ 'react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-thunk', 'redux-actions', 'es6-promise', 'babel-polyfill', 'redbox' ]
        // vendors:['babel-polyfill', 'react','react-dom','react-router','redux', 'react-redux'],    //第三方库和框架
        // react: [ 'react', 'react-dom', 'react-router', 'babel-polyfill' ],
        // redux: [ 'redux', 'react-redux', 'redux-thunk', 'redux-actions', ],
        // fetch: [ 'es6-promise', 'isomorphic-fetch',  ],
    },
    output:{
        path: path.resolve(__dirname, 'dist'),                  //文件输出目录
        publicPath: "/demo/dist/",                              //用于配置文件发布路径，如CDN或本地服务器,这个配置直接影响了图片的输出路径
        filename: "js/[name].min.js",                           //根据入口文件输出的对应多个文件名
        chunkFilename: "js/[name].[chunkhash:8].chunk.min.js"   //按需加载生成的文件(非入口文件的命名规则)
    },
    resolve: {
        root: 'E:/demo',                                        //绝对路径
        extensions: ['', '.js', '.jsx', '.json', '.scss'],
        alias: {                                                //配置别名，在项目中可缩减引用路径
          'css': path.resolve(__dirname,'./src/css'),
          'img': path.resolve(__dirname,'./images')
        }
    },
    module: {                                                   //各种加载器，即让各种文件格式可用require引用
        noParse: [ "/node_modules"],
        loaders: [
            {
               'loader':'babel-loader',
               test: /[\.jsx|\.js ]$/,
               include:[
                   path.resolve(__dirname,'src/'),              //指定src/js这个文件里面的采用babel
               ],
               exclude:[
                   path.resolve(__dirname,'node_modules'),      //在node_modules的文件不被babel理会
               ],
               query:{
                   plugins:['transform-runtime'],
                   presets:['es2015','stage-0','react']
               }
            },
            {
               test: /\.(scss|sass|css)$/,
               loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')  //这里的写法注意下
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif)$/, 
                loader: 'url-loader?limit=8192&name=./images/[name]-[hash].[ext]'
            },
            {   
                test: /\.(woff|woff2|eot|ttf|svg|svgz)(\?.*$|$)/, 
                loader: 'url?importLoaders=1&limit=25000&name=/fonts/[name].[ext]' 
            }
        ]
    },
    postcss: function() {
      return [
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9',                                    // React doesn't support IE8 anyway
            ]
          }), cssnext, precss, cssnano]
    },
    plugins:[
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin("js/common.min.js"),      //将公共代码抽离出来合并为一个文件
        new webpack.ProvidePlugin({                           //提供全局的变量，在模块中使用无需用require引入
            'React':'react',
             $: 'jquery'
        }),
        new ExtractTextPlugin("css/[name].css"),              //单独使用style标签加载css并设置其路径
        new webpack.optimize.UglifyJsPlugin({                 //js文件的压缩
            exclude: /\.min\.js($|\?)/i,
            output: {
              screw_ie8: true,
              comments: false                                 // remove all comments
            },
            compress: { 
              screw_ie8: true,                                // React doesn't support IE8
              warnings: true 
            },
            sourceMap: true,                                  //这里的soucemap不能少，可以在线上生成soucemap文件，便于调试
            mangle: {                                         //混乱代码
              screw_ie8: true
            },
            except: ['$super', '$', 'exports', 'require']     //排除关键字
        }),
        new webpack.DefinePlugin({
          "process.env": { 
             NODE_ENV: JSON.stringify("production")           //配置环境变量到Production，防止控制台警告
           }
        }),
        new HtmlWebpackPlugin({                               //根据模板插入css/js等生成最终HTML
            favicon:'./public/favicon.ico',                   //favicon路径
            template:'./public/index.html',                   //html模板路径
            filename:'/index.html',                           //生成的html存放路径，相对于 path
            inject:true,                                      //允许插件修改哪些内容，包括head与body
            hash:true,                                        //为静态资源生成hash值
            minify:{                                          //压缩HTML文件
                removeComments:true,                          //移除HTML中的注释
                collapseWhitespace:true,                      //删除空白符与换行符
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    ],
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
};

deps.forEach(function(dep){
  var depPath = path.resolve(nodeModulesPath, dep);
  webapckConfig.resolve.alias[dep.split(path.sep)[0] = depPath];
  webapckConfig.module.noParse.push(depPath);
});

module.exports = webapckConfig;