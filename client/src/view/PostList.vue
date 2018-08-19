<template>
    <div>
        <div class="blog-title">
            <p class="title">Lymn's Blog</p>
            <p>前端开发技术博文分享</p>
        </div>
        <div class="post-list">
            <Item v-for="post in showPosts" :post="post" :key="post.title"></Item>
        </div>
        <div class="page-list">
            <router-link :to="'/'+(page-1)"><span :class="{'twinkle':hasPrev}">&lt;prev </span></router-link>
            <router-link :to="'/'+(page+1)"><span :class="{'twinkle':hasNext}"> next&gt;</span></router-link>
        </div>
    </div>
        
</template>
<script>
import Item from '../components/blog/ListItem.vue'
export default {  
    components:{
        Item
    },
    data(){
        return{
            model:'articles',
            showPosts:[
                // {
                //     title:'webpack配置过程中遇到的一些问题',
                //     excerpt:'总结再webpack配置中遇到的一些常见的问题的归纳整理和解决方案，附上相关链接，总结再webpack配置中遇到的一些常见的问题的归纳整理和解决方案，附上相关链接'
                // },
                // {
                //     title:'面试题总结',
                //     excerpt:'整理一些面试中遇到的题'
                // },
                // {
                //     title:'es6常用语法机制',
                //     excerpt:'总结es6中常用的语法'
                // }
            ]
        }
    },
    computed:{
        page(){
            return Number(this.$store.state.route.params.page) || 1
        },
        maxPage(){
            const { lists,postsPerPage } = this.$store.state
            return Math.ceil(lists['articles'].length/postsPerPage)
        },
        hasNext(){
            return this.page < this.maxPage
        },
        hasPrev(){
            return this.page > 1
        }
    },
    methods:{
        getPostList(){
            this.$store.dispatch('FETCH_LISTS',{
                model:this.model
            }).then(()=>{
                this.showPosts=this.$store.getters.activePosts
                console.log(this.$store.getters.activePosts)
            })
        }
    },
    watch:{
        page(){
            this.getPostList()
        }
    },  
    beforeMount(){
        this.getPostList()
    }
}
</script>
<style scoped>
.blog-title{
    width: 500px;
    height: 120px;
    padding: 30px 0;
    /* background: url(../assets/images/) no-repeat center; */
    background:#4c8a99;
    color:#fff;
    margin: 20px auto; 
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 5px;
    font-size: 16px;
}
.post-list{
    width: 800px;
    height: auto;
    margin: 80px auto 0 auto;
}
.page-list{
    width: 800px;
    height: auto;
    margin: 10px auto 0 auto;
    text-align: center;
    
}
a{
    color: #000000;
    cursor: default;
}
.twinkle{
    color: #4c8a99;
    cursor: pointer;
}
</style>
