<template>
<div class="component_2">
  <div class="filter" ref="filter">
    <button @click="opneFiler" class="buttonFilter"><img src="../assets/openFilter.png" ref="imgOpenFilter"></button>
    <button @click="toShop" class="buttonFilter"><img src="../assets/shop.png"><p>Перейти к товарам</p></button>
    <button @click="toBasket" class="buttonFilter"><img src="../assets/basket.png"><div class="length">{{userBasket.length}}</div><p>Перейти в корзину</p></button>
    <p class="titleCatagory">Категории</p>
    
    <div class="catagory">
      <div v-for="catagory in catagorys" @key="catagory"> 
        <button @click="openCatagory(catagory._id)"><p>{{catagory._id}}</p></button>
      </div>
    </div>
    <!--<button @click="" class="buttonFilter"><img src="../assets/холодильник.png"><p ref="textFilter2">Крупногабаритная техника</p></button>-->

  </div>

  <div class="products" v-show="productNow == 0" ref="productsCard">
    <div class="mainProducts">
      <img src="../assets/mainProduct.jpg">
    </div>
    <div class="searchBlock" ref="searchBlock">
      <input v-model="searchItem" @input="searchProduct" placeholder="Поиск">
      <button @click="clearSearchItem"><hr><hr></button>
    </div>
    <div class="nameCatagory">
      <p>{{nameCatagory}}</p>
    </div>
    <div class="errors" v-if="errors">
      <p>{{errors}}</p>
    </div>
    <div class="card" v-for="product in products" v-bind:key="product">
     <div class="image" style="width:100%;" v-if="product.info.catagory === 'Телевизоры'">
        <img style="object-fit:none;" src="../assets/noPicture.png" v-if="product.img == null">
        <img :src="require(`../assets/imageProducts/${product.img.filename}`)" v-if="product.img != null">
      </div>

      <div class="image" v-if="product.info.catagory != 'Телевизоры'">
        <img style="object-fit:none;" src="../assets/noPicture.png" v-if="product.img == null">
        <img :src="require(`../assets/imageProducts/${product.img.filename}`)" v-if="product.img != null">
      </div>

      <hr class="hr">
      <p class="title">{{product.info.name + ' ' + product.info.manufacturer + ','}}<br>Модель: {{product.info.model}}</p>
      <p class="price">{{product.info.price + ' бел. руб.'}}</p>
      <div class="info">
        <p class="text">Описание<hr><br>{{product.info.text}}</p>
        <button @click="openProduct(product)" style="margin-bottom:30px;">Посмотреть</button>
        <button @click="addProductToBasket(product)" v-if="buttonVisible != 'false'">Добавить в корзину</button>
      </div>
    </div>
  </div>

  <div v-show="productNow == 1" class="oneProduct" ref="productCardNow" v-if="nowSelectProduct != null">
    <p class="title">{{nowSelectProduct.info.name + ' ' + nowSelectProduct.info.manufacturer + ' ' + nowSelectProduct.info.model}}</p>
    <div class="image">
      <img style="object-fit:none;" src="../assets/noPicture.png" v-if="nowSelectProduct.img === null">
      <img :src="require(`../assets/imageProducts/${nowSelectProduct.img.filename}`)" v-if="nowSelectProduct.img != null">
    </div>
    <p class="price">{{'Цена: ' + nowSelectProduct.info.price +' бел. руб.'}}</p>
    <button v-if="buttonVisible != 'false'">Добавить в корзину</button>
    <ul class="info">
      <li class="titleLi">Габариты<hr></li>
      <li>Цвет: {{nowSelectProduct.info.color}}</li>
      <li>Ширина: {{nowSelectProduct.info.width}}</li>
      <li>Высота: {{nowSelectProduct.info.heigth}}</li>
      <li>Глубина: {{nowSelectProduct.info.depth}}</li>
      <li>Вес: {{nowSelectProduct.info.weight}}</li>
    </ul>
    <p class="text">Описание<hr><br>{{nowSelectProduct.info.text}}</p>
  </div>

  <div v-show="productNow == 2" class="basket" ref="basket">
    <p class="basketNone" v-if="buttonVisible == 'false'">Зарегистрируйтесь или войдите для отображения корзины</p>
    <div class="conteyner">
      <div class="image">
        <img src="../assets/shop.jpg">
      </div>
      <p v-if="userBasket.length == 0 & buttonVisible != 'false'">Корзина пуста</p>
      <div class="basketProduct" v-for="(item, index) in userBasket" v-bind:key="item" v-show="buttonVisible != 'false'">
        <div class="imageProduct">
          <input :ref="'sellInput' + index" type="checkbox" v-model="productMass" :value="item, index" @change="sell(item, index)">
          <img :src="require(`../assets/imageProducts/${item.product.img.filename}`)" v-if="item.product.img != null">
            <img style="object-fit:none;" src="../assets/noPicture.png" v-if="item.product.img === null">
        </div>
        <div class="info">
          <br>
          <p>{{item.product.info.name+' '+item.product.info.manufacturer+' '+item.product.info.model}}</p><br>
          <p>Цена: {{item.product.info.price}} бел. руб.</p>
          <p>Описание: {{item.product.info.text}}</p><br>
          <button @click="deleteItem(item)">Удалить из корзины</button>
          <div :ref="'divInput' + index">
            <button @click="plusNumber('-', index)">-</button>
            <input type="number" :ref="'numberInput' + index" value="1" min="1" max="40" step="1">
            <button @click="plusNumber('+', index)">+</button>
          </div>
        </div>
      </div>

      <button v-if="productMass.length != 0 && errors2 === null" class="buttonSell" @click="openSell" ref="buttonSell">Сумма:{{overPrice}}бел. руб. Приобрести</button>
      <p v-if="errors2 != null" class="buttonSell" style="background:transparent; color:black; cursor:default;">{{errors2}}</p>

      
    </div>
    <div v-if="stepSell == 1" class="openSell">
      <div class="sell" v-if="stepAdress == 0">
        <p>Выберите способ покупки</p>
        <div @click="openAdress">
          Доставка на дом (10 бел. руб.)
        </div>
        <div @click="sellOnServer('Прием товара в магазине', 'Прием товара в магазине')">
          Прием товара в магазине (бесплатно)
        </div>
        
        <button  @click="backOpenSell">Вернуться</button>
      </div>

      <div class="adress" v-if="stepAdress == 1">
        <p style="text-align:center;" v-if="userAdress.length === 0">Перейдите в личный кабинет и создайте адрес</p>
        <p style="text-align:center;" v-if="userAdress.length > 0">Ваши адреса</p>
        <div v-for="(item, index) in userAdress" :key="item" @click="sellOnServer('Доставка на дом',item)" v-if="userAdress.length > 0">
          
            <p>Адрес №{{index+1}}</p>
            <ul>
              <li>{{item.adressNew.country}}</li>
              <li>{{item.adressNew.city}}</li>
              <li>ул.{{item.adressNew.street}}</li>
              <li>дом-{{item.adressNew.house}}</li>
              <li>кв-{{item.adressNew.flat}}</li>
            </ul>
          
        </div>
        <button  @click="backOpenSell">Вернуться</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
//import vScroll from 'vue-scroll'
import axios from 'axios'; 

export default {
  el: '',
  data() {
    return {
      buttonVisible:localStorage.token,
      products:[],
      catagorys:[],
      nameCatagory:'Все товары',
      productNow:localStorage.stepShop,
      nowSelectProduct:null,
      userBasket:[], 
      productInBusketUser:'false',
      opFilter:0,
      searchItem:'',
      errors:null,
      currentTime: 10,
      timer: null,
      productMass:[],
      numberSell:[],
      overPrice:0,
      statusSell:'Ожидание...',
      errors2:null,
      stepSell:0,
      userAdress:[],
      stepAdress:0,
    }
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--
        //console.log(this.errors, this.currentTime)
        if(this.currentTime == 0){
          this.errors = null
          this.stopTimer()
          this.currentTime = 10
        }
      }, 1000)
    },
    stopTimer() {
      clearTimeout(this.timer)
    },
    async getProducts(){
      const productsMas = await axios.get('http://localhost:5000/api/allProducts')
      this.products = productsMas.data
      //console.info(productsMas)
    },
    hideHeader(){
      
    },
    openProduct(item){
      //console.log(item)
      this.productNow = 1
      localStorage.stepShop = 0

      this.nowSelectProduct = item
    },
    async addProductToBasket(product){
      const productsMas = await axios.post('http://localhost:5000/api/addProductToBasket', {product:product, login:localStorage.userLogin}).catch(
        error => {this.errors = 'Данный товар уже есть в корзине'
        this.startTimer()
      }) 
      localStorage.token = productsMas.data.токен

      location.reload()
    },
    async deleteItem(product){
      const deleteProduct = await axios.post('http://localhost:5000/api/deleteProductToBasket', {product:product, login:localStorage.userLogin})
      localStorage.token = deleteProduct.data.токен

      location.reload()
      //this.$options.created()
    },
    sell(item, index){
      const value = Number(this.$refs['numberInput' + index].value)
      //console.log(value)
      if(value === 0 || value < 0){
        this.errors2 = 'Неверное количество товара'
      }
      else{
        this.errors2 = null
        let sellAndIndex = {
          value:Number(this.$refs['numberInput' + index].value),
          index:Number(index),
          product:item
        }

        if(this.$refs['sellInput' + index].checked){
          this.numberSell.push(sellAndIndex)
          this.$refs['divInput' + index].style.opacity = '0%'
        } 
        else{
          this.numberSell = this.numberSell.filter(item=> item.index !== sellAndIndex.index)
          this.$refs['divInput' + index].style.opacity = '100%'
        }
        // console.log('-----------------------')
        // this.numberSell.map(item=>{
        //   console.log(item)
        // })
        // console.log(this.numberSell)

        this.overPrice = 0
        this.numberSell.map(item=>{
          this.overPrice += item.value * Number(item.product.product.info.price)
        })
      }
    },
    openSell(){
      this.stepSell = 1
    },
    backOpenSell(){
      this.stepSell = 0
      this.stepAdress = 0
    },
    openAdress(){
      this.stepAdress = 1
      //this.sellOnServer(item)
    },
    async sellOnServer(item, adress){
      const sell = await axios.post('http://localhost:5000/api/sells',{numbers:this.numberSell,sum:this.overPrice, status:this.statusSell, method:item, adress:adress, login:localStorage.userLogin})
        
      this.stepSell = 0

      //localStorage.token = sell.data.токен
      //console.log(sell.data)
    },
    plusNumber(item, index){
      let value = Number(this.$refs['numberInput' + index].value)
      //console.log(value)
      if(item == '+'){
        value++
        this.$refs['numberInput' + index].value = `${value}`
      }
      else{
        value--
        this.$refs['numberInput' + index].value = `${value}`
      }
    },
    opneFiler(){
      if(this.opFilter == 1){
        this.opFilter--
        this.$refs.filter.style.width = '100px'
        this.$refs.imgOpenFilter.style.transform = 'rotate(360deg)'
        
        this.$refs.productsCard.style.gridTemplateColumns = 'repeat(5, 1fr)'
        this.$refs.productsCard.style.gridTemplateAreas = `"images images images images images" "search nameCatagory nameCatagory nameCatagory nameCatagory"`
        this.$refs.productsCard.style.marginLeft = '100px'


        this.$refs.basket.style.marginLeft = '100px'
        this.$refs.productCardNow.style.marginLeft = '100px'
      }
      else{
        this.opFilter++
        this.$refs.filter.style.width = '340px'
        this.$refs.imgOpenFilter.style.transform = 'rotate(180deg)'

        this.$refs.productsCard.style.gridTemplateColumns = 'repeat(4, 1fr)'
        this.$refs.productsCard.style.gridTemplateAreas = `"images images images images" "search nameCatagory nameCatagory nameCatagory"`
        this.$refs.productsCard.style.marginLeft = '340px'

        
        this.$refs.basket.style.marginLeft = '340px'
        this.$refs.productCardNow.style.marginLeft = '340px'
      }
    },
    async searchProduct(){

      let selectProduct = null
      
      for(let i=0; i < this.products.length; i++){

        if(this.products[i].info.name.toLowerCase().search(this.searchItem.toLowerCase()) == 0){
          selectProduct = this.products[i]
        }
      }
      if(this.searchItem == ''){
        this.getProducts()
      }
      //console.log(selectProduct, this.searchItem)
      if(selectProduct){
        this.products = []
        this.products.push(JSON.parse(JSON.stringify(selectProduct)))
      }
      else{
        this.getProducts()
      }
    },
    clearSearchItem(){
      this.searchItem = ''
      this.getProducts()
    },
    toBasket(){
      this.productNow = 2
      localStorage.stepShop = this.productNow
    },
    toShop(){
      this.productNow = 0
      localStorage.stepShop = this.productNow

      this.nameCatagory = 'Все товары'
      this.getProducts()
    },
    async getCatagory(){
      const catagorys = await axios.get('http://localhost:5000/api/catagory')
      this.catagorys = catagorys.data 
    },
    async openCatagory(item){
      this.nameCatagory = item
      const catagoryItem = await axios.post('http://localhost:5000/api/getCatagory',{nameCatagory:this.nameCatagory})
      this.products = catagoryItem.data
    },
  },
  watch:{

  },
  computed:{
    
  },
  mounted() {
    //this.productNow = 0
    this.getProducts()
    this.getCatagory()

    
    //console.log(this.userBasket)
  },
  async created() {
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
      }).then(item=> {
        //this.userBasket.push(item.data.user.basket)
        this.userBasket = item.data.user.basket
        
        localStorage.userRole = item.data.user.roles
        localStorage.userLogin = item.data.user.login

         if(item.data.user.adress.length === 0){
           this.userAdress = []
          }       
          else {this.userAdress = item.data.user.adress}
      })
      
      this.$root.userGetInfo()
    }
  }
}
</script>

<style lang="scss">
$shadow:rgba(150,150,150,0.5);
$shadowIn:rgba(14,14,14,0.3);
$shadowOut:#42b983;
$colorText:rgb(50,50,50);

$breakpoints:(
  "phone": 360px,
  "tablet": 768px,
  "desktop": 1366px,
  "fullHD": 1920px
) !default;

*{
  padding:0;
  margin:0;
  font-family: Microsoft Sans Serif;
}
#app{
  //background-color:red;
}

.component_2{
  width:100%;
  display:flex;
  .filter{
    p{
      margin:15px 20px 15px 30px;
      width:200px;
    }
    .length{
      background:$shadowOut;
      padding:1px 3px 1px 3px;
      border-radius:3px;
      margin:0 0 0 -13px;
    }
    position:fixed;
    //position:absolute;
    width:100px;
    height:100%;
    background-color:$colorText;
    transition:1s;
    overflow:hidden;
    box-shadow:inset 0 -1px 3px 2px black;
    z-index:32;
    //@include media((display:none),());
    button{
      border-radius:5px;
      display:block;
      outline:0;
      margin:10px;
      background-color:transparent;
      transition:0.5s;
      padding:5px 10px 5px 10px;
      cursor:pointer;
      font-size:18px;
      border:none;
      color:#fff;
      &:hover{
        background-color:$shadowOut;
      }
    }
    .buttonFilter{
      display:flex;
      img{
        width:50px;
        height:50px;
      }
      &:nth-child(1){
        transform:rotate(270deg);
      }
    }
    .titleCatagory{
      margin:10px 0 10px 130px;
      color:$shadowOut;
      font-size:24px;
    }
    .catagory{
      width:340px;
      height:220px;
      overflow:hidden;
      overflow-y:auto;
      //background-color:#ff4848;
      background-color:rgba(150,150,150,0.3);
      box-shadow:inset -5px 0 3px 2px black;
      button{
        display:flex;
      }
      img{
        width:50px;
        height:50px;
      }
      &::-webkit-scrollbar{
        display:block;
        width: 8px;
        background-color: $colorText;
        box-shadow:inset -5px 0 3px 2px black;
      }
      &::-webkit-scrollbar-thumb{
        background-color:$shadowOut;
        border-radius:5px;
      }
      &::-webkit-scrollbar-track{
        background-color:rgba(150,150,150,0.3);
      }
    }
  }
  .products{
    margin-left:100px;
    display:grid;
    grid-template-columns:repeat(5,1fr);
    //grid-template-rows:repeat(10,1fr);
    transition:1s;
    grid-template-areas:"images images images images images"
    "search nameCatagory nameCatagory nameCatagory nameCatagory";
    $width:320px;
    $height:450px;

    //background-image:url('./background/backgroundProductCard.jpg');
    //background-color:rgba(150,150,150,1);
    .mainProducts{
      grid-area:images;
      
      img{
        transition:1s;
        width:100%;
        height:300px;
        object-fit:cover;
      }
    }
    .errors{
      position:absolute;
      background:#ff5959;
      color:#fff;
      width:320px;
      height:50px;
      border-radius:10px;
      margin:20px;
      box-shadow:0 0 5px 3px $shadowIn;
      text-align:center;
      animation: errors 1s forwards;
      p{
        text-shadow:1px 1px 2px #fff;
        margin:14px;
      }
    }
    .searchBlock{
      //position:absolute;
      grid-area:search;
      z-index:32;
      width:320px;
      margin:10px 0 10px 10px;
      border-radius:10px;
      box-shadow:0 0 2px 1px $shadowIn;
      input{
        width:240px;
        margin:20px 10px 20px 20px;
        background-color:transparent;
        font-size:18px;
        border:none;
        outline:0;
        color:$colorText;
        padding:2px 5px 2px 5px;
        transition:1s;
        border-bottom:1px solid $colorText;
        &:focus{
          color:#ffac59;
        }
        &::placeholder{
          color:$colorText;
        }
      }
      button{
        outline:0;
        background-color:transparent;
        height:20px;
        border:none;
        cursor:pointer;
        transition:0.5s;
        hr{
          width:20px;
          transform:rotate(140deg);
          border:1px solid $colorText;
          box-shadow:none;
          &:nth-child(2){
            transform:rotate(40deg);
            margin-top:-2px;
            position:absolute;
            
          }
        }
        &:active{
          hr{
            box-shadow:0 0 1px 1px $colorText;
          }
        }
      }
    }
    .nameCatagory{
      grid-area:nameCatagory;
      text-align:center;
      margin:25px 0 0 0;
      font-size:24px;
    }
    .card{
      width:320px;
      height:390px;
      border-radius:5px;
      background-color:#fff;
      margin:10px;
      box-shadow:0 0 3px 1px $shadowIn;
      transition:0.5s;
      z-index:31;
      text-align:center;
      position: relative;
      overflow:hidden;
      color:$colorText;
      &:hover{
        transform:scale(1.05);
        //background:#F2B063;
        .info{
          display:block;

          margin-top:-150px;
          opacity:100%;
          hr{
            width:250px;
          }
        }
      }
      
      .image{
        padding:0 0 0 0;
        width:60%;
        height:60%;
        margin:20px auto 10px auto;
        img{
          width:100%;
          height:100%;
          object-fit:cover;
        }
      }
      .hr{
        width:20%;
        margin:10px auto 10px auto;
        border:1px solid $colorText;
        box-shadow: 0 0 1px 1px $colorText;
        border-radius:10px;
      }
      .title{
        font-size:20px;
        margin-bottom:10px;
      }
      .price{
        font-size:20px;
        // &:before{
        //   content:'';
        //   position:absolute;
        //   border-radius:50%;
        //   width:1px;
        //   height:1px;
        //   margin:25px 0 0 -20px;
        //   box-shadow:10px -10px 3px 7px orange,
        //              10px -10px 3px 10px red;
        //   //margin-left:-10px;
        //   border-top-right-radius: 0px;
        //   transform: rotate(-45deg);
        //   animation: fires 0.8s linear infinite;
        //   transition:1s;
        // }
      }
      .info{
        text-align:left;
        transition:1s;
        background-color:$colorText;
        width:320px;
        height:210px;
        color:#fff;
        opacity:0%;
        overflow-y:auto;
        //display:none;
        hr{
          width:0;
          transition:1s;
        }
        position:absolute;
        margin-top:50px;
        .text{
          margin:10px;
          text-align:justify;
        }
        button{
          outline:0;
          background-color:#f3b75c;
          border:none;
          margin:10px;
          border-radius:10px;
          padding:5px 10px 5px 10px;
          font-size:16px;
          //box-shadow:0 0 5px 2px #f3b75c;
          color:$colorText;
          text-shadow:0 1px 5px #f3b75c;
          cursor:pointer;
          &:hover{
            box-shadow:0 0 5px 2px #f3b75c;
          }
          &:nth-child(3){
            margin:0 10px 30px 10px;
          }
        }
      }
    }
  }
  .oneProduct{
    margin-left:100px;
    transition:1s;
    font-size:28px;
    display:grid;
    grid-template-columns:1fr 1fr;
    grid-template-rows: repeat(6,1fr);
    grid-template-areas:"title title"
    "images price"
    "images buttons"
    "images info"
    "text text";
    .title{
      grid-area:title;
      align-self:end;
      margin:40px 40px 0 40px;
      height:80px;
    }
    .image{
      grid-area:images;
      width:400px;
      height:500px;
      padding:0 100px 0 100px;
      img{
        width:100%;
        height:100%;
        object-fit:cover;
      }
    }
    .price{
      grid-area:price;
      align-self:end;

      margin:30px 30px 0 0;
      height:80px;
      width:350px;
    }
    button{
      grid-area:buttons;
      align-self:start;

      font-size:20px;
      padding:5px 10px 5px 10px;
      outline:0;
      background-color:#ffa953;
      border:none;
      cursor:pointer;
      color:#fff;
      width:300px;
      height:80px;
      border-radius:10px;
      box-shadow:2px 3px 1px 1px $colorText;
    }
    .info{
      grid-area:info;
      list-style-type: none;
      hr{
        width:230px;
      }
    }
    .text{
      grid-area:text;
      margin:0 0 0 20px;
      hr{
        width:900px;
      }
    }
  }
  .basket{
    margin-left:100px;  
    transition:1s;
    .basketNone{
      font-size:28px;
      position:absolute;
      top:50%;
      left:30%;
      padding:0 10px 0 10px;
    }
    .conteyner{
     //display:flex;
     width:100%;
     height:100%;
     position:absolute;
     //display:grid;
      p{
        font-size:24px;
        margin:50px;
      }
      .image{
        position:fixed;
        right:0;
        width:300px;
        height:100%;
        img{
          width:100%;
          height:100%;
          object-fit:cover;
        }
      }
      .basketProduct{
        width:900px;
        //height:200px;
        margin:10px 0 10px 20px;
        //background:orange;
        border-radius:5px;
        box-shadow:0 0 3px 1px $shadowIn;
        display:flex;
        //grid-template-columns:repeat(2,1fr);
        .imageProduct{
          height:200px;
          width:150px;
          margin:0 5px 0 5px;
          img{
            width:100%;
            height:100%;
            object-fit:cover;
          }
          input[type="checkbox"]{
            position:absolute;
            margin:2px;
            width:20px;
            height:20px;
            cursor:pointer;
            border:none;
          }
        }
        .info{
          width:600px;
          p{
            font-size:18px;
            margin:0;
          }
          button{
            transition:0.5s;
            background:#fff;
            padding:10px 15px 10px 15px;
            border:1px solid $shadow;
            font-size:16px;
            border-radius:4px;
            cursor:pointer;
            &:hover{
              background:#ff6c6c;
              color:#fff;
            }
          }
          div{
            display:flex;
            input[type="number"]{
              width:70px;
              height:20px;
              padding:5px 10px 5px 10px;
              font-size:18px;
              border:1px solid $shadow;
              outline:0;
              border-radius:5px;
              margin:3px;
              transition:0.5s;
              &:focus{
                border:1px solid black;
              }
              -moz-appearance: textfield;
              &::-webkit-inner-spin-button{
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                margin: 0;
              }
            }
            button{
              width:30px;
              height:32px;
              margin:3px 0 5px 0;
              border:1px solid $shadow;
              padding:2px;
            }
          }
        }
      }
      .buttonSell{
        margin:10px 0 0 940px;
        background:transparent;
        border:none;
        cursor:pointer;
        box-shadow:0 0 4px 2px $shadow;
        transition:0.5s;
        font-size:18px;
        padding:10px 15px 10px 15px;
        border-radius:5px;
        position:fixed;
        top:0%;
        &:hover{
          background:black;
          color:#fff;
        }
        
      }
      
    }
    .openSell{
      position:absolute;
      width:100%;
      height:100%;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(15px);
      
      .sell{
        width:700px;
        height:300px;
        background:#fff;
        box-shadow:0 0 5px 2px $shadow;
        //border-radius:10px;
        margin:50px;
        overflow:hidden;

        text-align:center;
        display:grid;
        //grid-template-columns:1fr 1fr;

        p{
          margin:5px;
        }
        div{
          width:200px;
          height:100px;
          justify-self:center;

          border:1px solid $shadow;
          padding:5px;
          cursor:pointer;
          transition:1s;
          &:hover{
            background:rgb(50,50,50);
            color:#fff;
          }
          &:nth-child(1){

          }
          &:nth-child(2){
            
          }
        }
        button{
          background:transparent;
          border:none;
          box-shadow:0 0 3px 1px $shadow;
          outline:0;
          cursor:pointer;
          transition:0.5s;
          &:hover{
            background:rgb(50,50,50);
            color:#fff;
          }
        }
      }
      .adress{
        width:700px;
        height:300px;
        background:#fff;
        box-shadow:0 0 5px 2px $shadow;
        //border-radius:10px;
        margin:50px;
        overflow:hidden;
        overflow-y:scroll;
        //text-align:center;
        display:grid;
        &::-webkit-scrollbar{
          display:block;
          width: 5px;
          background-color: $colorText;
          box-shadow:inset -5px 0 3px 2px black;
        }
        &::-webkit-scrollbar-thumb{
          background-color:$shadowOut;
          border-radius:5px;
        }
        &::-webkit-scrollbar-track{
          background-color:rgba(150,150,150,0.3);
        }
        div{
          padding:0 5px 0 5px;
          margin:3px;
          width:200px;
          height:100%;
          border:1px solid $shadow;
          justify-self:center;
          cursor:pointer;
          transition:1s;
          &:hover{
            background:black;
            color:#fff;
          }
        }
        ul{
          list-style-type: none;
          margin:2px 0 2px 20px;
        }
        p{
          text-align:start;
          margin:5px 0 5px 0;
        }
        button{
          //background:transparent;
          border:none;
          box-shadow:0 0 3px 1px $shadow;
          outline:0;
          cursor:pointer;
          transition:0.5s;
          &:hover{
            background:rgb(50,50,50);
            color:#fff;
          }
        }
      }
      
    }
  }
  
}
::-webkit-scrollbar { 
  display: none;
  //width:2px; 
}

@keyframes fires {
  0%{
    box-shadow:10px -10px 5px 7px orange,
               10px -10px 5px 10px red;
  }
  100%{
    box-shadow:10px -10px 3px 7px orange,
               10px -10px 3px 10px red;
  }
}

@keyframes errors {
  0%{
    opacity:0%;
  }
  100%{
    opacity:100%;
  }
}

@media screen and (max-width: 320px){
  
}
@media screen and (max-width: 768px){
  
}
@media screen and (max-width: 1024px){
  
}
@media screen and (max-width: 1920px){
  
}
</style>
