const mongoose = require("mongoose")

var commentScehma = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
        
    },
    created: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Comment", commentScehma)