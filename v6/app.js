const express = require("express")
const app = express()
const port = 3000
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

mongoose.connect("mongodb://localhost/hotartist_app",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
seedDB()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))

app.set("view engine", "ejs")


// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: "Hi This is secret",
    resave: false,
    saveUninitialized: false
}))

// passport SET
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// User Log In statement
app.use(function(req, res, next){
    res.locals.currentUser = req.user
    next()
})


// ROUTE USE
app.use('/', indexRoutes)
app.use('/index', artistRouter)
app.use('/index/:id/comments', commentRoutes)


app.listen(port, function(){
    console.log("connceted!!")
})