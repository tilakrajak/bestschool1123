const mongoose =require('mongoose')
const BookSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    
    phone:{
        type:String,
        require:true
    },
    
    address:{
        type:String,
        require:true
    },
    
    
},{timestamps:true})
const BookModel = mongoose.model('book',BookSchema)
module.exports = BookModel