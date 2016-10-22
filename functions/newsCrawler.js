// var Nightmare = require('nightmare')
// var async = require('async')
// var urlUSDBRL = "http://www.bloomberg.com/quote/USDBRL:CUR"; var urlEURBRL = "http://www.bloomberg.com/quote/EURBRL:CUR"
// var lastDollar = 0; var lastEuro = 0;

// module.exports = {
//   crawler : getForexFromBloomberg,
// }

// function getForexFromBloomberg () {
//   var nightmare = Nightmare() //To see crawler workin insert {show: true}
//   var array = []
//   async.series([
//     function (cb) {
//       nightmare
//         .goto('http://www.bloomberg.com/quote/USDBRL:CUR')
//         .evaluate(function () {
//           return {
//             currentRate: document.getElementsByClassName("price")[0].innerText,
//             yesterdayRate: document.getElementsByClassName('cell__value cell__value_')[6].innerText,
//             name: "USD"
//           }
//         })
//         .then(function (res) {
//           array.push(res)
//           cb()
//         })
//     },

//     function (cb1) {
//       nightmare
//         .goto('http://www.bloomberg.com/quote/EURBRL:CUR')
//         .evaluate(function () {
//           return {
//             currentRate: document.getElementsByClassName("price")[0].innerText,
//             yesterdayRate: document.getElementsByClassName('cell__value cell__value_')[6].innerText,
//             name: "EUR"
//           }
//         })
//         .then(function (res) {
//           array.push(res)
//           cb1()
//         })
//     },

//     //function(cb2){
//     //  nightmare
//     //    .goto('http://agenciacma.com.br/')
//     //    .wait(2000)
//     //    .evaluate(function () {
//     //      var str = ""
//     //      var length = document.querySelectorAll('a[class="linkmodulotopnews"]').length
//     //      var array = Array.apply(null, {length: length}).map(Number.call, Number)
//     //      array.forEach(function(n){
//     //        str += document.querySelectorAll('a[class="linkmodulotopnews"]')[n].innerText + "; "
//     //      })
//     //      return str
//     //    })
//     //    .end()
//     //    .then(function (res) {
//     //      array.push(res)
//     //      cb2()
//     //    })
//     //}

//     function(cb2){
//       nightmare
//         .goto('http://www.valor.com.br/ultimas-noticias')
//         .wait(2000)
//         .evaluate(function () {
//           var str = ""
//           var length = document.getElementsByClassName('title2').length
//           var array = Array.apply(null, {length: length}).map(Number.call, Number)
//           array.forEach(function(n){
//             str += document.getElementsByClassName('title2')[n].innerText + "; "
//           })
//           return str
//         })
//         .end()
//         .then(function (res) {
//           array.push(res)
//           cb2()
//         })
//     }
//   ], function () {
//     var dollarPrice = Number(array[0].currentRate)
//     var dollarYesterday = Number(array[0].yesterdayRate)
//     var euroPrice = Number(array[1].currentRate)
//     var euroYesterday = Number(array[1].yesterdayRate)
//     var news = array[2]

//     var deltaDollar = 0; var deltaEuro = 0; var directionDollar = ""; var directionEuro = ""
//     deltaDollar = (Math.round((Number(dollarPrice) / lastDollar - 1) * 100 * 10000) / 10000).toFixed(4)
//     deltaEuro = (Math.round((Number(euroPrice) / lastEuro - 1) * 100 * 10000) / 10000).toFixed(4)

//     if (deltaDollar > 0) directionDollar = "\u21e7"
//     else if (deltaDollar == 0) directionDollar = "-"
//     else directionDollar = "\u21e9"

//     if (deltaEuro > 0) directionEuro = "\u21e7"
//     else if (deltaEuro == 0) directionEuro = "-"
//     else directionEuro = "\u21e9"

//     var dollarVarYesterday = (Math.round((Number(dollarPrice) / dollarYesterday - 1) * 100 * 10000) / 10000).toFixed(4)
//     var euroVarYesterday = (Math.round((Number(euroPrice) / euroYesterday - 1) * 100 * 10000) / 10000).toFixed(4)

//     var d = new Date(); d.setMinutes(d.getMinutes() - 7)

//     console.log('\033c')
//     console.log("Time: " + d.getFullYear() + "/" + (Number(d.getMonth()) + 1) + "/" + d.getDate() + " - " + d.toString().substring(16, 24) + " " + d.toString().substring(35, 38) +
//       "; R$/USD " + dollarPrice + " " + directionDollar + "  var: " + deltaDollar + "% varFromYD: " + dollarVarYesterday + "%" +
//       "; R$/EUR " + euroPrice + " " + directionEuro + "  var: " + deltaEuro + "% varFromYD: " + euroVarYesterday + "%")

//     logBreakingNews(news)

//     lastDollar = Number(dollarPrice); lastEuro = Number(euroPrice)
//   })
// }

// var interval
// var logBreakingNews = function(news){
//   var newString = ""
//   var screenSize = 230; var counter = 231;
//   var newsSplit = news.split("");
//   newsSplit.forEach(function(l, i){
//     if(i < screenSize){
//       newString += l
//     }
//   })
//   clearInterval(interval)
//   interval = setInterval(function() {
//     process.stdout.clearLine();  // clear current text
//     process.stdout.cursorTo(0);  // move cursor to beginning of line

//     if (counter == newsSplit.length) {
//       counter = 0
//       newString = newString.substring(1, newString.length)
//       newString += newsSplit[counter]
//       counter++
//     } else if(counter < screenSize){
//       newString = newString.substring(1, newString.length)
//       newString += newsSplit[counter]
//       counter++
//     } else {
//       newString = newString.substring(1, newString.length)
//       newString += newsSplit[counter]
//       counter++
//     }

//     process.stdout.write(newString);  // write text
//   }, 100)
// }
