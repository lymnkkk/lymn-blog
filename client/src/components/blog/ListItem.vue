<template>
    <div class="bl-item">
        <router-link :to="'/posts/'+post.id">
            <div class="header">{{post.title}}</div>
        </router-link>  
       <div class="excerpt">{{post.excerpt}}</div>
       <router-link :to="'/posts/'+post.id">
            <div class="footer">阅读全文></div>
       </router-link>  
    </div>
</template>
<script>
export default {
    name:'post-list-item',
    props:['post']
}
</script>
<style scoped>
.bl-item{
    width: 800px;
    height: auto;
    margin: 40px auto 0 auto;
    padding-bottom: 40px;
    border-bottom: 1px solid #ccc;
}
.header{
    display:inline;
    font-size: 32px;
    color:#5eb499;
    cursor: pointer;
}
.header:hover{
    color: #4c8a99;
}
.excerpt{
    margin: 10px 0;
    color: rgb(145, 144, 144);
}
.footer{
    color:rgb(221, 136, 150);
    font-size: 20px;
    cursor: pointer;
    display: inline;
}
.footer:hover{
    color: rgb(216, 85, 107);
}
</style>


