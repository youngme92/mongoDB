const express = require('express')
const router  = express.Router()
const hotArtist = require('../models/artist')

///////////////
// ARTIST ROUTE
///////////////

// INDEX ROUTE
router.get('/', function(req, res){
    hotArtist.find({}, function(err, newArtist){
        if(err){
            console.log(err)
        }else {
            res.render("artists/index", {artists : newArtist})
        }
    })
})
// NEW ROUTE
router.get('/newArtist', isLoggedIn, function(req, res){
    res.render("artists/newArtist")
})

// SHOW ROUTE
router.get('/:id', function(req, res){
    hotArtist.findById(req.params.id).populate("comments").exec(function(err, foundArtist){
        if(err){
            console.log(err)
        } else {
            res.render("artists/show", {Id : foundArtist })
        }
    })
})

// CREATE ROUTE
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name
    var url = req.body.url
    var desc = req.body.description
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newHotArtist = {name : name, url : url, description: desc, author: author }
    hotArtist.create(newHotArtist, function(err, addArtist){
        if(err){
            console.log(err)
        }else { 
            console.log(addArtist)
            res.redirect('/index')
        }
    })
})

// MiddleWare
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/login')
    }
}


module.exports = router