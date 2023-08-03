const mongoose = require('mongoose')

const AboutSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },

    description:{
        type:String,
        require:true
    }
   

},{timestamps: true})
const AboutModel = mongoose.model('About',AboutSchema)

module.exports = AboutModel