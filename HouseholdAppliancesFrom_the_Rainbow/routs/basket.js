const {Router} = require('express')
const config = require('config')
const router = Router()
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const buffer = require('buffer')


const User = require('../models/users')
const Product = require('../models/product')
const Sell = require('../models/sells')
const { isError } = require('util')

router.post('/addProductToBasket', async (req, res)=>{
    try{
        const {login, product} = req.body
        
        //const productAgain = await Product.find({'info':product.info})
        const productUserInBasket = await User.find({'login':login,'basket.product.info.name':product.info.name,'basket.product.info.model':product.info.model})
        if(productUserInBasket.length == 0){
            const addProductToBasket = await User.findOneAndUpdate({login}, {$push:{basket:{product}}},{upsert:true})
            
            if(true){
                const addProductToBasketTwo = await User.findOneAndUpdate({login}, {$push:{basket:{product}}},{upsert:true})
                const removeProductToBasket = await User.findOneAndUpdate({login}, {$pop:{basket:1}},{upsert:true})
        
                const token = jwt.sign(
                {
                    user: addProductToBasketTwo,
                },
                config.get('jwtSecret'),
                {expiresIn: '8h'},
                { algorithm: 'HS256'} 
                )    
                res.status(201).json({сообщение:'Товар добавлен в корзину',токен:token})
            }
        }
        else{
           return res.status(400).json({message:'такой товар уже существует в вашей корзине'})
        }
    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

router.post('/deleteProductToBasket', async (req,res)=>{
    try{
        const {login, product} = req.body

       const deleteProduct = await User.findOneAndUpdate({login},{$pull:{basket:product}},{upsert:true})
       if(true){
        const deleteProduct2 = await User.findOneAndUpdate({login},{$pull:{basket:product}},{upsert:true})

        const token = jwt.sign(
            {
                user: deleteProduct2,
            },
            config.get('jwtSecret'),
            {expiresIn: '8h'},
            { algorithm: 'HS256'} 
            )    
            res.status(201).json({сообщение:'Товар удален из корзины',токен:token})
       }
       //console.log(deleteProduct)
    }
    catch(e){
        res.status(500).json({error:e.message}) 
    }
})

router.post('/sells', async (req, res)=>{
    try{
        const { numbers, sum, status, method, adress, login} = req.body
        
        let date = new Date().toJSON().replace(/T/g,' Время:')
        //console.log(method)
        if(method == 'Доставка на дом'){
            let newSum = sum + 10
            const addSell = new Sell({status:status, method:method,adress:adress, date:date, user:login, number:numbers, sum:newSum})
            await addSell.save() 
           
            //user + token
            
            res.status(201).json({message:'Покупка запрошена'})
            
            
        }
        else{
            const addSell = new Sell({status:status, method:method, adress:adress, date:date, user:login, number:numbers, sum:sum})
            await addSell.save() 
            //res.status(201).json({message:'Покупка запрошена'})
            //user + token
            
            res.status(201).json({message:'Покупка запрошена'})
            
        }


    }
    catch(e){
        res.status(500).json({error:e.message}) 
    }
})

module.exports = router 
