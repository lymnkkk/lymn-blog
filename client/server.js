// const express=require('express')
// const fs=require('fs')
// const LRU=require('lru-cache')
// const favicon=require('serve-favicon')
// const compression=require('compression')
// // const resolve = file => path.resolve(__dirname,file)
// const path=require('path')
// const resolve = file => path.resolve(__dirname, file)
// const { createBundleRenderer } =require('vue-server-renderer')
// const app=express()

// const isProd=process.env.NODE_ENV==='production'
// const useMicroCache = process.env.MICRO_CACHE !== 'false'
// // console.log('isProd:'+isProd)
// //获取要渲染的模板
// const template = fs.readFileSync(resolve('./index.html'), 'utf-8')
// // console.log(template)
// function createRenderer (bundle, options) {
//   // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
//   return createBundleRenderer(bundle, Object.assign(options, {
//     template,
//     // for component caching
//     cache: LRU({
//       max: 1000,
//       maxAge: 1000 * 60 * 15
//     }),
//     // this is only needed when vue-server-renderer is npm-linked
//     basedir: resolve('./dist'),
//     // recommended for performance
//     runInNewContext: false
//   }))
// }

// let renderer
// let readyPromise
// if(isProd){
//     console.log('process.env:'+isProd)

//     //bundle,通过webpack构建，生成所需的构建工具
//     const bundle=require('./dist/vue-ssr-server-bundle.json')

//     //客户端构建mainfest
//     //clientMainfest,通过webpack构建，生成所需的构建工具
//     const clientMainfest=require('./dist/vue-ssr-client-bundle.json')

//     renderer=createRenderer(bundle,{
//         clientMainfest
//     })
// }else{
//     readyPromise=require('./build/setup-dev-server')(app,(bundle,options)=>{
//         renderer=createRenderer(bundle,options)
//     })
    
// }

// // const serve=(path,cache)=>express.static(resolve(path),{
// //     maxAge:cache && isProd ? 1000*60*60*24*30 : 0
// // })

// // app.use(favicon('./public/header.png'))
// // app.use('/dist',serve('./dist',true))
// // app.use('/public',serve('./public',true))
// // app.use('/mainfest.json',serve('./mainfest.json',true))
// // app.use('/service-worker.js',serve('./dist/service-worker.js'))

// const serve = (path, cache) => express.static(resolve(path), {
//     maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
//   })
  
//   // let sitemap = ''
//   // request.get(sitemapApi).then(result => {
//   //   sitemap = getSitemapFromBody(result)
//   // }).catch(err => console.log(err))
  
//   app.use(compression({ threshold: 0 }))
//   app.use(favicon('./public/header.png'))
//   app.use('/dist', serve('./dist', true))
//   app.use('/public', serve('./public', true))
//   app.use('/manifest.json', serve('./manifest.json', true))
//   app.use('/service-worker.js', serve('./dist/service-worker.js'))

// const microCache=LRU({
//     max:100,
//     maxAge:1000  //重要提示，条目在秒后过期
// })

// //检查是否是用户特定，只有非用户特定界面才会缓存
// const isCacheable= req => useMicroCache

// function render(req,res){
//     const s=Date.now()

//     res.setHeader('Content-type','text/html')

//     const handleError = err =>{
//         if(err.url){
//             res.redirect(err.url)
//         }else if(err.code=404){
//             res.status(404).end('404 | Page Not Found')
//         }else{
//             res.status(500).end('500 | Internal Server Error')
//             console.log(`error during render:${req.url}`)
//             console.log(err.stack)
//         }
//     }

//     const cacheable=isCacheable(req)
//     if(cacheable){
//          const hit=microCache.get(req.url)
//          if(hit){
//              if(!isProd){
//                  console.log('cache hit!')
//              }
//              return res.end(hit)
//          }
//     }

//     const context={
//         title:"Home | Lymn's Blog" 
//     }

//     renderer.renderToString(context,(err,html)=>{
//         if(err){
//             console.log(err)
//             return handleError(err)
//         }
//         res.end(html)
//         if(cacheable){
//             microCache.set(req.url,html)
//         }
//         if(!isProd){
//             console.log(`whole request: ${Date.now() - s}ms`)
//         }
//     })
// }
// app.get('*',isProd ? render: (req,res)=>{
//     readyPromise.then(()=>render(req,res))
// })

// const port=process.env.PORT||5050
// app.listen(port,()=>{
//     console.log(`server started at ${port}`)
// })
const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const request = require('axios')
// const { api: sitemapApi, getSitemapFromBody } = require('./server/sitemap.js')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')

const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

const template = fs.readFileSync(resolve('./index.html'), 'utf-8')

// const markdownCSS=require('github-markdown-css')
// markdownCSS().then(css=>{
//   console.log('css：'+css)
// })

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  
  return createBundleRenderer(bundle, Object.assign(options, {
    template,
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}
// const assOption=['aa']
// console.log('assign:'+Object.assign(assOption,['bb']))
let renderer
let readyPromise
if (isProd) {
  // In production: create server renderer using built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  
  renderer = createRenderer(bundle, {
    clientManifest
  })
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

// let sitemap = ''
// request.get(sitemapApi).then(result => {
//   sitemap = getSitemapFromBody(result)
// }).catch(err => console.log(err))

app.use(compression({ threshold: 0 }))
app.use(favicon('./public/header.png'))
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))
app.use('/manifest.json', serve('./manifest.json', true))
app.use('/service-worker.js', serve('./dist/service-worker.js'))

// app.get('/sitemap.xml', (req, res, next) => {
//   res.header('Content-Type', 'application/xml')
//   return res.end(sitemap)
// })

// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
const microCache = LRU({
  max: 100,
  maxAge: 1000
})

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
const isCacheable = req => useMicroCache

function render (req, res) {
  const s = Date.now()

  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).end('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).end('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  //页面级别缓存
  const cacheable = isCacheable(req)
  if (cacheable) {
    const hit = microCache.get(req.url)
    if (hit) {
      if (!isProd) {
        console.log(`cache hit!`)
      }
      return res.end(hit)
    }
  }

  const context = {
    title: "Home | Lymn's Blog",
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.end(html)
    if (cacheable) {
      microCache.set(req.url, html)
    }
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 5050
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

