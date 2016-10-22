var strftime = require('strftime')
var loggedIn = false

module.exports = {
  log         : log,
  loginAction : loginAction,
  loggedIn    : loggedIn,
  keepAwake   : keepAwake
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

function loginAction (req, res) {
  if(req && req.body){
    var body = req.body
    if(body.username && body.pass){
      if(body.username == process.env.MAIN_USER && body.pass == process.env.MAIN_PASS){
        loggedIn = true
        res.redirect('home')
      }
      else res.send('Invalid Credentials!')
    }
    else res.send('Please complete both fields!')
  }
  else res.send('Oops, something went wrong...')
}

function keepAwake (){
  log('keepAwake job!')
}