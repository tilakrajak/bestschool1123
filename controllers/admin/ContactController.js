const ContactModel = require("../../models/contact");

class ContactController{

    // static addcontact = async(req,res)=>{
    //     try{
    //        // res.render('admin/contact/addcontact')
    //        const{name,image}= req.data1
    //         const data = await ContactModel.find()
    //         console.log(data);
    //         res.render('admin/contact/addcontact',{d:data,n:name,img:image})
    //     }catch (error) {
    //         console.log(error)
    //     }
    // }

    static insertcontact = async(req,res)=>{
        try{       
            
           
          const result = new ContactModel({
            name:req.body.name,
            email:req.body.email,
               phoneno:req.body.phoneno,
               message:req.body.message,
          })
          
        await result.save()
        res.redirect('/contact')

        }catch (error) {
            console.log(error);
        }
    };
    static displaycontact = async (req, res) => {
        try {
            
          const {verified} = req.data1
          const display = await ContactModel.find();
          res.render("admin/contact/contactdisplay", { d: display,verified:verified });
        } catch (error) {
          console.log(error);
        }
      };
    // static viewcontact =async(req,res)=>{
    //     try{
    //         const{name,image}= req.data1
    //        const data = await ContactModel.findById(req.params.id)
    //        res.render('admin/contact/view',{d:data,n:name,img:image})
    //     }catch (error) {
    //         console.log(error);
    //     }
    // }
    // static editcontact =async(req,res)=>{
    //     try{
    //         const{name,image}= req.data1
    //        const data = await ContactModel.findById(req.params.id)
    //        res.render('admin/contact/edit',{d:data,n:name,img:image})
    //     }catch (error) {
    //         console.log(error);
    //     }
    // }
    // static updatecontact = async (req, res) => {
    //     try {
    //         const id =req.params.id
    //         const data = await ContactModel.findByIdAndUpdate(id, {
    //             name: req.body.name,
    //             email: req.body.email,
    //             description:req.body.description

                
    //         })
    //         res.redirect('/admin/addcontact')



    //     } catch (erroe) {
    //         console.log(error)
    //     }

    // }
    static deletecontact =async(req,res)=>{
        try{
            const id = req.params.id
           const data = await ContactModel.findByIdAndDelete(id)
           res.redirect("/admin/contactdisplay")
          
        }catch (error) {
            console.log(error);
        }
    }


    





}
module.exports=ContactController
