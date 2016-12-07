const log     = require('../functions/common').log
const findDoc = require('../functions/mongo.js').find
const u       = require('underscore')

module.exports = function (req, res) {

	findDoc('produtos', null, { nome : 1 }, function (err, availableProducts) {

		availableProducts = u.map(availableProducts, function (productObj) { return productObj.nome })

		log(availableProducts)

		if (!availableProducts) availableProducts = ['Estoque Vazio']
		res.render('../views/adminScreen.ejs', { numberProducts : 5, availableProducts : availableProducts })

	})
}