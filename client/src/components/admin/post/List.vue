<template>
    <div class="ad-list-holder">
        <p>Published Post</p>
        <div class="ad-list">  
        <div v-for="(post,index) in list"  class="post bottom-border" :key="index">
            <span>{{post.title}}</span>
            <router-link :to="'/admin/post/edit/'+post.id">
                <span class="edit"  :value="post.id"><i class="fa fa-pencil-square-o"></i></span>
            </router-link>
        </div>
    </div>
    </div>
    
</template>
<script>
export default {
    data(){
        return {
            model:'articles',
            // list:[],
        }
    },
    computed: {
        list(){
            return this.$store.state.lists['articles']
        }
    },
    methods:{
        getPostList(){
           this.$store.dispatch('FETCH_LISTS',{
                model:this.model
            }).then(()=>{
                // this.list=this.$store.getters.activePosts
                console.log(this.$store.getters.activePosts)
                
            })
        },
        // updatePost(e){
        //     var id=e.currentTarget.getAttribute('value')
        //     // console.log(id)
        // }
    },
    watch:{
       
    },
    beforeMount(){
        this.getPostList()
    }
}
</script>
<style scoped>
.ad-list-holder{
    width: 800px;
    height: auto;
    margin: 30px auto;
}
.ad-list-holder p{
    font-size: 20px;
    
}
.ad-list{
    width: 800px;
    height: auto;
    margin: 10px auto 20px auto;
    border:2px solid #5eb499;
    padding: 5px 10px;
    border-radius: 4px;
}
.post{
    padding: 10px 0;
}
.bottom-border{
    border-bottom:1px solid #ccc;
}
.post span{
    cursor: pointer;
}
.post p:active{
    color:#aaa;
}
.edit,.view{
    float: right;
    margin-right: 20px;
}
.edit{
    color: #4c8a99;
}
</style>
