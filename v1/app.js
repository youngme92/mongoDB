const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")

var artists = [
    {name: "Eminem",
        url: "https://www.whosampled.com/static/track_images_200/lr2_2009517_182926180966.jpg"
    },
    {name: "Kanye West",
        url: "https://www.whosampled.com/static/track_images_200/lr57_20081014_193422490889.jpg"
    },
    {name: "XXXtentacion",
        url: "https://www.whosampled.com/static/track_images_200/lr140505_201777_0170785259.jpg"
    },
    {name: "Kendrick Lamar",
        url: "https://www.whosampled.com/static/track_images_200/lr1536_2017414_112716284634.jpg"
    }

]
app.use(bodyParser.urlencoded({ extended: true}))

app.set("view engine", "ejs")

app.get('/', function(req, res){
    res.render("home")
})

app.get('/display', function(req, res){
    res.render("display", {artists : artists})
})

app.get('/newArtist', function(req, res){
    res.render("newArtist")
})

app.post("/display", function(req, res){
    var name = req.body.name
    var url = req.body.url
    var newHotArtist ={name : name, url : url}
    artists.push(newHotArtist)
    res.redirect('/display')
})

app.listen(port, function(){
    console.log("connceted!!")
})