<template>
  <div class="menu" >
    <router-link to="/user">
      <div class="icon user">
        <img :src="userInfo.photo">
        <h1>{{userInfo.login}}</h1>
      </div>
    </router-link>
    <div class="openMenu" v-show="visibleMenu" @click="stepNext"><hr></div>
  </div>

  <div id="nav" v-show="step == 1">
    <transition name="fade"> 
      <img ref="animImg" :src="foto"> 
    </transition>
    
    <router-link @click="stepBack" @mouseover="fotoSetMain" @mouseout="fotoSetThis" to="/">Главная страница</router-link> 
    <router-link @click="stepBack" @mouseover="fotoSetShop" @mouseout="fotoSetThis" to="/shop">Магазин</router-link> 
    <router-link @click="stepBack" @mouseover="fotoSetAbout" @mouseout="fotoSetThis" to="/about">О нас</router-link>
    <router-link @click="stepBack" @mouseover="fotoSetAdmin" @mouseout="fotoSetThis" to="/admin" v-show="role == 'Admin'">Администрирование</router-link>
  </div>
  <router-view/>
</template>

<script>
//import admin from './views/Admin.vue'
//import lodash from 'lodash'
//import {login} from './views/Home.vue'

export default {
  productionSourceMap: false,
  name: 'Home',
  data() {
    return {
      visibleMenu:true,
      step:0,
      foto:null,
      role:localStorage.userRole,
      userInfo:{
        login:localStorage.userLogin,
        photo:localStorage.userPhoto,
      },
      counter: 10
    }
  },
  methods: {
    stepNext(){
      if(this.step == 1){
        this.step--
      }
      else{
        this.step++
      }
      this.foto = require('./assets/main.jpg')
      //this.$refs.animImg.style.animation = 'fotoAnime 2s'
      //console.info(this.$router.currentRoute._rawValue.fullPath)   
      if(this.$router.currentRoute._rawValue.fullPath == '/'){
        this.foto = require('./assets/main.jpg')
      }
      if(this.$router.currentRoute._rawValue.fullPath == '/shop'){
        this.foto = require('./assets/shop.jpg')
      }
      if(this.$router.currentRoute._rawValue.fullPath == '/about'){
        this.foto = require('./assets/about.jpg')
      }
      if(this.$router.currentRoute._rawValue.fullPath == '/admin'){
        this.foto = require('./assets/admin.jpg')
      }  

      this.role = localStorage.userRole
      
    },
    stepBack(){
      this.step--
    },
    fotoSetAbout(){
      this.foto = require('./assets/about.jpg')
    },
    fotoSetShop(){
      this.foto = require('./assets/shop.jpg')
    },
    fotoSetMain(){
      this.foto = require('./assets/main.jpg')
    },
    fotoSetAdmin(){
      this.foto = require('./assets/admin.jpg')
    },
    fotoSetThis(){
      if(this.$router.currentRoute._rawValue.fullPath == '/'){
        this.foto = require('./assets/main.jpg')  
      }
      if(this.$router.currentRoute._rawValue.fullPath == '/shop'){
        this.foto = require('./assets/shop.jpg')       
      }
      if(this.$router.currentRoute._rawValue.fullPath == '/about'){
        this.foto = require('./assets/about.jpg')       
      } 
      if(this.$router.currentRoute._rawValue.fullPath == '/admin'){
        this.foto = require('./assets/admin.jpg')       
      } 
    },
    userGetInfo(){
      this.userInfo.login = localStorage.userLogin
      this.userInfo.photo = require(`${localStorage.userPhoto}`)
    },
  },
  mounted() {
    //this.userR()
  },
  watch:{
    "userInfo.login": function (val){
      val = localStorage.userLogin
      this.userInfo.login = val
    }
  }
}
</script>

<style lang="scss">
$shadow:rgba(150,150,150,0.5);
$shadowIn:rgba(14,14,14,0.3);
$shadowOut:#42b983;

*{
  padding:0;
  margin:0;

}
body{
  //background-color:$shadowOut;
}
.menu{
  font-family: Microsoft Sans Serif;
  display:flex;
  position:fixed;
  right: 1px;
  z-index:2;
  //position:absolute;
  .icon{
    display:flex;
    //grid-template-columns: 1fr 1fr;
    margin:10px;
    padding:5px;
    height:50px;
    border-radius:5px;
    box-shadow:0 0 3px 2px $shadowIn;
    background-color:#fff;
    position:relative;
    z-index:998;
    img{
      width:50px;
      height:50px;
     object-fit:cover;
      margin-right:5px;
      border-radius:30px;
    }
    h1{
      text-decoration:none;
      border:none;
      padding-right:5px;
    }
  }
  .openMenu{
    margin:10px 20px 10px 0;
    padding:5px;
    width:50px;
    height:50px;
    border-radius:20px;
    box-shadow:0 0 3px 2px $shadowIn;
    background-color:#fff;
    cursor:pointer;
    z-index:1000;
    hr{
      margin-top:50%;
      border: 1px solid black;
      width:25px;

      &:before{
        content:"";
        position:absolute;
        border:1px solid black;
        width:46px;
        top:30px;
      }
      &:after{
        content:"";
        position:absolute;
        border:1px solid black;
        width:46px;
        top:50px;
      }
    }
  }
}
#nav {
  width:100%;
  height:100%;
  display:grid;
  grid-template-rows: repeat(6, 1fr);
  position:fixed;
  font-family: Microsoft Sans Serif;
  font-size:70px;
  text-align:center;
  z-index:999;
  img{
    animation:fotoAnime 1s;
    position:absolute;
    width:100%;
    height:100%;
    object-fit:cover;
  }
  &:before{
    content:"";
    position:absolute;
    width:100%;
    height:100%;
    background-color:black;
    opacity:75%;
    z-index:997;
  }
  
  a{
    padding:0 0 10px 10px;
    color: #fff;
    text-decoration:none;
    z-index:998;
    transition:1s;

    &:hover:before{
      content: "";
      position:absolute;
      background-color:$shadowOut;
      height:80px;
      box-shadow: 0 0 10px 5px $shadowOut;
      opacity:50%;
      animation:linksAnime 0.5s;
      transform:scale(1.1)
    }
    &.router-link-exact-active {
      color: #42b983;
    }
    &:active{
      background-color:$shadowOut;
    }
    &:nth-child(2){
      margin-top:300px;
      align-self: end;
 			justify-self: center;
       padding: 5px 40px; 
       &:before{
         width:625px;
       }
    }
    &:nth-child(3){
      align-self: center;
 			justify-self: center;
       padding: 5px 40px; 
       &:before{
         width:290px;
       }
    }
    &:nth-child(4){
      align-self: start;
 			justify-self: center;
       padding: 5px 40px;
       &:before{
         width:195px;
       }
    }
    &:nth-child(5){
      align-self: start;
 			justify-self: center;
       padding: 5px 40px;
       &:before{
         width:700px;
       }
    }
  }
}

@keyframes fotoAnime{
  0%{
    opacity:0%;
  }
  100%{
    opacity:100%;
  }
}
@keyframes linksAnime{
  0%{
    opacity:0%;
  }
  100%{
    opacity:50%;
  }
}
</style>
