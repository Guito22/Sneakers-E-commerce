const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');

const isLogged = require("./loginVerification")
const User = require("./models/User")
const Sneaker = require("./models/Sneaker");


//login route
router.post("/login", async (req,res)=>{
    const {email,password} = req.body
    const u = await User.findOne({email})

    if(u){
        const isPw = await bcrypt.compare(password,u.password)
        if(isPw){
                const salt = await bcrypt.genSalt(12);
                const hash = await bcrypt.hash(u.id,salt)
                req.session.user= u.id
                res.send(u.id)
            }
        else{
            res.send("Error")
        }
    }
    else{
        res.send("Error")
    }

})

//sign up route
router.post("/signup", async (req,res)=>{
    const {name,email,password,theme} = req.body
    const existEmail = await User.findOne({email})
    if(existEmail){
        res.send(false)
    }
    else{
        //to encrypt password
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({name,email,password:hash,theme})
        await newUser.save()
        res.send(true)
    }
})
//logout route
router.post("/:userId/logout", async (req,res)=>{
    const {userId} = req.params
    if(req.session.user){
        console.log(req.session);
        const isId = userId==req.session.user
        if(isId){

            req.session.destroy((err)=>{
    
            })
        }
    
    }
    res.send("whatever")
})


router.get("/user",async(req,res)=>{
    const users = await User.find({})

    if(!req.session.user){
        res.send(false)
    }
    else{
        const user = users.find((i)=>{
           return i._id==req.session.user
        })
        res.send(user)
    }
})

router.post("/:userId/:sneakerId/favorite",isLogged,async(req,res)=>{
    const {userId,sneakerId} = req.params
    const user = await User.findById(userId)

    if(!user.favoritesList.includes(sneakerId)){
        const sneaker = await Sneaker.findById(sneakerId)
        user.favoritesList.push(sneaker)
        await user.save()
        res.send("Added")
    }
    else{
        user.favoritesList = user.favoritesList.filter((i)=>{
            return i.toString()!=sneakerId
        })
        await user.save()

        res.send("Removed")


    }
})
router.patch("/:userId/:sneakerId/cart/add",isLogged,async(req,res)=>{
    const {userId,sneakerId} = req.params
    const {quantity} = req.body

    const user = await User.findById(userId)
    const sneaker = await Sneaker.findById(sneakerId)
    const item = user.cartList.find((i)=>{
        return i.sneaker==sneakerId
    })
    if(item!==undefined){
        if(item.quantity+quantity<=sneaker.items_left){
            const index = user.cartList.indexOf(item)
            user.cartList[index].quantity+=quantity
            await user.save()
            res.send("added")
        }
        else{
            res.send("not added")
        }
    }
    else{
        if(sneaker.items_left>0){

            user.cartList.push({sneaker,quantity})
            await user.save()
            res.send("added")
        }
        else{
            res.send("not added")
        }
    }


})

router.delete("/:userId/:sneakerId/cart/delete",isLogged,async(req,res)=>{
    const {userId,sneakerId} = req.params

    const user = await User.findById(userId)
    user.cartList = user.cartList.filter((i)=>{
        return i.sneaker!=sneakerId
    })
    await user.save()
    res.send("")
})
router.delete("/:userId/cart/pay",isLogged,async(req,res)=>{
    const {userId} = req.params
    const user = await User.findById(userId)
    const isEverythingAvaliable = user.cartList.every(async (i)=>{
        const sneaker = await Sneaker.findById(i.sneaker)
        return sneaker.items_left>=i.quantity
    })
    if(isEverythingAvaliable){

        for (const item of user.cartList) {
            const sneaker = await Sneaker.findById(item.sneaker)
            sneaker.items_left-=item.quantity
            await sneaker.save()
        }  
        user.cartList=[]
        await user.save()
        res.send("")
    }
    else{
        res.send("not enough stock")
    }
    

})

router.patch("/:userId/changeTheme",isLogged,async(req,res)=>{
    const {userId} =req.params
    const user = await User.findById(userId)
    user.theme = user.theme==="light" ? "dark" : "light"
    await user.save()
    res.send(user.theme)
})


module.exports = router