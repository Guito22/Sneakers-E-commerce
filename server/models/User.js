const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlenght: [40,"Name cannot be longer than 40 characters"]
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,

    },
    favoritesList:[{type:Schema.Types.ObjectId,ref:"sneaker"}],
    cartList:[{
        sneaker:{type:Schema.Types.ObjectId,ref:"sneaker"},
        quantity:{
            type:Number,
            min:[1,"You cannot have 0 from this item"]
        }
    }],
    theme:{
        type:String,
        enum:["light","dark"]
    }
})

const User = mongoose.model("user",userSchema)

module.exports = User