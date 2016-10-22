const strftime = require('strftime')

module.exports = {
  log                       : log,
  keepAwake                 : keepAwake,
  listenToUncaughtException : listenToUncaughtException
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