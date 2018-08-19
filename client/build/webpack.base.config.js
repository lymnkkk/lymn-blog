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

  //context: path.resolve(__dirname, '../'),
  // entry: {
  //   app: './src/main.js'
  // },
  output: {
    path:path.resolve(__dirname,'../dist'),
    filename:'[name].[chunkhash].js',
    publicPath:'/dist/'
    // path: config.build.assetsRoot,
    // filename: '[name].js',
    // publicPath: process.env.NODE_ENV === 'production'
    //   ? config.build.assetsPublicPath
    //   : config.dev.assetsPublicPath
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
        // options: {
        //   limit: 10000,
        //   name: utils.assetsPath('img/[name].[hash:7].[ext]')
        // }
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
      /*
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
      */
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
  // node: {
  //   // prevent webpack from injecting useless setImmediate polyfill because Vue
  //   // source contains it (although only uses it if it's native).
  //   setImmediate: false,
  //   // prevent webpack from injecting mocks to Node native modules
  //   // that does not make sense for the client
  //   dgram: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty',
  //   child_process: 'empty'
  // }
}
// var path = require('path')
// var vueLoaderConfig = require('./vue-loader.config')
// var webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// function resolve (dir) {
//   return path.join(__dirname, '..', dir)
// }

// const isProd = process.env.NODE_ENV === 'production'

// module.exports = {
//   devtool: isProd
//     ? false
//     : '#cheap-module-eval-source-map',
//   output: {
//     path: path.resolve(__dirname, '../dist'),
//     filename: '[name].[chunkhash].js',
//     publicPath: '/dist/'
//   },
//   resolve: {
//     extensions: ['.js', '.vue'],
//     alias: {
//       '@': resolve('src'),
//       '~': resolve('node_modules')
//     }
//   },
//   module: {
//     noParse: /es6-promise\.js$/,
//     rules: [
//       {
//         test: /\.vue$/,
//         loader: 'vue-loader',
//         options: vueLoaderConfig
//       },
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
//         loader: 'url-loader',
//         query: {
//           limit: 10000,
//           name: '[name].[ext]?[hash]'
//         }
//       },
//       {
//         test: /\.css$/,
//         use: isProd
//           ? ExtractTextPlugin.extract({
//               use: 'css-loader?minimize',
//               fallback: 'vue-style-loader'
//             })
//           : ['vue-style-loader', 'css-loader']
//       }
//     ]
//   },
//   performance: {
//     maxEntrypointSize: 300000,
//     hints: isProd ? 'warning' : false
//   },
//   plugins: isProd
//     ? [
//         new webpack.LoaderOptionsPlugin({
//           options: {
//             stylus: {
//               import: [
//                 path.join(__dirname, '../src/assets/css/variables.styl')
//               ]
//             },
//           }
//         }),
//         new webpack.optimize.UglifyJsPlugin({
//           compress: { warnings: false }
//         }),
//         new ExtractTextPlugin({
//           filename: 'common.[chunkhash].css'
//         })
//       ]
//     : [
//         new webpack.LoaderOptionsPlugin({
//           options: {
//             stylus: {
//               import: [
//                 path.join(__dirname, '../src/assets/css/variables.styl')
//               ]
//             },
//           }
//         }),
//         new FriendlyErrorsPlugin()
//       ]
// }
