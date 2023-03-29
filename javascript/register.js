const userInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const passwordConfirm = document.getElementById('confirm-password')
const email = document.getElementById('email')
const phone = document.getElementById('phone')

function register () {
  if (validateInput(userInput.value) && validateInput(passwordInput.value) && validateInput(email.value) && validateInput(phone.value) && passwordInput.value === passwordConfirm.value) {
    attemptRegister(userInput.value, passwordInput.value, email.value, phone.value, registerResponseHandler)
  }
}

function registerResponseHandler (data) {
  if (data !== 'False') {
    localStorage.setItem('userID', data)
    sendToGame()
  } else {
    console.log('You have been banned')
  }
}
function sendToGame () {
  const address = 'game.html'
  //window.location.href = address
}

function validateInput (stringIn) {
  stringIn = stringIn.toLowerCase()
  if (stringIn === '' || stringIn.includes(';')) {
    console.log('returning false')
    return false
  }
  return true
}
