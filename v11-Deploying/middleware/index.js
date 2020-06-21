
const hotArtist = require('../models/artist')
const Comment = require('../models/comment')

var middlewareObj = {}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back')
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next()
                } else {
                    req.flash('error', "isn't same user!")
                    res.redirect('back')
                }
            }
        })
    }
}

middlewareObj.checkArtistOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        hotArtist.findById(req.params.id, function(err, foundArtist){
            if(err){
                res.redirect('back')
            } else {
                if(foundArtist.author.id.equals(req.user._id)){
                    next()
                } else {
                    req.flash('error', "You don't have permission to it")
                    res.redirect('back')
                }
            }
        })
    } else{
        req.flash('error', "please Log in first!")
        res.redirect('back')
    }
}

// MiddleWare
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else {
        req.flash('error', "please Log in first!")
        res.redirect('/login')
    }
}

module.exports = middlewareObj