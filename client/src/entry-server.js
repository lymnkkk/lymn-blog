// import { createApp } from './main'


// /**
//  * 服务器entry使用export default导出函数，并在每次渲染中重复调用此函数
//  **/
// export default context=>{
//     /*
//     const { app }=createApp()
//     return app
//     */

//     //因为有可能会是异步路由钩子函数或组件，所以我们将返回一个Promise
//     //以便服务器能够等待所有的内容在渲染前
//     //就已经准备就绪

//     return new Promise((resolve,reject)=>{
//         const { app,router,store }=createApp()

//         const { url }=context
//         //设置服务器端的router的位置
//         router.push(url)

//         //等到router将可能的异步组件和钩子函数解析完
//         //服务端数据预取
//         router.onReady(()=>{
//             const matchedComponents = router.getMatchedComponents()
//             //匹配不到的路由，执行reject，并返回404
//             if(!matchedComponents.length){
//                 return reject({ code:404 })
//             }

//             //Promise应该resolve应用程序实例，以便它可以渲染
//             Promise.all(matchedComponents.map((component)=>{
//                 if(component.asyncData){
//                     return component.asyncData({
//                         store,
//                         route:router.currentRoute
//                     })
//                 }
//             })).then(()=>{
//                 //在所有预取钩子resolve猴
//                 //我们的store现在已经填充如渲染应用程序所需的状态
//                 //当我们将状态附加到上下文
//                 //并且`template`选项用于renderder时
//                 //状态将自动序列化`window.__INITIAL_STATE__`，并注入HTML
//                 context.state=store.state

//                 resolve(app)
//             }).catch(reject)
            
//         },reject)
//     })
// }

import { createApp } from './main'

const isDev = process.env.NODE_ENV !== 'production'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp()

    const { url } = context
    const fullPath = router.resolve(url).route.fullPath

    if (fullPath !== url) {
      reject({ url: fullPath })
    }

    // set router's location
    router.push(url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // no matched routes
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }
      // Call preFetch hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // Expose the state on the render context, and let the request handler
        // inline the state in the HTML response. This allows the client-side
        // store to pick-up the server-side state without having to duplicate
        // the initial data fetching on the client.
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
