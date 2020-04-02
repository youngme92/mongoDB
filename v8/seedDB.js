const mongoose = require("mongoose")
const hotArtist = require("./models/artist")
const Comment = require("./models/comment")
var data = [
    {
        name: "Kanye West",
        url: "https://www.whosampled.com/static/track_images_200/lr57_20081014_193422490889.jpg",
        description: "카녜이 웨스트는 애틀랜타에서 태어났다. 세 살 때 부모가 이혼을 하자 그는 시카고로 오게되며, 그 곳에서 미술을 공부하고, 시카고 주립대학에 입학했다. 그러나 그는 자신의 음악 직업 때문에 자퇴를 했다. 그 후 그는 R&B와 힙합 전문 프로듀서가 되었고, Jay-Z, Talib kweli, 캄론, 폴 월, 커먼, 맙딥, 얼리샤 키스, 재닛 잭슨, 더 게임, 스카페이스 등의 음반을 프로듀싱했다. 데릭 안젤레티(Deric Angelettie)의 고스트 프로듀서였으며, 나스에 앨범에 참여했었다."
    },
    {
        name: "xxxtentacion",
        url: "https://www.whosampled.com/static/track_images_200/lr140505_201777_0170785259.jpg",
        description: "야세 드웨인 리카르도 온프로이(영어: Jahseh Dwayne Ricardo Onfroy, 1998년 1월 23일 ~ 2018년 6월 18일)는 예명 XXX텐타시온(XXXTENTACION,[a] (/ˌɛksˌɛksˌɛksˌtɛntəˈsjɒn/)[9])으로 잘 알려진 미국의 래퍼, 가수, 작사가, 음악가, 유튜버였다 2018년 6월 18일 플로리다 주 디어필드비치의 한 모터사이클 가게를 떠난 후 총격으로 사망하였다"
    }
]
function seedDB(){
    hotArtist.remove({},function(err){
        if(err){
            console.log(err)
        } else {
            console.log("All Artist removed!")
        }
    })
    // // add a few artist
    // data.forEach(function(seed){
    //     hotArtist.create(seed, function(err, data){
    //         if(err){
    //             console.log(err)
    //         } else {
    //             console.log("added new Artist")
    //             // Create a comment
    //             Comment.create({
    //                 text: "there are many things",
    //                 author: "mean"
    //             }, function(err, comment){
    //                 if(err){
    //                     console.log(err)
    //                 } else {
    //                     data.comments.push(comment)
    //                     data.save()
    //                     console.log("create new comment!!")
    //                 }
    //             })
    //         }
    //     })
    // })
}

module.exports = seedDB