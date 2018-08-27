const webpack=require('webpack')
const merge=require('webpack-merge')
const nodeExternal=require('webpack-node-externals')
const baseConfig=require('./webpack.base.config')
const VueSSRServerPlugin=require('vue-server-renderer/server-plugin')

module.exports=merge(baseConfig,{
    //这允许webpack以node 适用方式处理动态导入(dynamic import)
    //并且还会在编译组件时，
    //告知'vue-loader'输送面向服务器代码
    target:'node',

    //对bundle renderer提供source map支持
    devtool:'#source-map',

    //将entry指向应用程序的server entry文件
    entry: './src/entry-server.js',

    //告知server bundle使用node风格导出(Node-style exports)
    output:{
        filename:'server-bundle.js',
        libraryTarget:'commonjs2'
    },

    //外置化应用程序依赖模块，可以使服务器构建速度更快
    //并生成较小的bundle文件
    externals:nodeExternal({
        //不要外置化webpack需要处理的依赖模块
        //将css加入白名单，是因为从依赖模块导入的css还应该由webpack处理
        whitelist:/\.css$/
    }),

    //这是将服务器的整个输出
    //构建为单个JSON文件的插件
    //默认文件名为`vue-ssr-server-bundle.json`
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'devolopment'),
            'process.env.VUE_ENV':'"server"',
            'isBrowser':false
        }),
        new VueSSRServerPlugin()
    ]
})
