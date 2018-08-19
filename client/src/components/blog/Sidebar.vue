<template>
      <div>
          <div class="bl-sidebar">
              <img src="../../assets/images/logo4.png" alt="" @click="combackHome">
           
              <ul class="sidebar-menu">
                  <router-link :to="'/'" ><li :class="{'active':position == 'home'}" @click="toggleActive" value="home">Home</li></router-link>
                  <router-link :to="'/archive'"><li :class="{'active':position == 'archive'}" @click="toggleActive" value="archive">Archive</li></router-link>
                  <router-link :to="'/about'"><li :class="{'active':position == 'about'}"  @click="toggleActive" value="about">About</li></router-link>
              </ul>
              
          </div>
      </div>
</template>

<script>
    export default{
        name:'sidebar',
        data(){
            return{
                position:'home'
            }
        },
        methods:{
            toggleActive(e){
                // var activeItem=document.querySelector('.sidebar-menu .active')
                
                // activeItem.classList.remove('active')
                // e.target.classList.add('active')
                // console.log(e.target)
                this.position=e.target.getAttribute('value')
                console.log(this.position)
            },
            combackHome(){
                this.$router.push('/')
                this.position='home'
                // console.log(this.position==='home')
            }
        },
        watch:{
            pos(){
                return this.position
            }
        },
        beforeMount(){
            const name=this.$router.history.current.name
            this.position=name
        }
    }
</script>

<style scoped>
  .bl-sidebar{
      width: 80%;
      height: 100px;
      /* background: pink; */
      margin:0 auto;
  }
  .bl-sidebar img{
      height: 100px;
      margin-left:4%; 
  }
  .bl-sidebar ul{
      float: right;
      height: 100%;
      margin-right: 2%;
  }
  .bl-sidebar ul li{
      float: left;
      width: 90px;
      text-align: center;
      font-size: 24px;
      color: #5eb499;
      height: 70px;
      line-height:80px;
      margin: 0 10px;
      cursor: pointer;
  }
  .bl-sidebar ul li.active{
      border-bottom: 2px solid #5eb499;
  }
  ul li{
    list-style: none;
  }
</style>