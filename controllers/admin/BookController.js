const BookModel = require("../../models/Book");
const nodemailer = require("nodemailer");

class BookController {
  static insertbook = async (req, res) => {
    try {
      // console.log(req.body);
      const { name, email } = req.body;
      const result = new BookModel({
        order: req.body.order,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
      });
      await result.save();
      this.sendEmail(name, email);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  static BookDisplay = async (req, res) => {
    try {
      //res.send('hello')
      const { name, admin_image } = req.data1;
      const data = await BookModel.find();

      //console.log(data);
      res.render("admin/book/view", { d: data, n: name, img: admin_image });
    } catch (error) {
      console.log(error);
    }
  };

  static sendEmail = async (name, email) => {
    

    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "tilakrajak72@gmail.com",
        pass: "nstjakjvhzwbsgsw",
      },
    });

    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: "your order is placed succesfully", //Subject line
      text: "hello", //plain text body
      html: `<b>${name}</b> Order placed successfull!`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  };
 
}
module.exports =BookController;