const webCrawlerFunctions = require('../functions/webCrawler')
const serverFunctions     = require('../functions/express.js')
const commonFunctions     = require('../functions/common.js')
const log                 = commonFunctions.log
const summarizeMongo      = require('../functions/mongo.js').summarize
const routesMap           = require('../assets/routesMap.json')

var routesForLanding = ['/', '/login', '/uptimeCheck']

routesForLanding.forEach(function(route){
	serverFunctions.app.get(route, function(req, res){
		res.send('Yabadabadoo')
	})
})

serverFunctions.app.get('/rs', function(req, res){
  summariesRedis.hget('rs', 'specialOffer', function(err, value){
  	if(err) res.send(500)
  	else res.send(value)
  })
})

var trackingRoutes = ['skatePorDiversao']

trackingRoutes.forEach(function(route){

  serverFunctions.app.get('/' + route, function(req, res){
    res.redirect(303, routesMap[route])
    summarizeMongo(route, req)
  })

})