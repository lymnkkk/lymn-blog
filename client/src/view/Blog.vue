<template>
    <div>
        <Sidebar></Sidebar>
        <router-view></router-view>
        <Foot></Foot>
    </div>
</template>
<script>
import Sidebar from '../components/blog/Sidebar.vue'

import Foot from '../components/blog/Footer.vue'
export default {
    name:'blog',
    components:{
        Sidebar,
        Foot
    }
}
</script>
<style scoped>
 div{
     height: auto;
 }

</style>


