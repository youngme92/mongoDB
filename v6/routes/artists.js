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
router.get('/newArtist', function(req, res){
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
router.post("/", function(req, res){
    var name = req.body.name
    var url = req.body.url
    var desc = req.body.description
    var newHotArtist = {name : name, url : url, description: desc }
    hotArtist.create(newHotArtist, function(err, addArtist){
        if(err){
            console.log(err)
        }else { 
            console.log(addArtist)
            res.redirect('/index')
        }
    })
})

module.exports = router