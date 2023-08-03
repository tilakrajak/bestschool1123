const AboutModel = require("../../models/About");

const cloudinary = require('cloudinary').v2;



//cloudinary setup
cloudinary.config({ 
    cloud_name: 'dlfiha3il', 
    api_key: '298518693242975', 
    api_secret: 'T_6T7Lm0qY047jiiCKnH-VqvkwA' 
  });

class AboutController{

    static addabout = async(req,res)=>{
        try{
           // res.render('admin/About/addAbout')
           const{name,image}= req.data1
            const data = await AboutModel.find()
            console.log(data);
            res.render('admin/about/addabout',{d:data,n:name,img:image})
        }catch (error) {
            console.log(error)
        }
    }

    static insertabout = async(req,res)=>{
        try{            
            // // console.log(req.files.image)
            // const imagefile = req.files.image

            // //imageupload code*******************
            // const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
            //     folder : "Aboutimage"
            // })

            // console.log(image_upload)
          const result = new AboutModel({
            name:req.body.name,
               description:req.body.description
          })
          
        await result.save()
        res.redirect('/admin/addabout')

        }catch (error) {
            console.log(error);
        }
    }
    static viewabout =async(req,res)=>{
        try{
            const{name,image}= req.data1
           const data = await AboutModel.findById(req.params.id)
           res.render('admin/about/view',{d:data,n:name,img:image})
        }catch (error) {
            console.log(error);
        }
    }
    static editabout =async(req,res)=>{
        try{
            const{name,image}= req.data1
           const data = await AboutModel.findById(req.params.id)
           res.render('admin/about/edit',{d:data,n:name,img:image})
        }catch (error) {
            console.log(error);
        }
    }
    static updateabout = async (req, res) => {
        try {
            const id =req.params.id
            const data = await AboutModel.findByIdAndUpdate(id, {
                name: req.body.name,
                description:req.body.description

                
            })
            res.redirect('/admin/addabout')



        } catch (erroe) {
            console.log(error)
        }

    }
    static deleteabout =async(req,res)=>{
        try{
            const id = req.params.id
           const data = await AboutModel.findByIdAndDelete(id)
           res.redirect('/admin/addAbout')
          
        }catch (error) {
            console.log(error);
        }
    }


    




}



module.exports= AboutController