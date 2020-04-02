const express  = require('express')
var   router   = express.Router()
const passport = require('passport')
const User     = require('../models/users')

//////////////
// Auth Route!
//////////////

// LANDING PAGE ROUTE
router.get('/', function(req, res){
    res.redirect("index")
})

// SHOW register form
router.get('/register', function(req, res){
    res.render('register')
})
// handle Sign Up 
router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render('register', {error: err.message})
        } else {
            passport.authenticate('local')(req, res, function(){
                req.flash('success', "Welcome to the HotArtist page by "+ user.username)
                res.redirect('/index')
            })
        }
    }) 
})
// login form
router.get('/login', function(req, res){
    res.render('login')
})
// login Post form
router.post('/login', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login'
}), function(req, res){
})
// LogOut Route
router.get('/logout', function(req, res){
    req.logout()
    req.flash('success', "Logged Out !")
    res.redirect('/index')
})

module.exports = router

