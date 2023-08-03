const SchoolModel = require('../../models/School')
const cloudinary = require('cloudinary').v2;
const CategoryModel = require('../../models/Category')



//cloudinary setup
cloudinary.config({
    cloud_name: 'dlfiha3il',
    api_key: '298518693242975',
    api_secret: 'T_6T7Lm0qY047jiiCKnH-VqvkwA'
});


class SchoolController {
    
    static addschool = async (req, res) => {
        try {

            const{name,image}= req.data1
            const data = await SchoolModel.find()
            const category = await CategoryModel.find()

            // console.log(data)
            res.render('admin/school/addschool', { d: data,message:req.flash('success'),n:name,img:image,c:category})

        } catch (error) {
            console.log(error)
        }

    }
    
    // static insertschool = async (req, res) => {
    //     try {

    //         // console.log(req.files.image)
    //         const imagefile = req.files.image
    //         //imageupload code*******************
    //         const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
    //             folder : "schoolimage"
    //         })

    //         console.log(image_upload)






    //         // const result = new SchoolModel({
    //         //     name: req.body.name,

    //         //     description: req.body.description,
    //         //     affilatedboard: req.body.affilatedboard,
    //         //     instructionMedium: req.body.instructionMedium,
    //         //     category: req.body.category,
    //         //     schoolAddress: req.body.schoolAddress,
    //         //     phoneNumber: req.body.phoneNumber
    //         // })
    //         // await result.save()
    //         // res.redirect('/admin/addschool')

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    static insertschool = async (req, res) => {
        try {
            //console.log(req.files.image)
            const imagefile = req.files.image
            //image upload code
            const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                folder: "schoolImage"
            })
            //console.log(image_upload);

            const result = new SchoolModel({
                name: req.body.name,

                description: req.body.description,
                affilatedboard: req.body.affilatedboard,
                instructionMedium: req.body.instructionMedium,
                category: req.body.category,
                schoolAddress: req.body.schoolAddress,
                phoneNumber: req.body.phoneNumber,
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url
                }

            })
            await result.save()
            res.redirect('/admin/addschool')
        } catch (error) {
            console.log(error);
        }
    }


   

    static viewschool = async (req, res) => {
        try {
            // console.log(req.params.id)
            const{name,image}= req.data1
            const data = await SchoolModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/school/view', { d: data, n:name,img:image})

        } catch (erroe) {
            console.log(error)
        }

    }
    static editschool = async (req, res) => {
        try {
            // console.log(req.params.id)
            const{name,image}= req.data1
            const data = await SchoolModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/school/edit', { d: data,n:name,img:image })

        } catch (erroe) {
            console.log(error)
        }

    }
    static updateschool = async (req, res) => {
        try {
            // console.log(req.files.image)
            if (req.files) {
                const school = await SchoolModel.findById(req.params.id)
                const imageid = school.image.public_id

                // console.log(imageid)

                await cloudinary.uploader.destroy(imageid)



                //second update,age

                const imagefile = req.files.image
                //image upload code
                const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                    folder: "schoolImage"
                })


                var data = {
                    name: req.body.name,

                    description: req.body.description,
                    affilatedboard: req.body.affilatedboard,
                    instructionMedium: req.body.instructionMedium,
                    category: req.body.category,
                    schoolAddress: req.body.schoolAddress,
                    phoneNumber: req.body.phoneNumber,
                    image: {
                        public_id: image_upload.public_id,
                        url: image_upload.secure_url
                    }

                }

            } else {
                var data = {
                    name: req.body.name,

                    description: req.body.description,
                    affilatedboard: req.body.affilatedboard,
                    instructionMedium: req.body.instructionMedium,
                    category: req.body.category,
                    schoolAddress: req.body.schoolAddress,
                    phoneNumber: req.body.phoneNumber,


                }
            }
            const id = req.params.id
            await SchoolModel.findByIdAndUpdate(id, data)
            req.flash('success','Update success')
            res.redirect('/admin/addschool')

        } catch (error) {
            console.log(error)
        }

    }
    static deleteschool = async (req, res) => {
        try {


            //console.log(req.params.id);
            // delete image code
            const school = await SchoolModel.findById(req.params.id)
            const imageid = school.image.public_id
            await cloudinary.uploader.destroy(imageid)

            await SchoolModel.findOneAndDelete(req.params.id)


            //console.log(data);
            req.flash('success', 'Delete Success')
            res.redirect('/admin/addschool')

        } catch (error) {
            console.log(error);
        }
    }



}
module.exports = SchoolController