const app              = require('../functions/server').app
const commonFunctions  = require('../functions/common')
const log              = commonFunctions.log
const summarizeMongo   = require('../functions/mongo.js').summarize
const routesForLanding = ['/', '/uptimeCheck']

module.exports = {
  init : initRoutes
}

function initRoutes() {
  routesForLanding.forEach(function(route){
    serverFunctions.app.get(route, function(req, res){
      res.send('Yabadabadoo')
    })
  })


} 