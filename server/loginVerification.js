const bcrypt = require('bcryptjs');

const isLogged = (req,res,next)=>{
    const {userId} = req.params
    if(req.session.user){
        const isId = userId==req.session.user
        if(isId){
            next()
        }
        else{
            res.send("not logged")
        }
    }
    else{
        res.send("not logged")
    }
}

module.exports = isLogged