const userID = localStorage.getItem('userID')

function attemptLogin (userName, password, returnFunction) {
  sendQuery('L', userName + ':' + password, returnFunction)
}
function attemptRegister (userName, password, email, phone, returnFunction) {
  sendQuery('R', userName + ':' + password + ':' + email + ':' + phone, returnFunction)
}
function registerHighscore ( score, returnFunction) {
  sendQuery('H', userID + ':' + score, returnFunction)
}
function getHighscores (returnFunction) {
  sendQuery('G', 'G', returnFunction)
}
function getHighscore (returnFunction) {
  sendQuery('U', userID, returnFunction)
}
function sendQuery (mode, dataPacket, returnFunction) {
  const xhttpRequest = new XMLHttpRequest()
  xhttpRequest.onload = function () { returnFunction(this.responseText) }
  xhttpRequest.open('GET', 'php/QueryDatabase.php?' + mode + '=' + dataPacket)
  xhttpRequest.send()
}
