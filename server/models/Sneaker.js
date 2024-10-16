const mongoose = require('mongoose')
const {Schema} = mongoose
const sneakerSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:["MEN","WOMEN","KIDS"]
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        min:[0,"You cannot sell at negative price"]
    },
    originalPrice:{
        type:Number,
        min:[0,"You cannot sell at negative price"]
    },
    items_left:{
        type:Number,
        required:true,
        min:[0,"You cannot have a negative amount of sneakers"]
    },
    imageURL:{
        type:String,
        required:true
    }
})

const Sneaker = mongoose.model("sneaker",sneakerSchema)

module.exports = Sneaker