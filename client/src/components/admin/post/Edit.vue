<template>
    <div class="ad-edit">
        <div class="post-content">
            <h2 v-if="isNew">Create Post</h2>
            <h2 v-else>Update Post</h2>
            <div class="title">
                <input type="text" v-model="post.title" placeholder="Title">
            </div>
            Content:
            <textarea v-model="post.content" class="content"></textarea>
            Excerpt:
            <textarea v-model="post.excerpt" class="excerpt"></textarea>
        </div>
        <div class="post-button">
            <button class="create" @click="create" v-if="isNew">Create</button>
            <div v-else>
                <button class="create" @click="update">Update</button>
                <button class="create" @click="remove">Delete</button>
                <span class="shift" @click="shift" >Create Post--></span>
            </div>
            
        </div>
    </div>
</template>
<script>
import api from '@/api'
export default {
    name:'edit',
    data(){
        return {
            post:{
               
            },
            isNew:true
        }      
    },
    methods:{
        create(){
            // for(let item in this.post){
            //     console.log(item+':'+this.post[item])
            // }
            // console.log(this.post)
            api.admin.create('articles',this.post).then((res)=>{
                // console.log(res.status)
                this.getPostList()
                // this.post={}
                // window.localStorage.removeItem('token')
                console.log(res)
                this.moveToLogin(res)
            })
        },
        update(){
            console.log(this.post)
            api.admin.update('articles',this.$route.params.id,this.post).then((res)=>{
                this.moveToLogin(res)
            })
        },
        shift(){
            this.isNew=true
            this.post={}
            this.$router.push({path:'/admin/post/create'})
        },
        remove(){
            api.admin.remove('articles',this.$route.params.id).then(res=>{
                this.getPostList()
                this.post={}
                this.isNew=true
                this.moveToLogin(res)
            })
        },
        getPostList(){
           this.$store.dispatch('FETCH_LISTS',{
                model:'articles'
            }).then(()=>{
                // this.list=this.$store.getters.activePosts
                console.log(this.$store.getters.activePosts)
                
            })
        },
        moveToLogin(res){
            if(res.status==='fail'){
                console.log('fail')
                this.$router.push('/admin')
            }
        }
    },
    watch:{
        '$route'(to,from){
            if(to.path.indexOf('/admin/post/edit')>-1){
                this.post=this.$store.state.posts[this.$route.params.id]
                this.isNew=false
               
            }
        }
    }
}
</script>
<style scoped>


.ad-edit{
    width: 800px;
    height: auto;
    margin: 0 auto;
}
h2{
    color: #4c8a99;
    text-align: center;
    margin-bottom: 20px;
}
.post-content{
    margin: 30px auto 0 auto;
}
.title{
    width: 100%;
    height: 30px;
    margin: 10px 0;
}
.title input{
    width: 100%;
    height: 30px;
    border: none;
    border-bottom: 1px solid #000;
    text-indent: 2px;
}
textarea{
    width: 100%;
    resize: none;
    padding: 5px;
    margin: 10px 0;
}
.content{
    height:300px;
}
.excerpt{
    height: 150px;
}
button{
    border: none;
    width: 80px;
    height: 30px;
    margin: 0 auto;
    background: #4c8a99;
    color: aliceblue;
    cursor: pointer;
    margin-right: 10px;
}
button:hover{
    background: #4d828f; 
}
.shift{
    float: right;
    color: #4d828f; 
    cursor: pointer;
}
</style>

