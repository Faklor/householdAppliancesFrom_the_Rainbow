const {Schema, model} = require('mongoose')

const schema  = new Schema({
    info:{type:Object},
    img:{type:Object},
    // main:{
    //     name:{type: String},
    //     model:{type:String},
    //     catagory:{type:String},
    //     price:{type:Number},
    // embedded:{
    //     color:{type:String},
    //     manufacturer:{type:String},
    //     text:{type:String},
    // },
    // dimensions:{
    //     width:{type: String},
    //     heigth:{type: String},
    //     depth:{type: String},
    //     weight:{type: String},
    // },
}) 

module.exports = model('products', schema)