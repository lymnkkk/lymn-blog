// import { createApp } from './main'
// import Vue from 'vue';

// //当路由组件重用，也应该调用asyncData函数
// Vue.mixin({
//     beforeRouteUpdate(to,from,next){
//         const { asyncData }=this.$options
//         if(asyncData){
//             asyncData({
//                 store:this.$store,
//                 route:to
//             }).then(next).catch(next)
//         }else{
//             next()
//         }
//     }
// })

// const { app,router,store }=createApp();

// //当使用template，context.state将作为window.__INITIAL_STATE__状态，嵌入到最终的HTML中
// //而在客户端，在挂载到应用程序之前，store就应该获取到状态
// //对应entery-server.js中的context.store设置
// if(window.__INITIAL_STATE__){
//     store.replaceState(window.__INITIAL_STATE__)
// }

// //在挂载app前调用router.onReady(),因为路由器必须要提前解析配置中的异步组件，才能正确地调用组件中可能存在的路由钩子
// //客户端数据预取
// router.onReady(()=>{

//     //添加路由钩子函数，用于处理asyncData
//     //在初始路由resolve后执行
//     //以便我们不会二次预取已有的数据
//     //使用`router.beforeResolve()`，以确保所有异步组件都resolve
//     router.beforeResolve((to,from,next)=>{
//         const matched=router.getMatchedComponents(to)
//         const prevMatched=router.getMatchedComponents(from)

//         //我们只关心非预渲染的组件
//         //所以我们对比他们，找出两个匹配列表的差异组件
//         let diffed=false
//         const activated=matched.filter((component,i)=>{
//             return duffed || (diffed = (prevMatched[i]!==component))
//         })

//         if(!activated.length){
//             return next()
//         }

//         //这里如果有加载指示器，就触发
//         Promise.all(activated.map(component=>{
//             if(component.asyncData){
//                 return component.asyncData({store,route:to})
//             }
//         })).then(()=>{
//             //停止加载指示器
//             next()
//         }).catch(next)

//     })
//     app.$mount('#app')
// })

// //service worker
// if('https' === location.protocol && navigator.serviceWorker){
//     navigator.serviceWorker.register('/service-worker.js')
// }

import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './main'
import ProgressBar from './components/ProgressBar.vue'

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        bar.finish()
        next()
      })
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
