const express = require("express")
const app = express()
const PORT = process.env.PORT ? process.env.PORT : 3000
const bodyParser = require("body-parser")
const LocalStrategy = require('passport-local')
const passport = require('passport')
const mongoose = require("mongoose")
const hotArtist = require("./models/artist")
const Comment = require("./models/comment")
const User = require('./models/users')
const seedDB = require("./seedDB")
const artistRouter  = require('./routes/artists')
const commentRoutes = require('./routes/comments')
const indexRoutes   = require('./routes/index')
const methodOverride = require('method-override')
const flash = require('connect-flash')

// console.log(process.env.DATABASEURL)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Deploying_app",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// seedDB() // seedDB is stopped!

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.set("view engine", "ejs")


// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: "Hi This is secret",
    resave: false,
    saveUninitialized: false
}))

// FLASH MESSAGE
app.use(flash())

// passport SET
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// User Log In statement
app.use(function(req, res, next){
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

// ROUTE USE
app.use('/', indexRoutes)
app.use('/index', artistRouter)
app.use('/index/:id/comments', commentRoutes)



app.listen(PORT, process.env.IP, function(){
    console.log("connceted!!")
})