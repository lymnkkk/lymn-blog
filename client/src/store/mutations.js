import Vue from 'vue'

export default{
    SET_LISTS:(state,{model,data})=>{
        if(model==='articles'){
            data.sort((a,b)=>{
                let x=a.createdAt
                let y=b.createdAt
                return parseInt(y)-parseInt(x)
            })
            state.lists[model] = data    
            // console.log('state.lists:'+state.lists[model])
            data.forEach( post =>{
                Vue.set(state.posts,post.id,post)
            })
        }else{
            state.lists[model]=data
            console.log('state.lists:'+state.lists[model])
        }
    },
    SET_POST:(state,data)=>{
        state.currentPost=data
        // Vue.set(state.posts,data.id,data)
        // console.log(state.posts[data.id])
    }
    
}