<template>
      <div>
          <Sidebar></Sidebar>
          <Edit></Edit>
          <List></List>
      </div>
</template>

<script>
    import Sidebar from '../components/admin/Sidebar.vue'
    import Edit from '../components/admin/post/Edit.vue'
    import List from '../components/admin/post/List.vue'
    import api from '@/api'
     export default{
        name:'admin',
        components:{
            Sidebar,
            Edit,
            List
        },
        beforeMount(){
            const axios=api.admin.axios
            axios.interceptors.request.use((config) => {
                const token = window.localStorage.getItem('token')

                // if (axios.method === 'get' && axios.url.indexOf('/api/user') === -1) {
                //     return config
                // }
                // console.log(config)
                if (token !== null && token !== 'undefined') {
                    config.headers['authorization'] = token
                }

                return config
            }, (error) => Promise.reject(error))
        }
    }
</script>
   
<style scoped>
 
</style>