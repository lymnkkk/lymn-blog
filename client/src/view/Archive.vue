<template>
    <div class="archive">  
        <!-- {{arList}} -->
         <archive-list :message="arList"></archive-list> 
    </div>
</template>
<script>
import ArchiveList from '../components/blog/ArchiveList.vue'
export default {
    name:'archive',
    components:{
        ArchiveList
    },
    data(){
        return {
            arList:{},
            mes:[]
        }
    },
    
    methods:{
        getDate(time){
            var date=new Date(time)
            var year=date.getFullYear(date)
            var month=date.getMonth(date)+1
            return {
                year:year,
                month:month
            }
        },
        getList(){
            let articles=this.$store.state.lists['articles']
            let list={}
            for(var item in articles){
                var time=articles[item].createdAt
                var year=String(this.getDate(time).year)+'年'
                var month=String(this.getDate(time).month)+'月'
                if(!list[year]){
                    
                    list[year]={}
                    
                }
                if(!list[year][month]){
                    
                    list[year][month]=[]
                }
                // list[year].push({
                //     month:articles[item]
                // })
                
                list[year][month].push(articles[item])
            //    console.log(this.list)
            }
            console.log(list)
            this.arList=list
            console.log(this.arList.length)
        },
        // getList(){
            
        //     let articles=this.$store.state.lists['articles']
        //     for(var item in articles){
        //         var time=articles[item].createdAt
        //         var year=String(this.getDate(time).year)+'年'
        //         var month=String(this.getDate(time).month)+'月'
        //         if(!this.list[year]){
                    
        //             this.list[year]=[]
        //         }
        //         if(!this.list[year][month]){
                    
        //             this.list[year][month]=[]
        //         }
                
        //         this.list[year][month].push(articles[item])
        //     //    console.log(this.list)
        //     }
        //     console.log(this.list)
        //     // return this.list
        // }
    },
    mounted(){
        var _this=this
        this.$store.dispatch('FETCH_LISTS',{
            model:'articles'
        }).then(()=>{
            this.getList()
            console.log(this.arList["2018年"])
            console.log(this.mes)
            this.mes=['a','b']
            console.log(this.mes)
            // console.log(this.$store.state.lists['articles'])
            
        })
    }
}
</script>
<style scoped>

</style>
