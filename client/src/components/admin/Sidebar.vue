<template>
      <div>
          <div class="ad-sidebar">
              <img src="../../assets/images/logo4.png" alt="">
              <ul class="sidebar-menu">
                  <li class="active" @click="toggleActive">Edit</li>
                  <li  @click="toggleActive">About</li>
              </ul>
          </div>
      </div>
</template>

<script>
    export default{
        name:'sidebar',
        data(){
            return {
                archieve:'home'
            }
            
        },
        methods:{
            toggleActive:(e)=>{
                var activeItem=document.querySelector('.sidebar-menu .active')
                
                activeItem.classList.remove('active')
                e.target.classList.add('active')
            }
        }
    }
</script>

<style scoped>
  .ad-sidebar{
      width: 80%;
      height: 100px;
      /* background: pink; */
      margin:0 auto;
  }
  .ad-sidebar img{
      height: 100px;
      margin-left:4%; 
  }
  .ad-sidebar ul{
      float: right;
      height: 100%;
      margin-right: 2%;
  }
  .ad-sidebar ul li{
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
  .ad-sidebar ul li.active{
      border-bottom: 2px solid #5eb499;
  }
  ul li{
    list-style: none;
  }   
</style>