import api from '../api'
import Vue from 'vue'
export default{
    FETCH_LISTS:({ commit,state },{ model,query })=>{
        return api.fetch(model,query).then(data=>{
            commit('SET_LISTS',{model,data})
        }).catch((err)=>{
            console.log('fetch_list error:'+err)
        })
    },
    VIEW_POST:({commit},id)=>{
        return api.view(id).then(res=>{
            // state.posts=res.data
            // // Vue.set(state.posts,data.id,data)
            // console.log(state.posts)
            commit('SET_POST',res.data)
        }).catch((err)=>{
            console.log('view_post error:'+err)
        })
        // state.posts=api.view(id).data
        // console.log(state.posts)
    }
}