<template>
    <div class="archive-list">
        <div v-for="(yearItem,yearIndex) in message" :key="yearIndex" class="post-list">
            {{getTime}}
           
           <div v-for="(monthItem,monthIndex) in yearItem" :key="monthIndex" class="month" 
           :id="'toc-'+yearIndex.slice(0,4)+((monthIndex.slice(0,monthIndex.length-1))<10?'0'+monthIndex.slice(0,monthIndex.length-1):monthIndex.slice(0,monthIndex.length-1))" >
                    <h3 class="archive-time">{{yearIndex}}{{monthIndex}}</h3>
                   <ul>
                        <li v-for="(postItem,postIndex) in monthItem" :key="postIndex" class="post">
                            <router-link :to="'/posts/'+postItem.id">
                                {{postItem.title}}
                            </router-link>
                         </li>
                   </ul> 
           </div>
        </div>
        <div class="time-list">
            <p>时间表</p>
            
            <li v-for="(item,index) in time" :key="index">
                <a :href="'#toc-'+item.slice(0,4) + (item.slice(5,item.length-1)<10?'0' + item.slice(5,item.length-1) : item.slice(5,item.length-1))">{{item}}</a>
                
            </li>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            time:[]
        }
    },
    props:{
        message:{
            type:Object,
            default:{}
        }
    },
    computed:{
        getTime(){
            this.$nextTick(function(){
                var archiveTime=document.querySelectorAll('.archive-time')
                for(var item of archiveTime){
                    this.time.push(item.innerHTML)
                }
            })
        }
    }
}
</script>
<style scoped>
a{
    color: #000000;
}
.archive-list{
    width: 600px;
    height: auto;
    margin: 0 auto;
    position: relative;
    /* background: #4c8a99; */
    overflow: hidden;
}
.post-list{
    float: left;
    /* background: #4c8a99; */
    width: 400px;
}
.archive-time{
    /* text-align: center; */
    color: #4c8a99;
}
.month{
    margin:30px 0;
}
.post{
    text-indent: 10px;
    margin-bottom: 10px;
    cursor: pointer;
}
.time-list{
    /* float: right; */
    border: 1px solid #ccc;
    margin-top: 30px;
    width: 150px;
    position: fixed;
    right: 20%;
    top: 100px;
}
.time-list p{
    font-size: 16px;
    padding: 5px 0;
    font-weight: bold;
    color: #4c8a99;
    margin:5px;
    border-bottom:1px solid #ccc; 
}
.time-list li{
    list-style:none;
    padding: 5px;
    font-size: 14px;
    cursor: pointer;
}
</style>