const express = require('express')
const FrontController = require('../controllers/FrontController')
const AdminController = require('../controllers/admin/AdminController')
const SchoolController = require('../controllers/admin/SchoolController')
const CategoryController = require('../controllers/admin/CategoryController')
const AboutController = require('../controllers/admin/AboutController')
const ContactController = require('../controllers/admin/ContactController')
const CheckLogin = require('../middleware/auth')
const SliderController = require('../controllers/admin/SliderController')
const BookController = require('../controllers/admin/BookController')
const routes = express.Router()


//frontcontroller
routes.get('/',FrontController.home)
routes.get('/contact',FrontController.contact)
routes.get('/login',FrontController.login)
routes.get('/school_list/:id',FrontController.schoollist)
routes.get('/schooldetail/:id',FrontController.schooldetail)


//admin port
routes.get('/admin/dashboard', CheckLogin,AdminController.dashboard)
routes.get('/register',AdminController.register)
routes.post('/admininsert',AdminController.admininsert)
routes.post('/verifylogin',AdminController.verifylogin)
routes.get('/logout',AdminController.logout)


//addschool controller
routes.get('/admin/addschool',CheckLogin,SchoolController.addschool)
routes.post('/admin/insertschool',CheckLogin,SchoolController.insertschool)
routes.get('/admin/schoolview/:id',CheckLogin,SchoolController.viewschool)
routes.get('/admin/schoolEdit/:id',CheckLogin,SchoolController.editschool)
routes.post('/admin/schoolupdate/:id',CheckLogin,SchoolController.updateschool)
routes.get('/admin/schooldelete/:id',CheckLogin,SchoolController.deleteschool)


//admin/category controller
routes.get('/admin/addcategory',CheckLogin,CategoryController.addcategory)
routes.post('/admin/insertcategory',CheckLogin,CategoryController.insertcategory)
routes.get('/admin/categoryView/:id',CheckLogin,CategoryController.viewcategory)
routes.get('/admin/categoryedit/:id',CheckLogin,CategoryController.editcategory)
routes.post('/admin/categoryupdate/:id',CheckLogin,CategoryController.updatecategory)
routes.get('/admin/categorydelete/:id',CheckLogin,CategoryController.deletecategory)

//admin/about/aboutcontroller

routes.get('/admin/addabout',CheckLogin,AboutController.addabout)
routes.post('/admin/insertabout',CheckLogin,AboutController.insertabout)
routes.get('/admin/aboutView/:id',CheckLogin,AboutController.viewabout)
routes.get('/admin/aboutedit/:id',CheckLogin,AboutController.editabout)
routes.post('/admin/aboutupdate/:id',CheckLogin,AboutController.updateabout)
routes.get('/admin/aboutdelete/:id',CheckLogin,AboutController.deleteabout)


//admin/contact/contactcontroller

routes.get('/admin/addcontact',CheckLogin,ContactController.addcontact)
routes.get('/admin/insertcontact',CheckLogin,ContactController.insertcontact)
routes.get('/admin/contactView/:id',CheckLogin,ContactController.viewcontact)
routes.get('/admin/contactedit/:id',CheckLogin,ContactController.editcontact)
routes.post('/admin/contactupdate/:id',CheckLogin,ContactController.updatecontact)
routes.get('/admin/contactdelete/:id',CheckLogin,ContactController.deletecontact)


//admin//SliderController
routes.get('/admin/addslider',CheckLogin,SliderController.addslider)
routes.post('/admin/insertslider',CheckLogin,SliderController.insertslider)
routes.get('/admin/Sliderview/:id',CheckLogin,SliderController.viewslider)
routes.get('/admin/SliderEdit/:id',CheckLogin,SliderController.editslider)
routes.post('/admin/Sliderupdate/:id',CheckLogin,SliderController.updateslider)
routes.get('/admin/Sliderdelete/:id',CheckLogin,SliderController.deleteslider)


//bookcontrolleer
//bookController
routes.post('/bookinsert',CheckLogin,BookController.insertbook )
routes.get('/admin/book',CheckLogin,BookController.BookDisplay)





module.exports= routes
