const userInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const errorOut = document.getElementById('errorDisplay')
if (localStorage('userID') !== null) {
  sendToGame()
}
function login () {
  attemptLogin(userInput.value, passwordInput.value, loginResponseHandler)
}
function register () {
  const address = 'registration.html?u=' + userInput.value + '&p=' + passwordInput.value
  window.location.href = address
}
function loginResponseHandler (data) {
  if (data !== 'False') {
    localStorage('userID') === parseInt(data)
    sendToGame()
  } else {
    errorOut.textContent = "That's not a valid username/password combination."
  }
}
function sendToGame () {
  const address = 'game.html'
  window.location.href = address
}
