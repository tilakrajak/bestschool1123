const CategoryModel = require('../models/Category')
const SchoolModel = require('../models/School')
const SliderModel = require('../models/slider')

class FrontController {


    static home = async (req, res) => {
        try {
             const category = await CategoryModel.find()
             const slider = await SliderModel.find()
            //  console.log(slider)
            res.render('home',{c:category,s:slider})

        } catch (error) {
            console.log(error)
        }
    }


    static contact = async (req, res) => {
        try {
            res.render('contact')

        } catch (error) {
            console.log(error)
        }
    }

    static login =async(req,res) => {
        try{
            res.render('login',{ message1: req.flash('success'),message2:req.flash('error')})
        }catch(error){
            console.log(error)
        }
    }


    static schoollist = async(req,res)=>{
        try{
            const categoryname = req.params.id;
            // console.log(name)
            
            const data = await SchoolModel.find({category:categoryname})
            console.log(data)
            res.render('schoollist',{d:data,n:categoryname})

        }catch(error){
            console.log(error)
        }
    }
    static schooldetail = async(req,res)=>{
        try{
            
            const data = await SchoolModel.findById(req.params.id)
            console.log(data)
            res.render('schooldetail',{d:data})

        }catch(error){
            console.log(error)
        }
    }
    

}



module.exports = FrontController