const {Schema, model} = require('mongoose')

const schema  = new Schema({
    user:{type:String},
    appraisal:{type:String},
    comment:{type:String},
}) 

module.exports = model('comments', schema)