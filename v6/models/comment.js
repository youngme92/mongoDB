const mongoose = require("mongoose")

var commentScehma = new mongoose.Schema({
    text: String,
    author: String
})

module.exports = mongoose.model("Comment", commentScehma)