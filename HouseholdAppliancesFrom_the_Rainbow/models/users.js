const {Schema, model} = require('mongoose')

const schema  = new Schema({
    email:{type: String, required:true, unique:true},
    password:{type:String, required:true},
    roles:{type:String, default:"User"},
    login:{type:String, required:true,unique:true},
    fullName:{type:String},
    adress:[],
    pol:{type:String},
    dateBirthday:{type:String},
    numberPhone:{type:String},
    photo:[],
    basket:[],
}) 

module.exports = model('users', schema)