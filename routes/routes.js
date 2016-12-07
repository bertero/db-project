const app              = require('../functions/server').app
const commonFunctions  = require('../functions/common')
const log              = commonFunctions.log
const summarizeMongo   = require('../functions/mongo.js').summarize
const routesForLanding = ['/health', '/uptimeCheck']
const renderMap        = {
	admin     : require('../controllers/adminScreen'),
	viewQuery : require('../controllers/viewQuery'),
	edit      : require('../controllers/edit'),
  create    : require('../controllers/create'),
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

  //Admin Home
  app.get('/admin', renderMap.admin)

  //Search and render query results
  app.post('/admin/viewQuery', renderMap.viewQuery)

  //Persist modifications and re-render query results
  app.post('/admin/edit', renderMap.edit)

  //Persist new documents
  app.post('/admin/create', renderMap.create)

}