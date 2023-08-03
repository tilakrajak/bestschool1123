const mongoose = require('mongoose')

const SliderSchema = new mongoose.Schema({
    
   
    image:{
        public_id:{
            type: String,
        },
        url: {
            type: String
        }
    },

   

},{timestamps: true})
const SliderModel = mongoose.model('Slider',SliderSchema)

module.exports = SliderModel