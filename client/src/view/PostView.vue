<template>
    <div>
        <Sidebar></Sidebar>
        <article class="post">
            <div class="header">
                <h2>{{post.title}}</h2>
                <div class="meta">
                    created At {{createTime}}
                </div>
            </div>
            <div class="markdown-body content" v-html="post.contentMarkdown"></div>
        </article>  
    </div>
         
</template>
<script>
import Sidebar from '../components/blog/Sidebar.vue'
export default {
    components:{
        Sidebar
    },
    data(){
        return {
            post:{},
            change:0
        }
    },
    computed:{
        createTime(){
            var date=new Date(this.post.createdAt)
            return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+
                    ' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
    },
    beforeMount(){
        // this.$store.dispatch('FETCH_LISTS',{
        //     model:'articles',
        //     query:{id:this.$route.params.id}
        // })
        // .then(()=>{
        //     this.post=this.$store.state.posts[this.$route.params.id]       
        // })
        this.$store.dispatch('VIEW_POST',this.$route.params.id)
        .then(()=>{
            this.post=this.$store.state.currentPost  
            console.log(this.post)    
        })
    }
}
</script>
<style scoped>
.post{
    width: 800px;
    height: auto;
    margin: 20px auto;
    
}
.header{
    border-bottom: 1px solid #4c8a99;
    padding-bottom: 10px;
}
.header h2{
    color: #4c8a99; 
}
.header .meta{
    margin-top: 10px;
    color: #999999;
    font-size: 12px;
}
.content{
    margin: 20px auto;
}
</style>
