const jwt = require('jsonwebtoken')
const Adminmodel = require('../models/Admin')
const CheckLogin = async (req,res, next) =>{

    // console.log('hello middleware')
    const{token} = req.cookies
    // console.log(token)

    if(!token){
        
        req.flash("error", "unauthorized admin ");
                   res.redirect("/login")
    }else{

        const verify_token = jwt.verify(token,'jatin12345')
        // console.log(verify_token);
        const data = await Adminmodel.findOne({_id: verify_token.ID})
        console.log(data)
        req.data1=data;
        next()

    }

}
module.exports = CheckLogin