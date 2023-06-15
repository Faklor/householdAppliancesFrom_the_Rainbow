<template>
  <div class="about">
    <div class="info">
      <titleText style="align-self:center; background:black; padding:10px 30px 10px 30px; width:95%; height:150px;"/>

      <p>Главное о нас</p>  
      <div class="mainInfo">
        <img src="../assets/users2.png">
        <p style="border:none;">Зарегистрированных на нашем сайте<br>{{users}}</p>

        <img src="../assets/products2.png">
        <p style="border:none;">Продуктов на нашем сайте<br>{{products}}</p>

        <img src="../assets/sell.png">
        <p style="border:none;">Покупок сделанных на нашем сайте<br>{{sells}}</p>
      </div>


      <dAbout style="width:700px; height:400px; justify-self:center; align-self:center;"/>


      <p>Наш адрес</p>  
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d503.2125881646291!2d26.016895924549555!3d53.13360320886802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf93a13d633e74b5a!2z0JrQo9Ci0J8gItCU0L7QvCDRgtC-0YDQs9C-0LLQu9C4ICLQoNCw0LTRg9Cz0LAi!5e0!3m2!1sru!2sru!4v1489674496045" width="100%" height="600" frameborder="0" style="border:0" allowfullscreen=""></iframe>

      
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 
import dAbout from './dAbout.vue'
import titleText from './title.vue'


export default {
  name: 'Home',
  components:{
    dAbout,
    titleText,
  },
  data() {
    return {
      users:0,
      products:0,
      sells:0,
    }
  },
  methods: {
    async getDashBoard(){
      const {data} = await axios.get('http://localhost:5000/api/dashBoard')
      
      this.users = data.allUsers[0].user
      this.products = data.allProducts[0].product
      this.sells = data.allSells[0].sell
      
    },
  },
  mounted() {
    this.getDashBoard()
  },
  async created () {
    window.addEventListener('scroll', this.handleScroll);
    if (localStorage.token == 'false'){
      // localStorage.token = 'false'
      // localStorage.auth = 'true'  
      // localStorage.userRole = null
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
      this.$root.userGetInfo()
    }
  },
}
</script>

<style lang="scss">
$shadow:rgba(150,150,150,0.5);

*{
  padding:0;
  margin:0;
}

.about{
  background-image:url('../assets/rainbow.jpg');
  background-position: top;
  position:fixed;
  width:100%;
  height:100%;
  .info{
    p{
      font-size:20px; margin:60px 40px 60px 40px; border-bottom:1px solid rgba(150,150,150,0.5); padding-bottom:5px;
      &:nth-child(5){
        margin-top:450px;
      }
    }
    img{
      align-self:center; justify-self:center; margin:30px 0 30px 0;width:60px;height:60px;padding:10px;box-shadow:0 0 3px 1px rgba(150,150,150,0.5);border-radius:10px;
    }
    text-align:center;
    display:grid;
    //position:absolute;
    width:62%;
    height:100%;
    overflow-y:scroll;
    background:#fff;
    margin:0 auto 0 auto;
    box-shadow:0 0 3px 1px black;
    .mainInfo{
      display:grid;
      grid-template-columns:1fr 1fr;
    } 

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