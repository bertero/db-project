const api_key = 'key-7ad8eebeaea3a30d05ae433e507fbb11'
const domain  = 'sandboxc746da069aca49db8e6b10a583928903.mailgun.org'
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})
const log     = require('./common.js').log

module.exports = {
	sendMail : sendMail
}

function sendMail (from, mailTo, subject, message, html, callback) { //TODO: attachments

	var mailData = {
		from    : from,
		to      : mailTo,
		subject : subject,
		text    : message
	}

	if (message) mailData.text = message
	else mailData.html         = html

	mailgun.messages().send(mailData, function (error, body) {
		callback(error, body)
	})

}