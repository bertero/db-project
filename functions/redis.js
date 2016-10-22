const redis          = require('redis')
const auth           = { auth_pass : process.env.SUMMARIES_REDIS_AUTH || 'Summaries16*' }
const summariesRedis = redis.createClient('15668', 'pub-redis-15668.us-east-1-4.3.ec2.garantiadata.com', auth)
const log            = require('../functions/common.js').log

module.exports = {
	summariesRedis : summariesRedis,
	summarize      : summarize
}

function summarize (route) {
	summariesRedis.hincrby('rs', route, 1, function(err){
		if(err) log(err)
	})
}