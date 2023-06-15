const {Router} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult, body} =  require('express-validator')
const {SMTPClient, email, server, connect} = require('emailjs')
const mailer = require('./nodeemail')
const Utils = require('utils')
const { requiresToken, needsAdminAccess } = require('../middleware/valid-token')
const multer  = require("multer");

const router = Router()

const User = require('../models/users')
const Role = require('../models/roles')
const Sell = require('../models/sells')
const Comment = require('../models/comments')


//register
router.post('/register',[ 
    check('email','Некорректный email').isEmail(),
    check('login','В логине присутвуют некорректные символы').not().isEmpty(),
    check('password','Минимальная длина пароля 8 символов').isLength({min:8}),
    ], async (req,res) =>{
    try
    {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                ошибки: errors.array(),
                cообщение: 'Некорректные данные при регистрации'
            })
        }
        
        const {email, password, login, roles, fullName, pol,  dateBirthday, numberPhone} = req.body

        const userEmail = await User.findOne({email})
        if(userEmail){
            res.status(400).json({сообщение:`Пользователь с почтой ${email} уже существует`})
        }

        const userLogin = await User.findOne({login})
        if(userLogin){
            res.status(400).json({сообщение:`Пользователь с логином: ${login} уже существует`})
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const user = new User({email, login, roles, fullName, pol, dateBirthday, numberPhone,password: hashedPassword})
        await user.save()
        const image = './email/mail.png'
       const message = {
        to:email,
        subject:'HAFR',
        text:``,
        html: `<img src="cid:logo"/> 
        <h1 style="text-align:center; font-size:20px; color:#00BFA6;">Спасибо за вашу регистрацию<br>
        Ваш логин: ${login}</h1>`,
        attachments: [{
            filename: 'Мы вам рады',
            path: __dirname + '/email/mail.png',
            cid: 'logo'
        }],
       }
       mailer(message)
      

        res.status(201).json({сообщение:'Пользователь создан'})
    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})
//login
router.post('/login',[
    check('login','В логине присутвуют некорректные символы').not().isEmpty(),
    check('password','Введите пароль').exists()
    ], async (req, res) =>{
    try
    {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неправильные данные'
            })
        }
        const {login, password} = req.body
        const user = await User.findOne({login})
        if(!user){
            return res.status(400).json({message:'Неверный пароль или логин'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:'Неверный пароль или логин'})
        }
       
        const token = jwt.sign(
            {
                user: user,
                photo: User.photo
            },
            config.get('jwtSecret'),
            {expiresIn: '8h'},
            { algorithm: 'HS256'} 
        )
        // const decoded = jwt.verify(token, config.get('jwtSecret'));
        // console.log(decoded.foo)
        //res.json({token, login:user.login, role: user.roles})
        res.json({token})

        
    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

router.post('/addAdress', async (req,res)=>{
    try{
        const {login, adress} = req.body
        let adressNew = adress
        
        const addAdress = await User.findOneAndUpdate({login}, {$push:{adress:{adressNew}}},{upsert:true})
        //const removeAddAdressOld = await User.findOneAndUpdate({login}, {$pop:{adress:1}},{upsert:true})

        if(true){
            const addAdressNew = await User.findOneAndUpdate({login}, {$push:{adress:{adressNew}}},{upsert:true})
            const removeAddAdressOld = await User.findOneAndUpdate({login}, {$pop:{adress:1}},{upsert:true})

            const token = jwt.sign(
                {
                    user: addAdressNew,
                },
                config.get('jwtSecret'),
                {expiresIn: '8h'},
                { algorithm: 'HS256'} 
                )    
                res.status(201).json({сообщение:'Адрес добавлен',токен:token})
        }
    }
    catch(e){
        res.status(500).json({error:e.message}) 
    }
})

router.post('/deleteAdress', async (req,res)=>{
    try{
        const {login, adress} = req.body
        let adressNew = adress
        
        const deleteAdressOld = await User.findOneAndUpdate({login},{$pull:{adress:adressNew}},{upsert:true})
        if(true){
            const deleteAdressNew = await User.findOneAndUpdate({login},{$pull:{adress:adressNew}},{upsert:true})

            const token = jwt.sign(
                {
                    user: deleteAdressNew,
                },
                config.get('jwtSecret'),
                {expiresIn: '8h'},
                { algorithm: 'HS256'} 
                )    
                res.status(201).json({сообщение:'Адрес удален',токен:token})
        }
    }
    catch(e){
        res.status(500).json({error:e.message}) 
    }
})

router.post('/getSells', async (req, res) => { 
    try{
        const {user} = req.body
        const sell = await Sell.find({user})

        res.status(201).json({sell})
    }
    catch(e){
        res.status(500).json({error:e.message}) 
    }

})

router.post('/addComments', async (req, res)=>{
    try{

        const {user, comment, appraisal} = req.body
        //console.log(user, comment, appraisal)
        const addComment = new Comment({user:user,appraisal:appraisal,comment:comment})
        await addComment.save()

        res.status(201).json('Спасибо за ваш комментарий')

    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

router.post('/deleteComments', async (req, res)=>{
    try{

        const {user} = req.body
        //console.log(user, comment, appraisal)
        const deleteComment = await Comment.findOneAndRemove({user})
        

        res.status(201).json('Комментарий удален')

    }
    catch (e) {
        res.status(500).json({error:e.message}) 
    }
})

router.get('/user', requiresToken,async (req, res) => { })

router.get('/admin', requiresToken, needsAdminAccess, (req, res) => { 
    res.json({mes:"succes admin"})
})

module.exports = router 