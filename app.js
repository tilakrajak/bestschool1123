const express = require('express')
const app = express()
const port = 5000
const web = require('./routes/web')
const connectDb = require('./db/connectdb')
const fileUpload = require("express-fileupload");
let session = require('express-session')
let flash = require('connect-flash')



//cookieparser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//for file upload
app.use(fileUpload({
  useTempFiles: true}));


//database connection
connectDb()


//ejs html css
app.set('view engine', 'ejs')

//static files
app.use(express.static('public'))

app.use(session({
  secret: 'secret',
  cookie: {maxAge:60000},
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());


//// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))


//load router

app.use('/',web)

















//create server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})