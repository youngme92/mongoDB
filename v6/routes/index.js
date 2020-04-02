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
            console.log(err)
            return res.render('register')
        } else {
            passport.authenticate('local')(req, res, function(){
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
    res.redirect('/index')
})

module.exports = router

