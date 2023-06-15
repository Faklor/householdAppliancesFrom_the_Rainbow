const {Schema, model} = require('mongoose')

const schema  = new Schema({
    status:{type:String},
    method:{type:String},
    adress:{type:Object},
    date:{type:String},
    user:{type:Object},
    number:[],
    sum:{type:Number},
}) 

module.exports = model('sells', schema)