const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const FoodOrderSchema = new Schema({
    cusname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    foodname:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    total:{
        type:String,
        required:true
    },
    orderedDate:{
        type:Date,
        default:Date.now
    },
    userid:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

const foodOrder = mongoose.model('foodorders' , FoodOrderSchema)

module.exports = foodOrder