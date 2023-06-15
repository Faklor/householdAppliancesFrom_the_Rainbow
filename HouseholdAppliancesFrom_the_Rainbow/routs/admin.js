const {Router} = require('express')
const config = require('config')
const router = Router()
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const buffer = require('buffer')


const User = require('../models/users')
const Product = require('../models/product')
const Sell = require('../models/sells')
const Comment = require('../models/comments')

//select allUsers
router.get('/allUsers', async (req, res)=>{
    try
    {
        const allUsers = await User.find({})
        res.json(allUsers)
    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

//update foto
const fileFilter = (req, file, cb)=>{
    const typeFile = ['image/jpeg','image/jpg','image/png']
    if(!typeFile.includes(file.mimetype)){
        const error = new Error('Error file')
        error.code = "INCORRECT_FILETYPE"
        return cb(error, false)
    } 
    cb(null, true)
} 
const storage = multer.diskStorage({
    destination: './vue/hafr/src/assets/fotoUser',
    filename: function(_req, file, cb){

      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname) + '.' + 'jpg');
    } 
});
const upload = multer({
    storage: storage,
    fileFilter,
    limits:{
        fileSize:5000000
    },
})
router.post('/upload', upload.single('file'),async (req, res)=>{
    const photo = req.file
    let login = photo.originalname
    //const filetype = photo.mimetype.split('/')[1]
    //console.log(photo)
    const photoSet = await User.findOneAndUpdate({login}, [{$set:{photo}}],{upsert:true})
    //res.json(photoSet)
    //res.json(path.join(`${photo.filename}`))
    //let photoName = path.join(`${photo.filename}`)
    
    fs.unlink(path.join(__dirname, `../vue/hafr/src/assets/fotoUser/${photoSet.photo.filename}`),(err)=>{})
    if(true){
        const photoSetTwo = await User.findOneAndUpdate({login}, [{$set:{photo}}],{upsert:true})
        const token = jwt.sign(
            {
                user: photoSetTwo,
            },
            config.get('jwtSecret'),
            {expiresIn: '8h'},
            { algorithm: 'HS256'} 
            
        )
        res.status(201).json({сообщение:'Данные пользователя обновлены',токен:token})
    }
})


//update users
router.post('/updateUser', async (req, res)=>{
    try
    {
        const {email, login, fullName, pol,  dateBirthday, numberPhone} = req.body
        
        let userSet = await User.findOneAndUpdate({login},[{$set:{email, fullName, pol, dateBirthday, numberPhone}}],{upsert:true})
        if(true){
            const user = await User.findOneAndUpdate({login},[{$set:{email, fullName, pol, dateBirthday, numberPhone}}],{upsert:true})
            const token = jwt.sign(
                {
                    user: user,
                    photo: User.photo,
                },
                config.get('jwtSecret'),
                {expiresIn: '8h'},
                { algorithm: 'HS256'} 
                
            )
            res.status(201).json({сообщение:'Данные пользователя обновлены',токен:token})
        }
        //userSet.fullName != fullName || userSet.pol != pol || userSet.dateBirthday != dateBirthday || userSet.numberPhone != numberPhone
    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})
//delete users
router.post('/deleteUser', async (req, res)=>{
    try
    {
        const {login} = req.body
        const user = await User.findOneAndDelete({login})
        res.status(201).json({сообщение:'Пользователь удален'})

    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})
//--------------------------------------------------Products--------------------------------------------------------------------------------------------------------------------------------------------
//select allProducts 
router.get('/allProducts', async (req, res)=>{
    try
    {
        const allProducts = await Product.find({})
        res.json(allProducts)
    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

//add product
const storageProduct = multer.diskStorage({
    destination: './vue/hafr/src/assets/imageProducts',
    filename: function(_req, file, cb){

      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname) +  '.' + 'jpg');
    } 
});
const uploadProduct = multer({
    storage: storageProduct,
    fileFilter,
    limits:{
        fileSize:5000000
    },
})
router.post('/addProduct', uploadProduct.single('file'), async (req, res)=>{
    try
    {
        const info = req.body.product
        const image = req.file

        let i = JSON.parse(info)
        if(!image){
            const addProduct = new Product({info:i,img:null})
            await addProduct.save()
        }
        else{
                
            const addProduct = new Product({info:i,img:image})
            await addProduct.save()
            res.status(201).json({сообщение:'Продукт добавлен'})
        }
        
    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

//update product and update in basket
router.post('/updateProduct', async (req, res)=>{
    try
    {
        const {nameMain, main, embedded, dimensions} = req.body
        
        let userSet = await Product.findOneAndUpdate({nameMain},[{$set:{main, embedded, dimensions}}],{upsert:true})
        
        res.status(201).json({сообщение:'Данные продукта обновлены'})
    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

//delete product and update in basket
router.post('/deleteProduct', async (req, res)=>{
    try
    {
        const {product} = req.body
        const prouductDelete = await Product.findOneAndDelete({product})
        res.status(201).json({сообщение:'Продукт удален'})

    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

router.get('/allSells', async (req, res)=>{
    try{
        const allSells = await Sell.find({})
        res.json(allSells)
    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

router.get('/dashBoard', async (req, res)=>{
    try{
        const allUsers = await User.aggregate([{
            $count:'user'
        }])

        const allProducts = await Product.aggregate([{
            $count:'product'
        }])

        const allSells = await Sell.aggregate([{
            $count:'sell'
        }])

        res.status(201).json({allUsers, allProducts, allSells})

    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

router.get('/diagrams', async (req, res)=>{
    try{

        const sells = await Sell.find({})


        res.status(201).json({sells})

    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

router.get('/diagramsUsers', async (req, res)=>{
    try{

        //const sells = await Sell.find({})
        const sellsUsers = await Sell.aggregate([{
            $group:{
                '_id':'$user',
                mass:{$push:'$number'}
                //'first':{'$first':'$number'},
                //'last':{'$last':'$number'}
                
                
            },
        },
        ])


        res.status(201).json({sellsUsers})

    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

router.post('/addDiagramm', async (req, res)=>{
    try{
        const {user} = req.body

        const userOfDiagramm = await Sell.find({user})
        res.status(201).json({userOfDiagramm})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})

router.post('/getComment', async (req, res)=>{
    try{
        const {user} = req.body
        const comment = await Comment.find({user})

        res.status(201).json({comment})
    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

router.get('/getComments', async (req, res)=>{
    try{
        const comments = await Comment.find({})
        const users = await User.find({})

        res.status(201).json({comments,users})
    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

router.post('/sellOfYes', async (req, res)=>{
    try{
        const {sellId} = req.body

        const sellYes = await Sell.findOneAndUpdate({_id:sellId},{$set:{status:'Принят'}},{upsert:true})
        //console.log(sellId)
        res.status(201).json('Заказ принят')
    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

module.exports = router 