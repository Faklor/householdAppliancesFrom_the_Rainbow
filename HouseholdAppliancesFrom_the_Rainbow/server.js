const express = require('express')
const mongoose  = require('mongoose')
const config = require('config')
const cors = require('cors')
const port = process.env.port || 5000

const app = express()
// понимание json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// обход проверки безопасности
app.use(cors())

const routeAuth = require('./routs/auth')
const routeAdmin = require('./routs/admin')
const routeBasket = require('./routs/basket')
const routeFilter = require('./routs/filter')


app.use('/api', routeAuth)
app.use('/api', routeAdmin)
app.use('/api', routeBasket)
app.use('/api', routeFilter)


const start = async () => {
    try{
        await mongoose.connect(config.get('connectURLmongo'),{
            useNewUrlParser:true,
            useUnifiedTopology:true,
 			useCreateIndex:true,
            useFindAndModify: false
        }) 
        app.listen(port, ()=> { console.log(`Server started on port: ${port}`) })
        app.get('/',async (req, res)=>{
        })
    }
    catch(e){
        console.log('Server invalid', e.message)
        process.exit()
    }
}

start()