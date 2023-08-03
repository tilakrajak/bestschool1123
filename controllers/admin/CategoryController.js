const CategoryModel = require('../../models/Category')
const cloudinary = require('cloudinary').v2;



//cloudinary setup
cloudinary.config({
    cloud_name: 'dlfiha3il',
    api_key: '298518693242975',
    api_secret: 'T_6T7Lm0qY047jiiCKnH-VqvkwA'
});

class CategoryController {

    static addcategory = async (req, res) => {
        try {
            // res.render('admin/category/addcategory')
            const{name,image}= req.data1
            const data = await CategoryModel.find()
            console.log(data);
            res.render('admin/category/addcategory', { d: data,message:req.flash('success'),n:name,img:image })
        } catch (error) {
            console.log(error)
        }
    }

    static insertcategory = async (req, res) => {
        try {
            // console.log(req.files.image)
            const imagefile = req.files.image

            //imageupload code*******************
            const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                folder: "categoryimage"
            })

            // console.log(image_upload)
            const result = new CategoryModel({
                name: req.body.name,
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url
                }
            })

            await result.save()
            res.redirect('/admin/addcategory')

        } catch (error) {
            console.log(error);
        }
    }
    static viewcategory = async (req, res) => {
        try {
            const{name,image}= req.data1
            const data = await CategoryModel.findById(req.params.id)
            res.render('admin/category/view', { d: data ,n:name,img:image})
        } catch (error) {
            console.log(error);
        }
    }
    static editcategory = async (req, res) => {
        try {
            const{name,image}= req.data1
            const data = await CategoryModel.findById(req.params.id)
            res.render('admin/category/edit', { d: data ,n:name,img:image})
        } catch (error) {
            console.log(error);
        }
    }
    static updatecategory = async (req, res) => {
        try {
            // console.log(req.files.image)
            if (req.files) {
                const category = await CategoryModel.findById(req.params.id)
                const imageid = category.image.public_id

                // console.log(imageid)

                await cloudinary.uploader.destroy(imageid)



                //second uodate i,age

                const imagefile = req.files.image
                //image upload code
                const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                    folder: "categoryImage"
                })


                var data = {
                    name: req.body.name,


                    image: {
                        public_id: image_upload.public_id,
                        url: image_upload.secure_url
                    }

                }

            } else {
                var data = {
                    name: req.body.name,


                }
            }
            const id = req.params.id
            await CategoryModel.findByIdAndUpdate(id, data)
            res.redirect('/admin/addcategory')



        } catch (error) {
            console.log(error)
        }

    }
    
    static deletecategory = async (req, res) => {
        try {
            //delete image code

            const category = await CategoryModel.findById(req.params.id)
            const imageid = category.image.public_id

            // console.log(imageid)

            await cloudinary.uploader.destroy(imageid)
            const id = req.params.id
            const data = await CategoryModel.findByIdAndDelete(id)
            res.redirect('/admin/addcategory')

            
        } catch (error) {
            console.log(error);
        }
    }




}
module.exports = CategoryController