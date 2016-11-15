const app              = require('../functions/server').app
const commonFunctions  = require('../functions/common')
const log              = commonFunctions.log
const summarizeMongo   = require('../functions/mongo.js').summarize
const routesForLanding = ['/health', '/uptimeCheck']
const renderMap        = {
	admin     : require('../controllers/adminScreen'),
	viewQuery : require('../controllers/viewQuery')
}

module.exports = {
  init : initRoutes
}

function initRoutes() {
  routesForLanding.forEach(function (route) {
    app.get(route, function (req, res) {
      res.send('Yabadabadoo')
    })
  })

  app.get('/admin', renderMap.admin)
  app.post('/admin/viewQuery', renderMap.viewQuery)
}