import { createApp } from './main'

const isDev = process.env.NODE_ENV !== 'production'

/**
* 服务器entry使用export default导出函数，并在每次渲染中重复调用此函数
**/
export default context => {

  //因为有可能会是异步路由钩子函数或组件，所以我们将返回一个Promise
  //以便服务器能够等待所有的内容在渲染前
  //就已经准备就绪
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp()

    const { url } = context
    const fullPath = router.resolve(url).route.fullPath

    if (fullPath !== url) {
      reject({ url: fullPath })
    }

    // set router's location设置服务器端的router的位置
    router.push(url)

    //等到router将可能的异步组件和钩子函数解析完
    //服务端数据预取
    router.onReady(() => {

      const matchedComponents = router.getMatchedComponents()

      //匹配不到的路由，执行reject，并返回404
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }

      //Promise应该resolve应用程序实例，以便它可以渲染
      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        //在所有预取钩子resolve猴
        //我们的store现在已经填充如渲染应用程序所需的状态
        //当我们将状态附加到上下文
        //并且`template`选项用于renderder时
        //状态将自动序列化`window.__INITIAL_STATE__`，并注入HTML
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
