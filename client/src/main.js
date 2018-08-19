// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import './assets/css'
// import { createRouter } from './router'
// import { createStore } from  './store'

// /*
// Vue.config.productionTip = false

// const router=createRouter()
// const store=createStore()

// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })
// */

// // 避免状态单例
// export function createApp(){
//   const router=createRouter()
//   const store=createStore()

//   sync(router,store)

//   const app=new Vue({
//     router,
//     store,
//     render:h=>h(App)
//   })
  
//   return { app,router,store }
// }
import './assets/css/index'
// const githubMarkdownCSS=require('github-markdown-css')
import Vue from 'vue'
import App from './App'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './utils/title'

Vue.mixin(titleMixin)

// githubMarkdownCSS().then(css=>{
//     import(css);
// })

export function createApp () {
  const store = createStore()
  const router = createRouter()

  // use `store.state.route`
  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}

