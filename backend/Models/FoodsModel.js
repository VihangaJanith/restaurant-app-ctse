const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const FoodSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

const foods = mongoose.model('Foods' , FoodSchema)

module.exports = foods