const express = require('express')
const router  = express.Router({mergeParams: true})
const hotArtist = require('../models/artist')
const Comment   = require('../models/comment')

////////////////
// COMMENT Route
////////////////

// NEW COMMENT Routing! 
router.get("/new", isLoggedIn, function(req, res){
    hotArtist.findById(req.params.id, function(err, foundArtist){
        if(err){
            console.log(err)
        } else {
            res.render('comments/new', {artist : foundArtist})
            console.log(foundArtist)
        }
    })
})

// CREATE COMMENT Routing
router.post('/', isLoggedIn, function(req, res){
    hotArtist.findById(req.params.id, function(err, foundArtist){
        if(err){
            console.log(err)
            res.redirect('/index')
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    foundArtist.comments.push(comment)
                    foundArtist.save()
                    res.redirect('/index/'+ req.params.id)
                }
            })
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