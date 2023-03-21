const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const FoodOrderSchema = new Schema({
    name:{
        type:String,
        required:false
    },
    qty:{
        type:String,
        required:false
    },
    userid:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:false
    }

},{
    timestamps:true
})

const foodOrder = mongoose.model('FoodOrders' , FoodOrderSchema)

module.exports = foodOrder