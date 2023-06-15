<template>
<div class="mainA">
  <div class="navMenu">
    
    <div class="logo"><img src="../assets/logo.svg"></div>
    <button class="users" @click="getDashBoard"><img src="../assets/dashboard.png"><p> Палитра </p></button>
    <button class="users" @click="getUsers"><img src="../assets/users.png"><p> Пользователи </p></button>
    <button class="products" @click="getProducts"><img src="../assets/products.png"><p> Продукты </p></button>
    <button class="products" @click="openMenu_addProducr"><img src="../assets/product.png"><p> Добавить продукт </p></button>
    <button class="products" @click="openSell"><img src="../assets/basket.png"><p> Покупки </p></button>
    <!--<button class="slyders"><img src="../assets/slyder.png"> Слайдеры </button>-->
  </div>

  <div class="dashBoard" v-if="visibleItem_of_menu == 0">
    <div class="info">
      <div v-for="item in dashBoard.allUsers" :key="item" class="allUsers">
        <img src="../assets/users2.png">
        <p>Пользователей<br><br>{{item.user}}</p>
      </div>

      <div v-for="item in dashBoard.allProducts" :key="item" class="allProducts">
        <img src="../assets/products2.png">
        <p>Продуктов<br><br>{{item.product}}</p>
      </div>

      <div v-for="item in dashBoard.allSells" :key="item" class="allSells">
        <img src="../assets/sell.png">
        <p>Покупок<br><br>{{item.sell}}</p>
      </div>
    </div>
    <div class="diagram">
       <!--<chart :chart-data="sells" ref="canvas"></chart>-->
       <div>
          <p>Покупаемые товары</p>
          <productChart/>
        </div>
        <div>
          <p>Активность пользователей</p>
          <userChart/>
        </div>
    </div>
    <div class="users" v-for="sell in usersSet" :key="sell">
          <p style="margin:0 0 10px 30px; border-bottom:1px solid rgba(150,150,150,0.5); padding:3px; text-align:center;">Пользователи и их заказанные товары</p>
      <div v-for="user in sell" :key="user">
        <button @click="addDiagramm(user._id)">{{user._id}}</button>
      </div>
    </div>
    
    <userSell v-bind:chartData="chartData" style="width:600px;height:400px;" />
  </div>


  <div class="cardsUsers" v-if="visibleItem_of_menu == 1">
      <table>
      <caption>Пользователи</caption>
      <tr class="trTitles">
        <th>Фото</th>
        <th>Логин</th>
        <th>Почта</th>
        <th>Имя</th>
        <th>Пол</th>
        <th>Дата рождения</th>
        <th>Номер телефона</th>
        <th>Функция</th>
      </tr>
      <tr v-for="user in users" :key="user" class="trUsers">
        <td>
          <div class="image">
            <div v-for="(image) in user.photo" v-bind:key="image">
              <img :src="require(`../assets/fotoUser/${image.filename}`)">
            </div>
            <img src="../assets/user.png" v-if="user.photo.length == 0">
          </div>
        </td>

        <td>{{user.login}}</td>
        <td>{{user.email}}</td>

        <td v-if="user.fullName != null">{{user.fullName}}</td>
          <td v-if="user.fullName === null">Данные не заполнены</td>

        <td v-if="user.pol != null">{{user.pol}}</td>
          <td v-if="user.pol === null">Данные не заполнены</td>

        <td v-if="user.dateBirthday != null">{{user.dateBirthday}}</td>
          <td v-if="user.dateBirthday === null">Данные не заполнены</td>
          
        <td v-if="user.numberPhone != null">{{user.numberPhone}}</td>
          <td v-if="user.numberPhone === null">Данные не заполнены</td>


        <td><button @click="">Удалить</button></td>
      </tr>
      </table>
  </div>

  <div class="cardsUsers" v-if="visibleItem_of_menu == 2">
    <table>
      <caption>Продукты</caption>
        <tr class="trTitles">
          <th>Фото</th>
          <th>Название</th>
          <th>Модель</th>
          <th>Категория</th>
          <th>Цена</th>
          <th>Описание</th>
          
          <th>Цвет</th>
          <th>Длина</th>
          <th>Высота</th>
          <th>Глубина</th>
          <th>Вес</th>
          <th>Функция</th>
          <th>Функция</th>
        </tr>
        <tr class="trProducts" v-for="product in products" v-bind:key="product">
          <td>
            <div class="image">
              <img style="object-fit:none;" src="../assets/noPicture.png" v-if="product.img === null">
              <img :src="require(`../assets/imageProducts/${product.img.filename}`)" v-if="product.img != null">
            </div>
          </td>

          <td v-if="product.info.name != ''">{{product.info.name +' '+ product.info.manufacturer}}</td>
            <td v-if="product.info.name == ''">Не указано</td>

          <td v-if="product.info.model != ''">{{product.info.model}}</td>
            <td v-if="product.info.model == ''">Не указано</td>

          <td v-if="product.info.catagory != ''">{{product.info.catagory}}</td>
            <td v-if="product.info.catagory == ''">Не указано</td>

          <td>{{product.info.price}}</td>

          <td v-if="product.info.text != ''">{{product.info.text}}</td>
            <td v-if="product.info.text == ''">Не указано</td>


          <td v-if="product.info.color != ''">{{product.info.color}}</td>
            <td v-if="product.info.color == ''">Не указано</td>

          <td v-if="product.info.width != ''">{{product.info.width}}</td>
            <td v-if="product.info.width == ''">Не указано</td>

          <td v-if="product.info.heigth != ''">{{product.info.heigth}}</td>
            <td v-if="product.info.heigth == ''">Не указано</td>

          <td v-if="product.info.depth != ''">{{product.info.depth}}</td>
            <td v-if="product.info.depth == ''">Не указано</td>

          <td v-if="product.info.weight != ''">{{product.info.weight}}</td>
            <td v-if="product.info.weight == ''">Не указано</td>

        <td><button @click="">Редактировать</button></td>
        <td><button @click="">Удалить</button></td>

      
        </tr>
    </table>
    
  </div>

  <div class="addProduct" v-if="visibleItem_of_menu == 3">
  <form @submit.prevent="addProductInfoPost" method="POST">
    <!--<p>Основные</p>-->
    <input v-model="productPost.name" name="name" type="login" placeholder="Название">
    <input v-model="productPost.model" name="model" type="login" placeholder="Модель">
    <input v-model="productPost.catagory" name="catagory" type="login" placeholder="Категория">
    <input v-model="productPost.price" name="price" type="login" placeholder="Цена">

    <!--<p>Второстепенные</p>-->
    <input v-model="productPost.color" name="color" type="login" placeholder="Цвет">
    <input v-model="productPost.manufacturer" name="manufacturer" type="login" placeholder="Производитель">
    <input v-model="productPost.text" name="text" type="login" placeholder="Описание">
    <input v-model="productPost.value" name="value" type="login" placeholder="Кол-во">

    <!--<p>Габариты</p>-->
    <input v-model="productPost.width" name="width" type="login" placeholder="Ширина">
    <input v-model="productPost.heigth" name="heigth" type="login" placeholder="Высота">
    <input v-model="productPost.depth" name="depth" type="login" placeholder="Глубина">
    <input v-model="productPost.weight" name="weight" type="login" placeholder="Вес">
  </form>  
  <form @submit.prevent="addProductImgPost" method="POST" enctype="multipart/form-data">
    <input type="file" ref="image" @change="handleFileUpload" accept=".jpg, .jpeg, .png">
    <input id="sendLog" type="submit" class="send" value="Добавить продукт" @click="addProductImg">
  </form>
  </div>
  
  <div class="sells" v-if="visibleItem_of_menu == 4">
    
    <div v-for="item in sells" :key="item" class="sell">
      <div v-if="item.status == 'Ожидание...'">
        <p>Пользователь:{{item.user}}</p>
        <p>Статус:{{item.status}}</p> 
        <p>Товар:</p>
        <div v-for="product in item.number" :key="product">
          <p style="margin-left:15px;">Количество:{{product.value}}</p>
          <p style="margin-left:15px;">Название:{{product.product.product.info.name +' '+ product.product.product.info.manufacturer +' '+ product.product.product.info.model}}</p>
        </div>
        <p>Дата:{{item.date}}</p>
        <p>Прием товара:{{item.method}}</p>
        <p v-if="item.adress != 'Прием товара в магазине'">Aдрес:
          <div style="margin-left:15px;">
            <p>{{item.adress.adressNew.country}}</p>
            <p>{{item.adress.adressNew.city}}</p>
            <p>ул.{{' '+item.adress.adressNew.street}}</p>
            <p>дом-{{item.adress.adressNew.house}}</p>
            <p>кв-{{item.adress.adressNew.flat}}</p>
          </div>
        </p>
        <p>Сумма:{{item.sum +' '}}бел.руб.</p>
        <button @click="sellOfYes(item._id)">Принять покупку</button>
      </div>
      <div v-if="item.status == 'Принят'">
        <p>Пользователь:{{item.user}}</p>
        <p>Статус:{{item.status}}</p> 
        <p>Товар:</p>
        <div v-for="product in item.number" :key="product">
          <p style="margin-left:15px;">Количество:{{product.value}}</p>
          <p style="margin-left:15px;">Название:{{product.product.product.info.name +' '+ product.product.product.info.manufacturer +' '+ product.product.product.info.model}}</p>
        </div>
        <p>Дата:{{item.date}}</p>
        <p>Прием товара:{{item.method}}</p>
        <p v-if="item.adress != 'Прием товара в магазине'">Aдрес:
          <div style="margin-left:15px;">
            <p>{{item.adress.adressNew.country}}</p>
            <p>{{item.adress.adressNew.city}}</p>
            <p>ул.{{' '+item.adress.adressNew.street}}</p>
            <p>дом-{{item.adress.adressNew.house}}</p>
            <p>кв-{{item.adress.adressNew.flat}}</p>
          </div>
        </p>
        <p>Сумма:{{item.sum +' '}}бел.руб.</p>
      </div>
    </div>
    
    
  </div>

</div>
</template>

<script>
import axios from 'axios'
//import { defineComponent } from 'vue'
import productChart from './productD.vue'
import userChart from './userD.vue'
import userSell from './userSell.vue'
//import chart from './chart.js'

export default {
  components:{
    productChart,
    userChart,
    userSell
  },
  name: 'Home',
  data() {
    return {
      visibleItem_of_menu:0,
      visible:true,
      users:null,
      usersSet:[],
      products:null,
      image:null,
      productPost:{
        name:'',
        model:'',
        catagory:'',
        price:0,

        color:'',
        manufacturer:'',
        text:'',
        value:'',

        width:'',
        heigth:'',
        depth:'',
        weight:'',
      },
      massInfo:[],
      sells:null,
      dashBoard:[],
      massCount:[],
      chartLabels:[],
      chartValues:[],
      chartData: {},
        chartOptions: {
          responsive: false
        },
      loader:false,
      
    }
  },
  methods: {
    async getUsers(){
      this.visibleItem_of_menu = 1
      const usersMas = await axios.get('http://localhost:5000/api/allUsers')
      this.users = usersMas.data
      //console.info(usersMas.data)
    },
    async getProducts(){
      this.visibleItem_of_menu = 2
      const productsMas = await axios.get('http://localhost:5000/api/allProducts')
      this.products = productsMas.data
      //console.info(productsMas.data)
    },
    openMenu_addProducr(){
      this.visibleItem_of_menu = 3
    },
    async addProductImg(){  
        let formData = new FormData()
        //JSON.stringify(this.productPost) 
        formData.append('file',this.image )
        formData.append('product',JSON.stringify(this.productPost) )

        const product = await axios.post('http://localhost:5000/api/addProduct', formData)
        //console.log(product.data)
    },
    handleFileUpload(){
      const file = this.$refs.image.files[0]
      this.image = file
    },
    openSell(){
      this.visibleItem_of_menu = 4
      this.getSells()
    },
    async getSells(){
      
      const allSells = await axios.get('http://localhost:5000/api/allSells')
      this.sells = allSells.data
    },
    async getDashBoard(){
      this.visibleItem_of_menu = 0
      const dashBoard = await axios.get('http://localhost:5000/api/dashBoard')
      this.dashBoard = dashBoard.data
      //console.log(dashBoard.data, this.dashBoard)

      //location.reload()

    },
    async theUsers(){
      const {data} = await axios.get('http://localhost:5000/api/diagramsUsers')
      this.usersSet = data
    },
    async addDiagramm(item){
      const {data} = await axios.post('http://localhost:5000/api/addDiagramm',{user:item})
      //console.log(data.userOfDiagramm)

      this.massCount = []
      //this.chartData.labels = []
      //this.chartData.datasets.data = []
      this.chartLabels = []
      this.chartValues = []
      data.userOfDiagramm.map(item=>{
        item.number.map(product=>{
          //console.log(product)
          let sellOb = {
            name:{type:String},
            value:{type:Number},
          }
          sellOb.name = product.product.product.info.name + ' ' + product.product.product.info.manufacturer + ' ' + product.product.product.info.model
          sellOb.value = product.value
          this.massCount.push(sellOb)
        })
      })
      
      let counts = {}
      this.massCount.map(item=> { 
        counts[item.name] = (counts[item.name] || 0)+item.value 
        //
      })
      //console.log(counts)
      let a = JSON.stringify(counts)
      let b = a.replace(/"/g,'').replace(/{/g,'').replace(/}/g,'')
      let v = b.split(',')
      v.map(item=>{
        //item.split(':')
        //console.log(item.split(':')[0])
        this.chartLabels.push(item.split(':')[0])
        this.chartValues.push(Number(item.split(':')[1]))
      })
      this.chartData = {
        labels: this.chartLabels,
        datasets: [
          {
            label: item,
            backgroundColor: [
            '#f87979 ',
            '#41B883',
            '#F5CDCD',
            '#FF0000',
            '#DD1B16'
            ],
            data: this.chartValues
          }
        ]
      }
      
    },
    async sellOfYes(item){
      const {data} = await axios.post('http://localhost:5000/api/sellOfYes',{sellId:item})
      //console.log(data)
      location.reload()
    }
  },
  
  mounted() {
    this.getDashBoard()
    this.theUsers()
  },
  async created() {
    if (localStorage.token == 'false'){
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
      let photo = res.data.user.photo[0].filename
      if(photo == null)  {
        localStorage.userPhoto = './assets/user.png'
      }        
      else{
        localStorage.userPhoto = `./assets/fotoUser/${photo}`
      }
      this.$root.userGetInfo()
    }
   
  },
    
}
</script>

<style lang="scss">
$shadow:rgba(150,150,150,0.5);
$shadowOut:#42b983;


*{
  padding:0;
  margin:0;
  font-family: Microsoft Sans Serif;
  
}
.mainA{
  display:flex;
  //grid-template-columns:35% 65%;

  .navMenu{
    display:grid;
    grid-template-columns:1fr;
    grid-template-rows:repeat(10 , 1fr);
    width:320px;
    height:100%;
    background-color:rgba(50,50,50,0.8);
    position:fixed;
    button{
      img{
        width:40px;
        height:40px;
        padding-left:10px;
        padding-right:10px;
        position:relative;
      }
      outline:0;
      background-color:transparent;
      border:none;
      cursor:pointer;
      transition:0.5s;
      color:#eee;
      display:flex;
      p{
        text-align:left;
        font-size:24px;
        align-self:center;
        position:relative;
      }
      align-self:center;

      &:hover{
        //background-color:$shadow;
        &::before{
          content:'';
          position:absolute;
          margin:-20px 0 0 0;
          height:80px;
          background:$shadowOut;
          animation: beforeButton 0.5s forwards;
        }
      }
    }
    .logo{
      text-align:center;
      img{
        background-color:white;
        //opacity:90%;
        border-right:1px solid rgb(50,50,50);        
      }
    }
  }
  .cardsUsers{
    margin:0 0 0 320px;
    //position:absolute;
    display:grid;
    //overflow:scroll;
    //font-family: Microsoft Sans Serif;

    h1{
      justify-self:center;
    }
    button{
      padding:10px 15px 10px 15px;
      //margin:10px 10px 0 200px;
      border:none;
      box-shadow:0 0 2px 1px black;
    }
    .image{
      width:100px;
      height:100px;
      div{
        width:100px;
        height:100px;
      }
      img{
        width:100%;
        height:100%;
        object-fit:cover;
        border-radius:100%;
      }
    }
    table{
      align-self:center;
      justify-self:center;
      overflow:scroll;

      border:1px solid $shadow;
      padding:15px 20px 15px 20px;
      transition:1s;
      margin:10px;
      letter-spacing: 5px;
      .trTitles{
        font-size:22px;
        th{
          border-bottom:1px solid $shadow;
          padding:10px 10px 10px 10px;
          background:$shadowOut;
          color:#fff;
        }
        
      }
      .trUsers{
        td{
          //border-bottom:1px solid $shadow;
          padding:5px 10px 5px 10px;
          border-right: 1px solid $shadow;
        }
      }
      caption{
        font-size:32px;
      }
      .trProducts{
        td{
          padding:5px 10px 5px 10px;
          border-right: 1px solid $shadow;
          //text-align:justify;
        }
        .image{
          width:150px;
          height:200px;
          img{
            border-radius:0;
          }
        }
      }
      
    }
  }
  // .cardsProducts{
  //   margin:0 0 0 320px;
  // }
  .addProduct{
    margin:0 0 0 320px;
    p{
      font-size:28px;
      //margin:10px;
    }
    input{
      padding:5px 10px 5px 10px;
      margin:5px;
      border:none;
      border-bottom:1px solid $shadow;
      font-size:18px;
      outline:0;
    }
    form{
      display:grid;
      //grid-template-columns:repeat(4,1fr);
       // border:1px solid $shadow;
      p{
        text-align:center;
        margin:20px 0 20px 0;
      }
    }
  }
  .dashBoard{
    margin:0 0 0 320px;
    display:grid;
    
    text-align:center;
    .info{
      display:flex;
      align-self:center;
      justify-self:center;
      div{
        align-self:center;
        justify-self:center;
        margin:10px;
        border:1px solid $shadow;
        padding:20px 25px 20px 25px;
        width:200px;
        cursor:default;
        img{
          width:40px;
          height:40px;
        }
      }
    }
    .diagram{
      margin:10px;
      display:flex;
      p{
        border-bottom:1px solid $shadow;
        padding:5px 0 5px 0;
      }
      div{
        margin:10px;
      }
    }
    .users{
      text-align:left;
      button{
        cursor:pointer;
        border:none;
        padding:10px 25px 10px 25px;
        margin:5px 0 3px 30px;
        &:hover{
          color:#fff;
          background:black;
        }
      }
    }
  }
  .sells{
    margin:0 0 0 320px;
    
    .sell{
      border:1px solid black;
      padding:20px;
      margin:10px;
      //display:flex;
    }
    button{
      padding:10px 15px 10px 15px;
      margin:10px 10px 0 200px;
      border:none;
      box-shadow:0 0 2px 1px black;
    }
  }
}

::-webkit-scrollbar { 
  display: none;
  //width:2px; 
}


@keyframes beforeButton{
  0%{
    width:0%;
  }
  100%{
    width:100%;
  }
}
</style>