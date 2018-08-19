import axios from 'axios'
import config from '../../config'

const prefix=config.api

function fetch(model,query={}){
    const target=`${prefix}/${model}`

    return new Promise((resolve,reject)=>{
        axios.get(target,{params:query}).then(res=>{
            resolve(res.data)
        }).catch(err=>reject(err))
    })

}
function view(id){
    const url=`${prefix}/articles/${id}`
    
    return new Promise((resolve,reject)=>{
        axios.get(url).then(res=>{
            resolve(res)
        }).catch((err)=>{
            console.log('view error:'+err)
        })
    })
    // return axios.get(url)
}

export default{
    fetch,
    view,
    admin:{
        axios,
        create:(model,data)=>{
            return axios.post(`${prefix}/${model}`,data).then(res=>{
                return res.data
            })
        },
        update:(model,id,data)=>{
            const url=`${prefix}/${model}/${id}`
            return axios.put(url,data).then(res=>{
                return res.data
            })
        },
        remove:(model,id)=>{
            const url=`${prefix}/${model}/${id}`
            return axios.delete(url).then(res=>{
                return res.data              
            })
        },
        login:(conditions)=>{
            const url=`${prefix}/admin/login`
            return axios.post(url,conditions).then(res=>{
                return res.data
            })
        }
    }
}