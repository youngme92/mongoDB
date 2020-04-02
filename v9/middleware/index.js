
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
                    res.redirect('back')
                }
            }
        })
    }
}

// MiddleWare
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/login')
    }
}

module.exports = middlewareObj