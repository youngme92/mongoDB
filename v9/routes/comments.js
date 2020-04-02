const express = require('express')
const router  = express.Router({mergeParams: true})
const hotArtist = require('../models/artist')
const Comment   = require('../models/comment')
const middlewareObj = require('../middleware/index')

////////////////
// COMMENT Route
////////////////

// NEW COMMENT Routing! 
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    hotArtist.findById(req.params.id, function(err, foundArtist){
        if(err){
            console.log(err)
        } else {
            res.render('comments/new', {artist : foundArtist})
        }
    })
})

// CREATE COMMENT Routing
router.post('/', middlewareObj.isLoggedIn, function(req, res){
    hotArtist.findById(req.params.id, function(err, foundArtist){
        if(err){
            console.log(err)
            res.redirect('/index')
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    comment.author.username = req.user.username
                    comment.author.id = req.user._id
                    comment.save()
                    foundArtist.comments.push(comment)
                    foundArtist.save()
                    res.redirect('/index/'+ req.params.id)
                }
            })
        }
    })
})

// EDIT COMMENT Routing
router.get('/:comment_id/edit', middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back')
        } else {
            res.render('comments/edit', {artist_id : req.params.id, comment : foundComment})
        }
    })
})

// UPDATE COMMENT Routing
router.put('/:comment_id', middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, upDateComment){
        if(err){
            res.redirect('back')
        } else {
            res.redirect('/index/'+ req.params.id)
        }
    })
})

// DESTROY COMMENT Routing
router.delete('/:comment_id', middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect('back')
        } else {
            res.redirect('/index/' + req.params.id)
        }
    })
})

module.exports = router