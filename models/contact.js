const mongoose = require('mongoose')


const ContactSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
   
    phoneno:{
        type:String,
        require:true

    },
     message:{
        type:String,
        require:true
    },

},{timestamps:true})

const ContactModel = mongoose.model('contact',ContactSchema)

module.exports=ContactModel
