const webpack=require('webpack')
const merge=require('webpack-merge')
const baseConfig=require('./webpack.base.config')
const VueSSRClientPlugin=require('vue-server-renderer/client-plugin')
const SWPrecachePlugin=require('sw-precache-webpack-plugin')
const config=merge(baseConfig,{
    devtool:'#cheap-module-source-map',
    entry:{
        app:'./src/entry-client.js',
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_env':JSON.stringify(process.env.NODE_ENV||'development'),
            'process.env.VUE_ENV':'client'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            minChunks:function(module){
                //一个模块被提取到vendor chunk时
                return (
                    //如果他在node_modules中
                    /node_modules/.test(module.context)&&
                    //如果request是一个css文件，则无需外置化
                    !/\.css/.test(module.request)
                )
            }
        }),
        //重要信息，这将webpack运行时分离到一个引导chunk中
        //以便可以在之后正确注入异步chunk
        //这也为你的应用程序/vendor代码提供了更好的缓存
        //会把所有入口节点的代码提取出来，生成mainfest.js
        new webpack.optimize.CommonsChunkPlugin({
            name:'mainfest',
            minChunks:Infinity
        }),
        
        //此插件在输出目录中
        //生成`vue-ssr-client-mainfest.json`
        new VueSSRClientPlugin()
    ]
})

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        //压缩css
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        //压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            },
            output: {
              comments: false
            }
        }),
        //?????????????????dontCacheBustUrlsMatching
        //?????????????????runtimeCaching
        new SWPrecachePlugin({
            cacheId:'blog',
            filename:'service-worker.js',
            minify:true,
            dontCacheBustUrlsMatching:/./,
            staticFileGlobsIgnorePatterns:[/index\.html$/,/\.css$/,/\.map$/,/\.json$/],
            runtimeCaching:[
                {
                    urlPattern:'/',
                    handler:'networkFirst'
                }
            ]
        })
    )
}

module.exports=config
// const webpack = require('webpack')
// const merge = require('webpack-merge')
// const base = require('./webpack.base.config')
// const SWPrecachePlugin = require('sw-precache-webpack-plugin')
// const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

// const config = merge(base, {
//   devtool: '#cheap-module-source-map',
//   entry: {
//     app: './src/entry-client.js',
//   },
//   plugins: [
//     // strip dev-only code in Vue source
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
//       'process.env.VUE_ENV': '"client"'
//     }),
//     // extract vendor chunks for better caching
//     new webpack.optimize.CommonsChunkPlugin({
//       name: 'vendor',
//       minChunks: function (module) {
//         return (
//           /node_modules/.test(module.context) &&
//           !/\.css$/.test(module.request)
//         )
//       }
//     }),
//     new webpack.optimize.CommonsChunkPlugin({
//       name: 'manifest'
//     }),
//     new VueSSRClientPlugin()
//   ]
// })

// if (process.env.NODE_ENV === 'production') {
//   config.plugins.push(
//     // this is needed in webpack 2 for minifying CSS
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     }),
//     // minify JS
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false
//       },
//       output: {
//         comments: false
//       }
//     }),
//     // auto generate service worker
//     new SWPrecachePlugin({
//       cacheId: 'blog',
//       filename: 'service-worker.js',
//       minify: true,
//       dontCacheBustUrlsMatching: /./,
//       staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/, /\.css$/, /\.json$/],
//       runtimeCaching: [
//         {
//           urlPattern: '/',
//           handler: 'networkFirst'
//         }
//       ]
//     })
//   )
// }

// module.exports = config
