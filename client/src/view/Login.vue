<template>
    <div class="login">
        <div class="logo">
            <img src="../assets/images/logo4.png" alt="">
        </div>
        <form>
            <div ></div>
            
        </form> 
        
        <form class="login-info">
            <div class="info">
                <span>Username:</span><input type="text" v-model="info.name">
            </div>
            <div class="info">
                 <span>Password:</span><input type="text" v-model="info.password">
            </div>
            <div class="info">
                <button class="submit" @click.prevent="checkIn">登录</button>
            </div>
            
        </form>
    </div>
</template>
<script>
import api from '@/api'
export default {
    data(){
        return {
            info:{
                name:'',
                password:''
            },
            remember:false
        }
    },
    methods:{
        checkIn(){
            
            api.admin.login(this.info).then(res=>{
                if(res.status==='fail'){    
                }else if(res.status==='success'){
                    window.localStorage.setItem('token',res.token)
                    this.remember && window.localStorage.setItem('user',this.info.name)
                    !this.remember && window.localStorage.removeItem('user')
                    this.$router.push('/admin/home')
                }
            }).catch(err => console.log(err))
        }
    },
    beforeMount(){
        this.info.name = window.localStorage.getItem('user') ? window.localStorage.getItem('user') : ''
    }
}
</script>
<style scoped>
.login{
    width: 800px;
    height: auto;
    margin: 0 auto;
}
.logo{
    width: 400px;
    height: auto;
    margin: 10px auto;
}
.logo img{
    width: 400px;
    height: auto;
}

.info{
    width: 300px;
    margin: 20px auto;
}
.info span{
    display: inline-block;
    width: 100px;
}
.info input{
    width: 200px;
    height: 30px;
}
.submit{
    width: 60px;
    height: 30px;
    margin: 10px auto;
    background: #4c8a99;
    border: none;
    color: #ffffff;
    display: block;
}
.submit:active{
    background: #346c7a;
}
</style>
