'use strict'
const path = require('path')
const vueLoaderConfig = require('./vue-loader.config')
var webapck=require('webpack')
var ExtractTextPlugin=require('extract-text-webpack-plugin')
var FriendlyErrorsPlugin=require('friendly-errors-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const isProd=process.env.NODE_ENV==='production'

module.exports = {
  devtool:isProd?false:'#cheap-module-eval-source-map',

  output: {
    path:path.resolve(__dirname,'../dist'),
    filename:'[name].[chunkhash].js',
    publicPath:'/dist/'
  },
  resolve: {
    extensions:['.js','.vue'],
    // extensions: ['.js', '.vue', '.json'],
    alias: {
      //'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '~': resolve('node_modules')
    }
  },
  module: {
    noParse:/es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
        exclude:/node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit:10000,
          name:`[name].[ext]?[hash]`
        }
      },
      {
        test:/\.css$/,
        use:isProd
            ? ExtractTextPlugin.extract({
              use:'css-loader?minimize',
              fallback:'vue-style-loader'
            })
            : ['vue-style-loader','css-loader']
      }
    ]
  },
  performance:{
      maxEntrypointSize:30000,
      hints:isProd?'warning':false
  },
  plugins:isProd
          ? [
            new webapck.optimize.UglifyJsPlugin({
              compress:{ warnings:false }
            }),
            new webapck.LoaderOptionsPlugin({
              options:{
                css:{
                  import:[
                    path.join(__dirname,'../src/assets/css/admin.css')
                  ]
                }
              }
            }),
            new ExtractTextPlugin({
                filename:'[name].[hash].css',
                allChunks:true
            })
          ]
          : [
            new FriendlyErrorsPlugin()
          ]
}