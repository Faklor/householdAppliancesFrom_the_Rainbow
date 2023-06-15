<template>
    <div class="auth" ref="backgroundAuth">
        
        <!---->
        <div class="modalLogin" v-if="avtorithation == 'true'">
            <div class="buttons">
                <button @click="openLR('login')" :class="{active:isActiveButton1}">Вход</button>
                <button @click="openLR('register')" :class="{active:isActiveButton2}">Регистрация</button>
            </div>
            <div class="login" v-if="this.LR == 0">
                <h1 class="titleLogin">Авторизация</h1>
                <input v-model="login" name="login" type="login" placeholder="Логин">  
                <input v-model="password" name="password" type="password" placeholder="Пароль">
                <button id="sendLog" @click="sendLoginAndPassword">Войти</button>
                <p style="text-align:center;">{{errors}}</p>
            </div>
            <div class="register" v-if="this.LR == 1">
                <h1 class="titleLogin">Регистрация</h1>
                <input v-model="login" name="login" type="login" placeholder="Логин">  
                <input v-model="email" name="email" type="email" placeholder="Почта">
                <input v-model="password" name="password" type="password" placeholder="Пароль">
                <button id="sendLog" @click="sendRegister">Зарегистрироваться</button>

                <p style="text-align:center;">{{errors}}</p>
                <div v-for="error in errorsMas" :key="error">
                    <p style="text-align:center;">{{errors}}</p>
                </div>
            </div>
            <!---->
            
        </div>  
        <!---->
        <!---->
        <div class="userAuth" v-if="avtorithation == 'false'">
            <div class="userMenu">
                <img :src="user.photo">
                <h1> {{user.login}} </h1>
                <div class="nav">
                    <button @click="openProfile" :class="{active:isActive1}"> Данные </button>
                    <button @click="openAdress" :class="{active:isActive2}"> Адреса </button>
                    <button @click="openSells" :class="{active:isActive3}"> Покупки </button>
                    <button @click="openComments" :class="{active:isActive4}"> Оценить сайт </button>
                    <button @click="backToGuest"> Выйти из аккаунта </button>
                </div>
            </div>
            <div class="userContent" v-if="userStep == 0">
            <form @submit.prevent="uploadUser" method="POST">
                <p> Ваши данные </p><br>
                
                <p v-if="stepRef == 0"> Имя: {{user.name}} </p>
                    <p v-if="stepRef == 1">Имя:<input v-model="user.name" name="name" type="login" :placeholder="user.name"></p>

               
                <p v-if="stepRef == 0"> Почта: {{user.email}} </p>
                    <p v-if="stepRef == 1">Почта:<input v-model="user.email" name="email" type="login" :placeholder="user.email"></p>

                <p v-if="stepRef == 0"> Пол: {{user.pol}} </p>
                    <p v-if="stepRef == 1">Пол:<input v-model="user.pol" name="pol" type="login" :placeholder="user.pol"></p>

                <p v-if="stepRef == 0"> Дата рождения: {{user.dataBirthday}} </p>
                    <p v-if="stepRef == 1">Дата рождения:<input v-model="user.dataBirthday" name="dataBirthday" type="date" :placeholder="user.dataBirthday"></p>

                <!--<h1> Адресс: {{user.adress}} </h1>-->
                <p v-if="stepRef == 0"> Телефон: {{user.phone}} </p>
                    <p v-if="stepRef == 1">Телефон:<input v-model="user.phone" name="phone" type="login" :placeholder="user.phone"></p>
                <br>    
                <button v-if="stepRef == 0" @click="plusStepRef1"> Редактировать данные </button>
                <button v-if="stepRef == 0" @click="plusStepRef2"> Редактировать фото </button>
                <button v-if="stepRef == 1" @click="minusStepRef"> Назад </button>
                <input v-if="stepRef == 1" id="sendLog" type="submit" class="send" value="Сохранить" @click="refUser">
            </form>
            <form @submit.prevent="uploadUser" method="POST" enctype="multipart/form-data">
                <p v-if="stepRef == 2"> Имя: {{user.name}} </p>
                <p v-if="stepRef == 2"> Почта: {{user.email}} </p>
                <p v-if="stepRef == 2"> Пол: {{user.pol}} </p>
                <p v-if="stepRef == 2"> Дата рождения: {{user.dataBirthday}} </p>
                <p v-if="stepRef == 2"> Телефон: {{user.phone}} </p>
                <button v-if="stepRef == 2" @click="minusStepRef"> Назад </button>
                
                <input v-if="stepRef == 2" type="file" placeholder="Выберите фото" ref="file" @change="handleFileUpload">
                <input v-if="stepRef == 2" id="sendLog" type="submit" class="send" value="Сохранить" @click="fileLoad">
                
            </form>
            </div>
            <div class="userAdress" v-if="userStep == 1">
                
                <p v-if="adress.length == 0" style="margin-top:20px;">Адреса отсутствуют</p><br>
                <div v-for="(item, index) in adress" v-bind:key="item" v-if="adress.length > 0" class="adressNow">
                    <p>Aдрес №{{index + 1}}</p>
                    <ul>
                        <li>{{item.adressNew.country}}</li>
                        <li>{{item.adressNew.city}}</li>
                        <li>ул.{{item.adressNew.street}}</li>
                        <li>дом-{{item.adressNew.house}}</li>
                        <li>кв-{{item.adressNew.flat}}</li>
                    </ul>
                    <button @click="deleteAdress(item)">Удалить</button>
                </div>

                <button @click="adressSteps">Добавить адрес</button>
                    <div class="adressAdd" v-if="adressStep === 1">
                        <!--<button @click="endAddAdress"><hr><hr></button>-->

                        <input v-model="newAdress.country" placeholder="Страна">
                        <input v-model="newAdress.city" placeholder="Город">
                        <input v-model="newAdress.street" placeholder="Улица">
                        <input v-model="newAdress.house" placeholder="Дом">
                        <input v-model="newAdress.flat" placeholder="Квартира">

                        <button @click="addAdress">Добавить</button>
                    </div>
            </div>
            <div class="userSells" v-if="userStep == 2">
                <p>Покупки</p>
                <div v-for="item1 in purchases" :key="item1" class="sell">
                    <div v-for="item in item1" :key="item">
                        <!--<p>Код покупки:{{item._id}}</p>-->
                        <p>Статус:{{item.status}}</p> 
                        <p>Товар:</p>
                        <div v-for="product in item.number" :key="product">
                            <p>Количество:{{product.value}}</p>
                            <p>Название:{{product.product.product.info.name +' '+ product.product.product.info.manufacturer +' '+ product.product.product.info.model}}</p>
                        </div>
                        <p>Дата:{{item.date}}</p>
                        <p>Прием товара:{{item.method}}</p>
                        <p v-if="item.adress != 'Прием товара в магазине'">Aдрес:
                            <div>
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
            <div class="userSells" v-if="userStep == 3">
                <div v-if="nowCommnet.comment.length == 0">
                    <textarea  v-model="comment" placeholder="Оставьте комментарий"/>
                    <p>Выберите оценку</p>
                    <div>
                        <button @click="select('Смешно 😂')" :class="{active:isActiveComment1}">😂</button>
                        <button @click="select('Неочень 😒')" :class="{active:isActiveComment2}">😒</button>
                        <button @click="select('Нормально 👍')" :class="{active:isActiveComment3}">👍</button>
                        <button @click="select('Отлично 😊')" :class="{active:isActiveComment4}">😊</button>
                        <button @click="select('Превосходно 😍')" :class="{active:isActiveComment5}">😍</button>
                    </div>
                    <button @click="addComment">Оценить сайт</button>
                </div>
                <div v-if="nowCommnet.comment.length != 0">
                    <p>Ваш отзыв о нашем сайте</p>
                    <div v-for="comment in nowCommnet" :key="comment">
                        <div v-for="item in comment" :key="item">   
                            <p>Оценка - {{' '+item.appraisal}}</p>
                            <p>Комментарий - {{' '+item.comment}}</p>
                        </div>
                    </div>
                    <button @click="deleteCommnet">Удалить</button>
                </div>
            </div>
        </div>  
        <!---->
    </div>
</template>

<script>
import axios from 'axios'; 

export default {
  data() {
      return {
        login:null,
        password:null,
        email:null,
        role:null,
        visibleMenu:true,
        filePhoto:'',
        avtorithation:localStorage.auth,
        stepRef:0,
        user:{
            email:'',
            login:'',
            name:'',
            pol:'',
            dataBirthday:'',
            phone:'',
            photo:[]
        },
        errors:null,
        errorsMas:[],
        userStep:0,
        adress:[],
        newAdress:{
            country:'',
            city:'',
            street:'',
            house:'',
            flat:'',
        },
        adressStep:0,
        isActive1:false,
        isActive2:false,
        isActive3:false,
        isActive4:false,
        purchases:[],
        comment:'',
        appraisal:'',
        nowCommnet:[],
        LR:0,
        isActiveButton1:true,
        isActiveButton2:false,
        //--------------------
        isActiveComment1:false,
        isActiveComment2:false,
        isActiveComment3:false,
        isActiveComment4:false,
        isActiveComment5:false,
        //---------------------

      }
  },
  methods: {
    async sendLoginAndPassword(){
        const info = await axios.post('http://localhost:5000/api/login', {login: this.login, password: this.password}).catch(error=>{
            this.errors = 'Неправильный пароль или логин'
        })
        //console.log(info)
        //this.error = info.data

        localStorage.token = info.data.token
        localStorage.auth = 'false' 
        this.errors = info.data.message
        this.$router.push('/')
        
    },
    async sendRegister(){
        const info = await axios.post('http://localhost:5000/api/register', {login: this.login, email: this.email, password: this.password}).catch(error=>{
            //console.log(error.response.data.сообщение, error.response.data.ошибки)
             this.errors = error.response.data.сообщение
            this.errorsMas = [] 
            error.response.data.ошибки.map(item=>{
                this.errorsMas.push(item.msg)
            })
            this.error = info.data
        })
        //this.error = info.data
    },
    async backToGuest(){    
        localStorage.token = 'false'
        localStorage.auth = 'true'  
        localStorage.userRole = null
        this.$router.push('/')
        localStorage.userLogin = 'Войдите'
        localStorage.userPhoto = './assets/user.png'
    },
    async plusStepRef1(){
        this.stepRef = 1
    },
    async plusStepRef2(){
        this.stepRef = 2
    },
    async minusStepRef(){
        this.stepRef = 0
    },
    async refUser(){
        const refInfo = await axios.post('http://localhost:5000/api/updateUser',{
            email:this.user.email, 
            login:this.user.login, 
            fullName:this.user.name, 
            pol:this.user.pol,  
            dateBirthday:this.user.dataBirthday, 
            numberPhone:this.user.phone
        })
        localStorage.token = refInfo.data.токен
        this.$options.created()
        
    },
    async fileLoad(){
        let formData = new FormData()
        formData.append('file', this.filePhoto, this.user.login)

        const photoUser = await axios.post('http://localhost:5000/api/upload', formData)
        //this.user.photo = require(`../assets/fotoUser/${photoUser.data}`)
        localStorage.token = photoUser.data.токен
        //this.$options.created()
      location.reload()

    },
    handleFileUpload(){
        const file = this.$refs.file.files[0]
        this.filePhoto = file
    },
    openProfile(){
        this.userStep = 0
        this.isActive1 = true

        this.isActive2 = false
        this.isActive3 = false
        this.isActive4 = false
    },
    openAdress(){
        this.userStep = 1
        this.isActive2 = true

        this.isActive1 = false
        this.isActive3 = false
        this.isActive4 = false
    },
    openSells(){
        this.userStep = 2
        this.isActive3 = true
        
        this.isActive1 = false
        this.isActive2 = false
        this.isActive4 = false
    },
    openComments(){
        this.userStep = 3
        this.isActive4 = true
        
        this.isActive1 = false
        this.isActive2 = false
        this.isActive3 = false
    },
    async addAdress(){
        const userNewAdress = await axios.post('http://localhost:5000/api/addAdress', {login:localStorage.userLogin, adress:this.newAdress})
        localStorage.token = userNewAdress.data.токен
        
        location.reload()
        //this.$options.created()
    },
    async deleteAdress(item){
        const deleteAdress = await axios.post('http://localhost:5000/api/deleteAdress', {login:localStorage.userLogin, adress:item})
        localStorage.token = deleteAdress.data.токен
        
        location.reload()
    },
    adressSteps(){
        if(this.adressStep == 1){
            this.adressStep--
        }
        else{
            this.adressStep++
        }
    },
    async getSells(){
        const sell = await axios.post('http://localhost:5000/api/getSells',{user:localStorage.userLogin})
        this.purchases = sell.data
    },
    select(smyle){
        this.appraisal = smyle

        if(smyle == 'Смешно 😂'){
            this.isActiveComment1 = true
            
            this.isActiveComment2 = false
            this.isActiveComment3 = false
            this.isActiveComment4 = false
            this.isActiveComment5 = false
        }
        else if(smyle == 'Неочень 😒'){
            this.isActiveComment2 = true
            
            this.isActiveComment1 = false
            this.isActiveComment3 = false
            this.isActiveComment4 = false
            this.isActiveComment5 = false
        }
        else if(smyle == 'Нормально 👍'){
            this.isActiveComment3 = true
            
            this.isActiveComment2 = false
            this.isActiveComment1 = false
            this.isActiveComment4 = false
            this.isActiveComment5 = false
        }
        else if(smyle == 'Отлично 😊'){
            this.isActiveComment4 = true
            
            this.isActiveComment2 = false
            this.isActiveComment3 = false
            this.isActiveComment1 = false
            this.isActiveComment5 = false
        }
        else if(smyle == 'Превосходно 😍'){
            this.isActiveComment5 = true
            
            this.isActiveComment2 = false
            this.isActiveComment3 = false
            this.isActiveComment4 = false
            this.isActiveComment1 = false
        }
       
    },
    async addComment(){
        const comment = await axios.post('http://localhost:5000/api/addComments',{user:localStorage.userLogin, comment:this.comment, appraisal: this.appraisal})
        //console.log(comment.data)
        location.reload()

    },
    async getComment(){
        const comment = await axios.post('http://localhost:5000/api/getComment',{user:localStorage.userLogin})
        this.nowCommnet = comment.data
    },
    openLR(item){
        if(item == 'login'){
            this.LR = 0
            this.isActiveButton1 = true
            this.isActiveButton2 = false
        }
        else if(item == 'register'){
            this.LR = 1
            this.isActiveButton1 = false
            this.isActiveButton2 = true
            this.errors = ''
        }
    },
    async deleteCommnet(){
        const {data} = await axios.post('http://localhost:5000/api/deleteComments',{user:localStorage.userLogin})
        location.reload()

    },
    // endAddAdress(){
    //     this.adressStep--
    // },
  },
  mounted() {
      this.openProfile()
      this.getSells()
      this.getComment()
      if(this.avtorithation == 'false'){
          this.$refs.backgroundAuth.style.background = '#fff'
      }
      //console.log(this.adress)
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
      })
      localStorage.userRole = res.data.user.roles
      localStorage.userLogin = res.data.user.login
      
      //console.log(res.data.user.email)
        //info user
      this.user.email = res.data.user.email
      this.user.login = res.data.user.login
      if(res.data.user.fullName == null)     {this.user.name = 'Данные не заполнены'}else {this.user.name = res.data.user.fullName}
      if(res.data.user.adress.length === 0)       {this.adress = []}       else {this.adress = res.data.user.adress}
      if(res.data.user.pol == null)          {this.user.pol = 'Данные не заполнены'}          else {this.user.pol = res.data.user.pol}
      if(res.data.user.dateBirthday === null) {this.user.dateBirthday = 'Данные не заполнены'} else {this.user.dataBirthday = res.data.user.dateBirthday}
      if(res.data.user.numberPhone == null)  {this.user.phone = 'Данные не заполнены'}        else {this.user.phone = res.data.user.numberPhone}
      //if(res.data.user.purchases == null)  {this.purchases = 'Данные не заполнены'}        else {this.purchases = res.data.user.purchases}

      let photo = res.data.user.photo
      if(photo.length == 0)  {
        this.user.photo = require('../assets/user.png')
        localStorage.userPhoto = './assets/user.png'
      }        
      else{
        this.user.photo = require(`../assets/fotoUser/${photo[0].filename}`)
        localStorage.userPhoto = `./assets/fotoUser/${photo[0].filename}`
      }
      this.$root.userGetInfo()
      
    }
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
    font-family: Microsoft Sans Serif;

}


.auth{
    display:grid;
    background:#5954b6;
    height:100%;
    width:100%;
    position:fixed;
    .modalLogin {
        width:600px;
        height:600px;
        background:#fff;
        align-self:center;
        justify-self:center;
        //margin:100px 0 0 0;
        border-radius:5px;
        overflow:hidden;
        box-shadow:0 0 3px 1px black;
        .buttons{
            display:flex;
            button{
                width:100%;
                height:80px;

                background:$shadowOut;
                border:none;
                outline:0;
                //border:1px solid black;
                cursor:pointer;
                letter-spacing: 5px;
               color:#fff;
            }
            .active{
                background:#fff;
                opacity:70%;
                color:black;
            }
        }
        .login{
            //background:#fff;
            display:grid;
            h1{
                align-self:center;
                justify-self:center;
                margin:30px 0 10px 0;
            }
            input{
                width:300px;
                outline:0;
                font-size:20px;
                border:none;
                border-bottom:1px solid black;
                margin:10px 0 10px 0;
                padding:5px 10px 5px 10px;
                align-self:center;
                justify-self:center;
                transition:0.5s;
                &:focus{
                    background:$shadowOut;
                    color:#fff;
                    &::placeholder{
                        color:#fff;
                    }
                }
                
            }
            button{
                outline:0;
                border:none;
                padding:15px 20px 15px 20px;
                font-size:18px;
                cursor:pointer;
                margin:10px;
                width:300px;
                align-self:center;
                justify-self:center;
                color:#fff;
                background:$shadowOut;
                border:1px solid black;
                transition:0.3s;
                box-shadow:1px 1px 3px 1px black;
                &:hover{
                    box-shadow:none;
                    color:black;
                    background:#fff;
                }
            }
        }
        .register{
            //background:red;

            display:grid;
             h1{
                align-self:center;
                justify-self:center;
                margin:30px 0 10px 0;
            }
            input{
                width:300px;
                outline:0;
                font-size:20px;
                border:none;
                border-bottom:1px solid black;
                margin:10px 0 10px 0;
                padding:5px 10px 5px 10px;
                align-self:center;
                justify-self:center;
                transition:0.5s;
                &:focus{
                    background:$shadowOut;
                    color:#fff;
                    &::placeholder{
                        color:#fff;
                    }
                }
                
            }
            button{
                outline:0;
                border:none;
                padding:15px 20px 15px 20px;
                font-size:18px;
                cursor:pointer;
                margin:10px;
                width:300px;
                align-self:center;
                justify-self:center;
                color:#fff;
                background:$shadowOut;
                border:1px solid black;
                transition:0.3s;
                box-shadow:1px 1px 3px 1px black;
                &:hover{
                    box-shadow:none;
                    color:black;
                    background:#fff;
                }
            }
        }
    }
    .userAuth{
        display:flex;
        //grid-template-columns:1fr 1fr;
        overflow:auto;
        .userMenu{
            //display:grid;
            border-right:1px solid $shadow;
            text-align:center;
            width:350px;
            height:100%;
            position:fixed;
            .nav{
                margin:50px 0 0 0;
            }
            img{
                justify-self:center;
                align-self:center;
                margin:20px 0 0 0;
                border-radius:300px;
                width:250px;
                height:250px;
                object-fit:cover;
            }
            h1{
                margin:5px 0 30px 0;
                font-size:32px;
            }
            .active{
                background:$shadowOut;
                opacity:70%;
                color:#fff;
            }
            button{
                margin:0;
                border-radius:0;
                background:transparent;
                color:black;
                box-shadow:none;
                transition:0.5s;
                width:100%;
                height:50px;
                border:none;
                cursor:pointer;
                font-size:16px;
                &:hover{
                    background:$shadowOut;
                    opacity:70%;
                    color:#fff;
                }
                &:nth-child(5){
                    &:hover{
                        background:#ff6c6c;
                        opacity:70%;
                    }
                }
               
            }
        }
        .userContent{
            font-size:24px;
            margin:20px 0 0 370px;
            button{
                border:none;
                outline:0;
                background:$shadowOut;
                color:#fff;
                padding:10px 15px 10px 15px;
                cursor:pointer;
                transition:0.4s;
                margin:5px;
                box-shadow:0 0 2px 1px black;
                &:hover{
                    background:transparent;
                    color:black;
                }
            }
        }
        .userAdress{
            font-size:24px;
            margin:0 0 0 370px;
            .adressNow{
                border:1px solid $shadow;
                padding:5px 10px 5px 10px;
                margin:2px;
            }
            .adressAdd{
                display:grid;
                input{
                    border:none;
                    border-bottom:1px solid black;
                    padding:5px 5px 2px 5px;
                    font-size:18px;
                    margin:2px;
                    outline:0;
                    &:nth-child(5){
                        margin-bottom:20px;
                    }
                }
            }
            ul{
                list-style-type: none;
                margin:2px 0 2px 20px;
            }
            button{
                margin-top:5px;
                outline:0;
                border:none;
                box-shadow:0 0 2px 1px black;
                padding:10px 15px 10px 15px;
                cursor:pointer; 
                &:hover{
                    background:transparent;
                    color:black;
                }
            }
        }
        .userSells{
            font-size:20px;
            margin:20px 0 0 370px;
            //overflow:auto;
            //width:100%;
            //height:100%;
            .sell{
                div{
                    box-shadow:0 0 3px 1px $shadow;
                    padding:30px 35px 30px 35px;
                    margin:10px 0 10px 0;
                    div{
                        padding:10px;
                        margin: 0 0 0 30px;
                        border:none;
                        box-shadow:none;
                    }
                }
            }
            button{
                padding:10px 20px 10px 20px;
                border:none;
                box-shadow: 0 0 3px 1px black;
                cursor:pointer;
                margin:5px;
                &:hover{
                    background:$shadow;
                    color:#fff;
                }
            }
            .active{
                background:$shadowOut;
                opacity:70%;
                color:black;
            }
        }
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