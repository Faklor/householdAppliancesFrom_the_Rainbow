const {Router} = require('express')
const config = require('config')
const router = Router()
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const buffer = require('buffer')


const User = require('../models/users')
const Product = require('../models/product')

router.get('/catagory', async (req, res) => {
    try{

        const catagory = await Product.aggregate([{
            $group:{
                _id:'$info.catagory',
            }
        }])
        res.send(catagory) 

    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})

router.post('/getCatagory', async (req, res) => {
    try{
        const {nameCatagory} = req.body
       
        const getCatagory = await Product.find({'info.catagory':nameCatagory})
        res.status(201).json(getCatagory)
        //console.log(getCatagory)
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})

module.exports = router 
