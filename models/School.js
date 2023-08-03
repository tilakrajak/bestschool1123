const mongoose = require('mongoose')


const Schoolschema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
   
    description:{
        type:String,
        require:true

    },
    affilatedboard:{
        type:String,
        require:true

    },
    instructionMedium:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true

    },
    schoolAddress:{
        type:String,
        require:true

    },
    phoneNumber:{
        type:String,
        require:true

    },
    image:{
        public_id:{
            type: String,
        },
        url: {
            type: String
        }
    },



},{timestamps:true})

const Schoolmodel = mongoose.model('school',Schoolschema)

module.exports=Schoolmodel