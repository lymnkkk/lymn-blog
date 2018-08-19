import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import { resolve } from 'path';

Vue.use(Router)

const Edit=()=>import('@/components/admin/post/Edit.vue')

export function createRouter(){
  return new Router({
    mode:'history',
    routes:[ 
      {
        path:'/admin/home',
        name:'admin',
        component:(resolve)=>require(['../view/Admin.vue'],resolve),
        children:[
          {
            path:'/admin/post/edit/:id/',
            component:Edit
          },
          {
            path:'/admin/post/create',
            component:Edit
          }
        ]
      },
      {
        path:'/admin',
        name:'login',
        component:(resolve)=>require(['../view/Login.vue'],resolve)
      },
      {
        path:'/',
        name:'home',
        component:(resolve)=>require(['../view/Blog.vue'],resolve),
        children:[
          {
              path:'/:page(\\d+)?',
              name:'home',
              component:(resolve)=>require(['../view/PostList.vue'],resolve)
          },
          {
              path:'/archive',
              name:'archive',
              component:(resolve)=>require(['../view/Archive.vue'],resolve)
          },
          {
              path:'/about',
              name:'about',
              component:(resolve)=>require(['../view/About.vue'],resolve)
          }
        ]
      },
      {
          path:'/posts/:id',
          name:'home',
          component:(resolve)=>require(['../view/PostView.vue'],resolve)
      },
      
    ]
  })
}