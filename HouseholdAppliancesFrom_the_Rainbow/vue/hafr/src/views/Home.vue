<template>
<div class="homeMenu">
  <button @click="step('up')" v-if="stepScroll != 0" style="transform:rotate(180deg);"><img src="../assets/openFilter.png"></button>
  <!--<div v-for="item in stepMass" :key="item">
    {{item}}
  </div>-->
  <button @click="step('down')" v-if="stepScroll != 1" style="transform:rotate(360deg);"><img src="../assets/openFilter.png"></button>
</div>

<div class="header" v-if="stepScroll == 0">
  
  <!--Household Appliances From the Rainbow-->
  <div class="logo"> <titleText/> </div>
  <div class="text">
    <div> 
      <p>Household Appliances From the Rainbow - интернет-магазин электроники и бытовой техники. Именно так мы представлены на торговых площадках Беларуси.
      Сейчас на сайте есть электрочайники, холодильники, газовые плиты и многое другое.</p>
      <button @click="toShop">Перейти в мазагин</button> 
    </div>  
    
  </div>
</div>

<div class="mainContent" v-if="stepScroll == 1">
  <!--<div class="work">
    <div>
      Выбрать товар
    </div>
    <div>
      Добавить товар в корзину
    </div>
    <div>
      Выбрать товар и его количество
    </div>
    <div>
      Выбрать метод приема товара
    </div>
    <div>
      Ожидать принятие покупки
    </div>    
  </div>-->
  <p class="title">Отзывы</p>
  
  <div class="commentsUsers">
    <div class="comment" v-for="comment in comments" :key="comment">
      <div class="image">
        <div v-for="user in users" :key="user">
          <img src="../assets/user.png" v-if="user.photo.length == 0 & comment.user == user.login">
            <img :src="require(`../assets/fotoUser/${user.photo[0].filename}`)" v-if="user.photo.length != 0 & comment.user == user.login" style="box-shadow:0 0 3px 1px rgba(0,0,0,0.6);">
          <p v-if="comment.user == user.login">{{user.login}}</p>
        </div>
      </div>
      <div class="text">
        <p>Оценка - {{' '+comment.appraisal}}</p>
        <p>Комментарий:{{' '+comment.comment}}</p>
      </div>
    </div>
  </div>

  <p class="title" style="border-bottom:1px solid #77619e;">C нами работают</p>
  <div class="partnery">
    <img src="../assets/partnery/aresa.jpg">
    <img src="../assets/partnery/atlant.jpg">
    <img src="../assets/partnery/barhim.jpg">
    <img src="../assets/partnery/blakit.jpg">
    <img src="../assets/partnery/conte.jpg">
    <img src="../assets/partnery/galanteya.jpg">
    <img src="../assets/partnery/gefest.jpg">
    <img src="../assets/partnery/kalinka.jpg">
    <img src="../assets/partnery/marko.jpg">
    <img src="../assets/partnery/mattioli.jpg">
    <img src="../assets/partnery/mf.jpg">
    <img src="../assets/partnery/panda.jpg">
    <img src="../assets/partnery/romgil.jpg">
    <img src="../assets/partnery/slon.jpg">
    <img src="../assets/partnery/zorka.jpg">
  </div>

  <div class="footer">
    <div>
      <p>{{'-Посетите нас-'}}</p><br>

      <p style="margin-left:30px;"><img src="../assets/address.png" style="width:60px; height:60px;"></p>
      <p style="margin-left:30px;">Беларусь</p>
      <p style="margin-left:30px;">город Барановичи</p>
      <p style="margin-left:30px;">ул. Советская, 65</p>
      <p style="margin-left:30px;">ул. Ленина, 53</p><br>

      <p>-Позвоните нам-</p><br>
      <p style="margin-left:30px;"><img src="../assets/phone.png"><a href="tel:8 (0163) 64-18-12">8 (0163) 64-18-12</a></p>
      <p style="margin-left:30px;"><img src="../assets/phone.png"><a href="tel:8 (0163) 64-18-01">8 (0163) 64-18-01</a></p>
      <p style="margin-left:30px;"><img src="../assets/phone.png"><a href="tel:8 (0163) 66-88-71">8 (0163) 66-88-71</a></p><br>

      <p>-Напишите нам-</p><br>
      <p style="margin-left:30px;"><img src="../assets/mail.png"><a href="https://mail.ru">householdappliancesfromrainbow@mail.ru</a></p>
    </div>
    <div>
      <h1>Household Appliances From the Rainbow</h1>
      <button @click="toShop">Перейти в мазагин</button>
      <p>Подписывайтесь на нас</p>
      <a href="https://vk.com/dtraduga"><img src="../assets/social/vk.svg"></a>
      <a href="https://ok.ru/domtorgovli"><img src="../assets/social/friends.svg"></a>
      <a href="https://www.instagram.com/dtraduga"><img src="../assets/social/instagram.svg"></a>
      <a href="https://t.me/dt_raduga"><img src="../assets/social/telegram.svg"></a>
      <a href="https://tinyurl.com/y2zw6c37"><img src="../assets/social/viber.svg"></a>
      <a href="https://www.facebook.com/domtorgovliraduga"><img src="../assets/social/facebook.svg"></a>
      
    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios'
import titleText from './title.vue'
import animHome from './AnimHome.vue'

export default {
  name: 'Home',
  components:{
    titleText,
    animHome
  },
  data() {
    return {
      stepScroll:0,
      stepMass:[
        "HAFR",
        "-----",
      ],
      comments:[],
      users:[],
      user:{
        photo:'',
      },
     
    }
  },
  async created() {
      //window.addEventListener('scroll', this.handleScroll);
    if (localStorage.token == 'false'){
       //localStorage.token = 'false'
       //localStorage.auth = 'true'  
       //localStorage.userRole = null
      //localStorage.userLogin = 'Войдите'
      this.$root.userGetInfo()

    }
    else{
       const res = await axios.get('http://localhost:5000/api/user', {
        headers:{
          'Authorization':'Bearer ' + localStorage.token
        },
      })
      localStorage.userRole = res.data.user.roles
      localStorage.userLogin = res.data.user.login
      
      let photo = res.data.user.photo
      if(photo.length == 0)  {
        localStorage.userPhoto = './assets/user.png'
        this.user.photo = require('../assets/user.png')
      }        
      else{
        localStorage.userPhoto = `./assets/fotoUser/${photo[0].filename}`
        this.user.photo = require(`../assets/fotoUser/${photo[0].filename}`)
      }
      this.$root.userGetInfo()
    }
    
   
  },  
  
  mounted() {
    this.getComment()
    
  },
  methods: {
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      //console.log(scrollTop)
      if(scrollTop == 1){
        this.stepScroll = 1
      }
      if(scrollTop == 0){
        this.stepScroll = 0
      }
    },
    toShop(){
      this.$router.push('/shop')
    },
    step(item){
      if(item == 'up'){
        this.stepScroll--
      }
      else if(item == 'down'){
        this.stepScroll++
      }
    },
    async getComment(){
      const {data} = await axios.get('http://localhost:5000/api/getComments')
      this.comments = data.comments

      let usersNowInCommnets = data.comments
      data.users.map(userData=>{
        
        this.comments.map(comment=>{
          if(userData.login == comment.user){
            this.users.push(userData)
          }
        })
      })
      //console.log(this.users)
    },
    
  },
}
</script>

<style lang="scss">
$shadow:rgba(150,150,150,0.6);
$shadowIn:rgba(14,14,14,0.3);
$shadowOut:#42b983;
$colorText:rgb(50,50,50);

*{
  padding:0;
  margin:0;
  font-family: Microsoft Sans Serif;
            letter-spacing: 2px;
  &::-webkit-scrollbar{
      display:block;
      width: 8px;
      background-color: $colorText;
      box-shadow:inset -5px 0 3px 2px black;
    }
    &::-webkit-scrollbar-thumb{
      background-color:#77619e;
    }
    &::-webkit-scrollbar-track{
      background-color:#fff;
    }
}

.homeMenu{
  position:fixed;
  z-index:2;
  color:#fff;
  text-align:center;
  top:40%;
  margin:0 0 0 15px;
  //background:#77619e;
  border-radius:5px;
  div{
    margin:10px 0 10px 0;
  }
  button{
    background:transparent;
    outline:0;
    border:none;
    cursor:pointer;
    border-radius:10px;
    transition:0.4s;
    &:hover{
      background:#77619e;
    }
    display:grid;
    img{
      width:100%;
      height:100%;
      
    }
  }
}

.header{
  color:#fff;
  height:100%;
  width:100%;
  position:fixed;
  display:grid;
  background:url('../assets/fonts/back1.jpg');
  background-position: right bottom;
  
  .logo{
    //position:relative;
    //margin:0 0 0 20px;
    padding:10px 0 0 20px;
    
    font-size:28px;
    text-shadow:2px 1px 3px rgba(0,0,0,1);
    z-index:2;

    align-self:center;
    justify-self:center;
    $step:0.1s;
    .title{
      path{
			//opacity: 0%;
	    //fill: #fff;
		  }	
		  @for $i from 1 through 16 {
  			path:nth-child(#{$i}) {

				animation:tit_stroke  2s $step*$i infinite alternate;	
  			}
  		}
    }
  }
  .text{
    //position:relative;
    font-size:24px;
    display:flex;
    width:700px;
    //height:100%;
    padding:20px;
    //margin:150px 0 20px 150px;
    box-shadow:0 0 3px 1px rgba(0,0,0,0.5);
    background:rgba(255,255,255,0.2);
    border-radius:5px;
    z-index:2;

    align-self:start;
    justify-self:center;
    
    button{
      transition:0.4s;
      cursor:pointer;
      margin:20px 0 0 0;
      background:rgb(150,150,150);
      border:none;
      outline:0;
      box-shadow:-2px 2px 5px 3px rgba(0,0,0,0.3);
      padding:10px 15px 10px 15px;
      font-size:18px;
      border-radius:5px;
      color:#fff;
      &:hover{
        background:orange;
      }
    }
    
  }
}
.mainContent{
  width:100%;
  height:100%;
  position:fixed;
  //background:#e26464;
  overflow-y:auto;
  .work{
    display:flex;
    div{
      width:300px;
      padding:20px;
      margin:10px;
      border:1px solid black;
    }
  }
  .title{
    text-align:center;
    font-size:42px;
    margin:200px 100px 100px 100px;
    padding:10px 10px 20px 10px;
    opacity:60%;
      letter-spacing: 10px;
    
  }
  .partnery{
    text-align:center;
    //width:100%;
    //background:#fff;
  }
  .commentsUsers{
    padding:30px 0 30px 0;
    //background:#6fa794;
    background:#1f212b;
    box-shadow: inset 0 0 3px 1px black;
    overflow-x:scroll;
    display:flex;
    justify-content: center;
    margin:0 auto 0 auto;
    width:100%;
    //text-align:center;
    //grid-template-columns:repeat(3,1fr);
    &::-webkit-scrollbar{
      display:block;
      width: 8px;
      background-color: $colorText;
      box-shadow:inset -5px 0 3px 2px black;
    }
    &::-webkit-scrollbar-thumb{
      background-color:#77619e;
    }
    &::-webkit-scrollbar-track{
      background-color:#fff;
    }
    .comment{
      //background:red;
      $width:320px;
      $height:400px;
      width:$width;
      height:$height; 
      display:grid;
      margin:10px 100px 10px 100px;
      
      .image{
        //text-align:center;
        //justify-self:center;
        margin:0 0 10px 70px;
        div{
          position:absolute;
          text-align:center;
          font-size:24px;
          color:#fff;
          width:$width/2;
          height:$width/2;
          img{
            width:100%;
            height:100%;
            object-fit:cover;
            border-radius:100%;
            
          }
        }
      } 
      .text{
        margin:50px 10px 0 10px;
        background:#fff;
        text-align:center;
        border-radius:10px;
        box-shadow:0 0 3px 1px rgba(0,0,0,0.6);
        p{
          //height:$height;
          margin:5px;
          border-bottom:1px solid $shadow;
          &:nth-child(2){
            text-align:start;
            margin:5px;
            border:none;
          }
        }
      }
    }
  }
  .footer{
    background:#1f212b;
    margin:250px 0 0 0;
    //text-align:center;
    display:grid;
    grid-template-columns:repeat(2,1fr);
    div{
      align-self:center;
      justify-self:center;
      padding:20px;

      font-size:16px;
      color:#fff;
      p{
        margin:5px;
        img{
          margin:0 10px 0 0;
          width:20px;
          height:20px;
        }
      }
      &:nth-child(2){
        //background:red;
        text-align:center;
        button{
          outline:0;
          background:#77619e;
          cursor:pointer;
          border:none;
          color:#fff;
          padding:15px 20px 15px 20px;
          margin:10px 0 10px 0;
          transition:0.5s;
          &:hover{
            background:#fff;
            color:black;
          }
        }
        a{
          img{
            padding:10px;
            //fill:#fff;
            width:50px;
            height:50px;
            &:hover{

            }
          }
        }
        h1{
          text-shadow:2px 1px 3px rgba(0,0,0,1);
        }
      }
    }
  }
}




@keyframes logo{
  to{
    text-shadow:0 0 30px white;
  }
}


@keyframes tit_stroke{
	0%{
		stroke-dasharray:200px;
	}
	100%{
		stroke-dasharray:25px;	
		opacity: 100%;
    //fill:#fff;
	}
}
</style>
