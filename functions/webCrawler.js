var request            = require('request')
var cheerio            = require('cheerio')
var URL                = require('url-parser')
var u                  = require('underscore')
var strftime           = require('strftime')
var async              = require('async')
var api_key            = 'key-7ad8eebeaea3a30d05ae433e507fbb11'
var domain             = 'sandboxc746da069aca49db8e6b10a583928903.mailgun.org'
var mailgun            = require('mailgun-js')({apiKey: api_key, domain: domain})
var SEARCH_WORD        = ("previous close").toLowerCase()
var commonFunctions    = require('./common.js')
var log                = commonFunctions.log

module.exports = {
  webCrawler        : webCrawler,
  webCrawlerDaily   : webCrawlerDaily,
  webCrawlerHourly  : webCrawlerHourly,
  webCrawlerMorning : webCrawlerMorning
}

function webCrawlerDaily () {
  var stocks = require('../assets/myStocks.json')
  webCrawler(stocks, true, 'daily')
}

function webCrawlerHourly () {
  var stocks = require('../assets/options.json')
  webCrawler(stocks, true, 'hourly')
}

function webCrawlerMorning () {
  var stocks = require('../assets/commodities.json')
  webCrawler(stocks, true, 'morning')
}

function webCrawler(stocks, shouldSendMail, when, callback) {
  log('Stock Quotes Update has started!')
  var message = 'Cotação atualizada:\n\n'
  var subject = when == 'hourly' ? 'Atualização Cotação PETRF9 - ' : (when == 'daily' ? 'Report Diário de Ações - ' : 'Report Matinal - ')
  subject += strftime("%Y-%m-%d", new Date())
  if(callback){
    var myStocks = require('../assets/myStocks.json')
    var options  = require('../assets/options.json')
    stocks = u.extend(myStocks, options)
  }
  else var mailTo  = ['guilherme.bertero@gmail.com']

  async.each(Object.keys(stocks), function(stock, cb){
    var url = "http://www.bloomberg.com/quote/" + stock + ":" + stocks[stock].end
    request(url, function(error, response, body) {
      if(response.statusCode !== 200) {
       cb()
      }
      var buyingPrice   = stocks[stock].p
      var stockQuantity = stocks[stock].q
      var $             = cheerio.load(body);
      var searchResults = searchForWord($, SEARCH_WORD);
      if(searchResults.isWordFound) {
        var stockParams = searchResults.params
        var priceNow = Number(stockParams.priceNow.split('b')[0])
        if(priceNow < Number(stockParams.open)){
          stockParams.percentageVariation = '-' + stockParams.percentageVariation
          stockParams.priceVariation      = '-' + stockParams.priceVariation
        }
        message +=  'Stock: ' + stock + '\n\n' + JSON.stringify(stockParams, null, 2)
        message += '\n\nBuying Price: R$ ' + buyingPrice + '\nStock Quantity: ' + stockQuantity
        message += '\nStarting Investment Value: R$ ' + (stockQuantity * buyingPrice).toFixed(2)
        message += stock == 'PETRE46' ? '\nStarting Investment Value per Person: R$ ' + (stockQuantity * buyingPrice / 3).toFixed(2) : ''
        message += '\nActual Investment Value: R$ ' + (stockQuantity * priceNow).toFixed(2)
        message += stock == 'PETRE46' ? '\nActual Investment Value per Person: R$ ' + (stockQuantity * priceNow / 3).toFixed(2) : ''
        message += '\nInvestment Return: ' + (100 * priceNow / buyingPrice - 100).toFixed(3) + '%'
        message += '\n' + url
        message += '\n\n----------------------------------\n\n'
        cb()
      }
    })
  }, function(){
    if(shouldSendMail){
      var data = {
       from: 'Bert\'s Automatic Stock Quotation <postmaster@sandboxc746da069aca49db8e6b10a583928903.mailgun.org>',
       to: mailTo,
       subject: subject,
       text: message
      }
      mailgun.messages().send(data, function (error, body) {
      if(error){
        log(error)
        log(body)
      }
      else log('Message ' + body.message)
      })
    }
    else{
      log('Done! Sending response now!')
      callback(message)
    }
  })
}

function searchForWord($, word) {
  var bodyText       = $('html > body').text().toLowerCase();
  var wordStartIndex = bodyText.indexOf(word.toLowerCase())
  var brlIndex       = bodyText.indexOf('brl'.toLowerCase())
  var resultString   = (bodyText.substring(wordStartIndex - 500, wordStartIndex + 100)).replace(/(\r\n|\n\n|\r|)/gm, ',')
  resultString = resultString.replace(/ /g, '')
  resultString = resultString.replace(/,/g, '')
  resultsArray = u.compact(resultString.split('\n'))
  var stockParams = {
    priceNow : resultsArray[0],
    priceVariation : Number(resultsArray[1]),
    percentageVariation : resultsArray[2]
  }
  for(var index = 3; index < resultsArray.length; index += 2){
    if(resultsArray[index].indexOf('asof4') < 0){
      stockParams[resultsArray[index]] = resultsArray[index + 1]
    }
    else index -= 1
  }

  return {isWordFound : (bodyText.indexOf(word.toLowerCase()) !== -1), params : stockParams}
}

// function collectInternalLinks($) {
//     var relativeLinks = $("a[href^='/']");
//     console.log("Found " + relativeLinks.length + " relative links on page");
//     relativeLinks.each(function() {
//         pagesToVisit.push(baseUrl + $(this).attr('href'));
//     });
// }