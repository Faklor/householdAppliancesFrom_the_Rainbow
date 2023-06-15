<template>
  <div class="menu">
    <router-link to="/user"><div class="icon user"><img src="../assets/user.png"></div></router-link> 
    <div ref="linkMenu" class="openMenu" @click="stepNext"><hr></div>
  </div>

  <div id="nav" v-show="step == 1">
    <transition name="fade"> 
     <img ref="animImg" :src="foto">
    </transition>
    
    <router-link @click="stepBack" @mouseover="fotoSetMain" @mouseout="fotoSetThis" to="/">Главная страница</router-link> 
    <router-link @click="stepBack" @mouseover="fotoSetShop" @mouseout="fotoSetThis" to="/shop">Магазин</router-link> 
    <router-link @click="stepBack" @mouseover="fotoSetAbout" @mouseout="fotoSetThis" to="/about">О нас</router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      step:0,
      foto:null,
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
      this.foto = require('../assets/main.jpg')
      //this.$refs.animImg.style.animation = 'fotoAnime 2s'
      //console.info(this.$router.currentRoute._rawValue.fullPath)   
      if(this.$router.currentRoute._rawValue.fullPath == '/'){
        this.foto = require('../assets/main.jpg')
      }
      if(this.$router.currentRoute._rawValue.fullPath == '/shop'){
        this.foto = require('../assets/shop.jpg')
      }
      if(this.$router.currentRoute._rawValue.fullPath == '/about'){
        this.foto = require('../assets/about.jpg')
      } 
    },
    stepBack(){
      this.step--
    },
    fotoSetAbout(){
      this.foto = require('../assets/about.jpg')
    },
    fotoSetShop(){
      this.foto = require('../assets/shop.jpg')
    },
    fotoSetMain(){
      this.foto = require('../assets/main.jpg')
    },
    fotoSetThis(){
      if(this.$router.currentRoute._rawValue.fullPath == '/'){
        this.foto = require('../assets/main.jpg')  
      }
      if(this.$router.currentRoute._rawValue.fullPath == '/shop'){
        this.foto = require('../assets/shop.jpg')       
      }
      if(this.$router.currentRoute._rawValue.fullPath == '/about'){
        this.foto = require('../assets/about.jpg')       
      } 
    }
  },
  mounted() {

  },
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
  background-color:$shadowOut;
}
.menu{
  display:flex;
  //position:fixed;
  float:right;
  z-index:2;
  .icon{
    margin:10px;
    padding:5px;
    width:50px;
    height:50px;
    border-radius:5px;
    box-shadow:0 0 3px 2px $shadowIn;
    background-color:#fff;
    img{
      width:100%;
      height:100%;
    }
    &:hover{

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
  position:absolute;
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
         width:595px;
       }
    }
    &:nth-child(3){
      align-self: center;
 			justify-self: center;
       padding: 5px 40px; 
       &:before{
         width:280px;
       }
    }
    &:nth-child(4){
      align-self: start;
 			justify-self: center;
       padding: 5px 40px;
       &:before{
         width:190px;
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
