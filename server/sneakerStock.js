const express = require('express');
const router = express.Router()
const Sneaker = require("./models/Sneaker")

router.get("/",async(req,res)=>{
    const sneakers = await Sneaker.find({})
    res.send(sneakers)
})

module.exports = router