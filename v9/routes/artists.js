const express = require('express')
const router  = express.Router()
const hotArtist = require('../models/artist')
const middlewareObj = require('../middleware/index')

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
router.get('/newArtist', middlewareObj.isLoggedIn, function(req, res){
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
router.post("/", middlewareObj.isLoggedIn, function(req, res){
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

// EDIT ROUTE
router.get('/:id/edit', middlewareObj.checkArtistOwnership, function(req, res){
    hotArtist.findById(req.params.id, function(err, foundArtist){
                res.render('artists/edit', {artist : foundArtist})
    })
})
// UPDATE ROUTE
router.put('/:id', middlewareObj.checkArtistOwnership, function(req, res){
    hotArtist.findByIdAndUpdate(req.params.id, req.body.artist, function(err, upDatedArtist){
        if(err){
            console.log(err)
            res.redirect('/index')
        } else {
            res.redirect('/index/'+ req.params.id)
        }
    })
})

// DELETE ROUTE
router.delete('/:id', middlewareObj.checkArtistOwnership, function(req, res){
    hotArtist.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/index')
        } else {
            res.redirect('/index')
        }
    })
})

module.exports = router