const strftime = require('strftime')
const u        = require('underscore')

module.exports = {
  log                       : log,
  keepAwake                 : keepAwake,
  listenToUncaughtException : listenToUncaughtException,
  filter                    : filterJson,
}

function log (message, details) {
  var fileNameLineNumber = ""
  var dateTime = strftime("%Y-%m-%d %H:%M:%S:%L") + ' -'
  if(!details){
    var stacklist = (new Error()).stack.split('\n')
    var parseError = stacklist[2].split('/')
    fileNameLineNumber = parseError[parseError.length - 1] + " -"
  }
  if(typeof message == 'string'){
    console.log(dateTime, fileNameLineNumber, message)
  }
  else{
    console.log(dateTime, fileNameLineNumber)
    console.log(message)
  }
  return dateTime + fileNameLineNumber + "\n" + JSON.stringify(message)
}

function keepAwake (){
  log('keepAwake job!')
}

function listenToUncaughtException() {
  process.on('uncaught exception', function(err){
      log(err)
      process.exit(1);
  })
}

function filterJson (json) {
  var newJson = {}
  u.each(json, function (value, key) {
    if (value || value === false) newJson[key] = value
  })
  return newJson
}