const mongoose = require('mongoose')

const live_url = "mongodb+srv://tilakrajak72:tilak123@cluster0.glze9dq.mongodb.net/bestschool?retryWrites=true&w=majority"

const local_url="mongodb://127.0.0.1:27017/expressproject2"
const connectDb = () =>{

    return mongoose.connect(live_url)
    .then(()=>{
        console.log("connected succesfully");
    }).catch((error)=>{
        console.log(error);
    })
}

module.exports= connectDb