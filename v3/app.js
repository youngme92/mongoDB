const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const hotArtist = require("./models/artist")
const seedDB = require("./seedDB")


mongoose.connect("mongodb://localhost/hotartist_app",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
seedDB()
// //Schema setup -- modulation

// var artistSchema = new mongoose.Schema({
//     name: String,
//     url: String,
//     description: String
// })

// var hotArtist = mongoose.model("hotArtist", artistSchema)

// hotArtist.create({
//     name: "Kanye West",
//     url: "https://www.whosampled.com/static/track_images_200/lr57_20081014_193422490889.jpg",
//     description: "카녜이 웨스트는 애틀랜타에서 태어났다. 세 살 때 부모가 이혼을 하자 그는 시카고로 오게되며, 그 곳에서 미술을 공부하고, 시카고 주립대학에 입학했다. 그러나 그는 자신의 음악 직업 때문에 자퇴를 했다. 그 후 그는 R&B와 힙합 전문 프로듀서가 되었고, Jay-Z, Talib kweli, 캄론, 폴 월, 커먼, 맙딥, 얼리샤 키스, 재닛 잭슨, 더 게임, 스카페이스 등의 음반을 프로듀싱했다. 데릭 안젤레티(Deric Angelettie)의 고스트 프로듀서였으며, 나스에 앨범에 참여했었다."
// },function(err, newArtist){
//     if(err){
//         console.log(err)
//     }else {
//         console.log("New Artist...")
//         console.log(newArtist)
//     }

// })


// var artists = [
//     {name: "Eminem",
//         url: "https://www.whosampled.com/static/track_images_200/lr2_2009517_182926180966.jpg"
//     },
//     {name: "Kanye West",
//         url: "https://www.whosampled.com/static/track_images_200/lr57_20081014_193422490889.jpg"
//     },
//     {name: "XXXtentacion",
//         url: "https://www.whosampled.com/static/track_images_200/lr140505_201777_0170785259.jpg"
//     },
//     {name: "Kendrick Lamar",
//         url: "https://www.whosampled.com/static/track_images_200/lr1536_2017414_112716284634.jpg"
//     }

// ]
app.use(bodyParser.urlencoded({ extended: true}))

app.set("view engine", "ejs")

app.get('/', function(req, res){
    res.redirect("index")
})

app.get('/index', function(req, res){
    hotArtist.find({}, function(err, newArtist){
        if(err){
            console.log(err)
        }else {
            res.render("index", {artists : newArtist})
        }
    })
    
})

app.get('/index/newArtist', function(req, res){
    res.render("newArtist")
})

// CREATE SHOW Routing!
app.get('/index/:id', function(req, res){
    hotArtist.findById(req.params.id).populate("comments").exec(function(err, foundArtist){
        if(err){
            console.log(err)
        } else {
            res.render("show", {Id : foundArtist })
        }
    })


})

app.post("/index", function(req, res){
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

app.listen(port, function(){
    console.log("connceted!!")
})