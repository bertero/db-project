var cron                = require('cron')
var cronJob             = cron.CronJob
var webCrawlerFunctions = require('./webCrawler')
var common              = require('./common')

module.exports = {
  jobH               : jobH,
  initializeCronJobs : initializeCronJobs
}

function jobH (cronFrequency, functionToRun, ebEnvironmentNames, context, parameters){
  return new cronJob( cronFrequency, function(){ functionToRun(parameters) }, null, true, null, context )
}

function initializeCronJobs () {
	
	var hourlyWeekdaysString = '0 30 8-16 * * MON-FRI'
	var dailyString          = '0 00 17   * * MON-FRI'
	var hourlyString         = '0 00 *    * * *'
	var morningString        = '0 00 8    * * MON-FRI'
	
	// jobH(hourlyWeekdaysString, webCrawlerFunctions.webCrawlerHourly)
	jobH(dailyString,          webCrawlerFunctions.webCrawlerDaily )
	jobH(morningString,        webCrawlerFunctions.webCrawlerMorning)
	jobH(hourlyString,         common.keepAwake)
}