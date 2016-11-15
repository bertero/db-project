const commonFunctions = require('../functions/common')
const log             = commonFunctions.log
const u               = require('underscore')
const filter          = commonFunctions.filter
const collections     = require('../functions/mongo').collections

module.exports = function (req, res) {
	const body = filter(req.body)
	collections[body.viewType]
		.find(u.omit(body, 'viewType'))
		.lean(true)
		.exec(function (err, result) {
			
		})
	log(body)
	return
	res.render('../views/queryView.ejs', { numberProducts : 1 })
}