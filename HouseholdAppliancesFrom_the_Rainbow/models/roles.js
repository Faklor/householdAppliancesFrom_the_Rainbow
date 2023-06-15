const {Schema, model} = require('mongoose')

const roles  = new Schema({
    value:{type:String, unique:true},
}) 

module.exports = model('roles', roles)