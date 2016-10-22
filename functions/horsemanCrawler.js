// var Horseman = require('node-horseman');
// var horseman = new Horseman();
// var log      = require('./common.js').log

// module.exports = {
// 	firstCrawler : crawler
// }

// function crawler () {
// 	// /* OK */ var clickUrl = 'https://156182.measurementapi.com/serve?action=click&publisher_id=156182&site_id=15284&mac_address=%{mac_address}&device_id=%{mobile_id}&android_id=%{android_id}&sub1=%{impression_id}&sub_publisher=Revmob&sub_campaign=passenger_android_display_RON&sub_ad=Native&sub_placement=%{creative_size}&sub_site=%{app_id}&sub3=ALL'
// 	// /* NOT */ var clickUrl = 'https://control.kochava.com/v1/cpi/click?campaign_id=kowiso----ios540e483cae4ead0a6e8d3c3c99&network_id=187&campaignid=%{campaign_id}&device_id=%{identifier_for_advertising}&device_id_type=idfa&impression=%{impression_id}&mac=%{mac_address}&site_id=%{app_id}&campaign_tier1_value=569eae25215c38044024ec9b&campaign_tier1_name=mza10019:mzp0074:MobileStrike-iOS-MQ-US-ipad,iphone-WL1PUB'
// 	// /* OK */ var clickUrl = 'https://app.adjust.com/v24wy0?campaign=2016_05_04-AdventureCapitalist-CPI-US-S&creative=Video&adgroup=%{app_id}&install_callback=https://s2s.revmob.com/api/v4/conversion/%{impression_id}/conversion.json'
// 	// /* OK */ var clickUrl = 'http://xqewk.trackvoluum.com/18a80815-945b-4a24-ab35-8d7078a68e2f?appid=%{app_id}&appname=%{app_name}&GoogleAdvertingID=%{identifier_for_advertising}&idfa=%{idfa}&source=9&impression_id=%{impression_id}'
// 	// /* OK */ var clickUrl = 'http://xqewk.trackvoluum.com/18a80815-945b-4a24-ab35-8d7078a68e2f?appid=%{app_id}&appname=%{app_name}&GoogleAdvertingID=%{identifier_for_advertising}&idfa=%{idfa}&source=9&impression_id=%{impression_id}'
// 	var clickUrl = 'https://c.trackmytarget.com/c216q3/?click_id=%{impression_id}&source_id=%{app_id}&idfa=%{idfa}'

// 	log('horsemanCrawler started!')
// 	var horseman = new Horseman();
//   return Promise.resolve(horseman
//     .open(clickUrl)
//     .wait(5000)
//     .url())
//     .then(function(newUrl) {
//       log(newUrl)
//     })
//     .catch(function(err) {
//       log(err.stack)
//       return null
//     })
// }