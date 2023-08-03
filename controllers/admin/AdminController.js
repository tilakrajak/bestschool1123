const AdminModel = require('../../models/Admin')
const cloudinary = require('cloudinary').v2;
const bcrypt =  require('bcrypt')
const jwt =  require('jsonwebtoken')



//cloudinary setup
cloudinary.config({
    cloud_name: 'dlfiha3il',
    api_key: '298518693242975',
    api_secret: 'T_6T7Lm0qY047jiiCKnH-VqvkwA'
});


class AdminController {

    static dashboard = async (req, res) => {
        try {
            // console.log(req.data1)
            const{name,image}= req.data1

            res.render('admin/dashboard',{n:name,img:image})
        }
        catch (err) {
            console.log(err)
        }
    }

    static register = async (req, res) => {
        try {

            res.render('admin/register', { message: req.flash('error') })

        } catch (error) {
            console.log(error)
        }
    }
    
    static admininsert = async (req, res) => {
        try {

            // console.log(req.files.image)
            const imagefile = req.files.image
            //image upload code
            const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                folder: "admin"
            })
            // console.log(image_upload)
            // console.log(req.body)
            const { name, email, password, cpassword,image } = req.body
            const admin = await AdminModel.findOne({ email: email })
            //console.log(admin);
            if (admin) {
                req.flash('error', "email already exists");
                res.redirect('/register')

            } else {
                if (name && email && password && cpassword) {
                    if (password == cpassword) {
                        try{
                            const hashpassword = await bcrypt.hash(password,10)
                            const result = new AdminModel({
                                    name:name,
                                    email:email,
                                    password:hashpassword,
                                    image: {
                                        public_id: image_upload.public_id,
                                        url: image_upload.secure_url
                                    }
                            })
                            await result.save()
                            req.flash('success',"registeration succesfull")
                            res.redirect('/login')


                        }catch(error){
                            console.log(error)
                        }

                    } else {
                        req.flash('error', "password & confirm password not found");
                        res.redirect('/register')
                    }

                } else {
                    req.flash('error', "All feilds are required");
                    res.redirect('/register')
                }
            }
        

        } catch (error) {
            console.log(error)
        }
    }

    static verifylogin =async(req,res)=>{
        try {
           // console.log(req.body);
           const { email, password } = req.body;
           if (email && password){
            const admin = await AdminModel.findOne({email: email })

            if (admin !=null){
                const isMatched = await bcrypt.compare(password, admin.password)
                if (isMatched) {

                    var token = jwt.sign({ ID : admin._id }, 'jatin12345')
                    // console.log(token)
                    res.cookie("token",token)
                    res.redirect('/admin/dashboard')
                } else {
                    req.flash('error', 'Email or password is not valid')
                    return res.redirect('/login')
                }
            }else{
                req.flash('error', 'you are not a registered user')
                return res.redirect('/login')
            }
           }else {
            req.flash('error', 'All Fields Required')
            return res.redirect('/login')
           }
        } catch (error) {
            console.log(error);
        }
    }

    static logout = async(req,res) => {
        try{
            res.clearCookie("token")
            res.redirect("/login")

        }catch(error){
            console.log(error)
        }
    }
}

module.exports = AdminController
























