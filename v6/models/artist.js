const mongoose = require("mongoose")

//Schema setup

var artistSchema = new mongoose.Schema({
    name: String,
    url: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

module.exports = mongoose.model("hotArtist", artistSchema)