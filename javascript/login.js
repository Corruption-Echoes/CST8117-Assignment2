const userInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const errorOut = document.getElementById('errorDisplay')

function login () {
  if (validateInput) {
    attemptLogin(userInput.value, passwordInput.value, loginResponseHandler)
  } else {
    loginResponseHandler('False')
  }
}
function register () {
  const address = 'registration.html?u=' + userInput.value + '&p=' + passwordInput.value
  window.location.href = address
}
function loginResponseHandler (data) {
  if (data !== 'False') {
    localStorage.setItem('userID', data)
    sendToGame()
  } else {
    errorOut.textContent = "That's not a valid username/password combination."
  }
}
function sendToGame () {
  const address = 'game.html'
  window.location.href = address
}
function validateInput (stringIn) {
  stringIn = stringIn.toLowerCase()
  if (stringIn === '' || stringIn.includes(';', ''`'```)) {
    console.log('returning false')
    return false
  }
  return true
}
