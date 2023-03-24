const userInput = document.getElementById('username')
const passwordInput = document.getElementById('password')

function login () {
  attemptLogin(userInput.value, passwordInput.value, loginResponseHandler)
}
function register () {
  const address = 'registration.html?u=' + userInput.value + '&p=' + passwordInput.value
  window.location.href = address
}
function loginResponseHandler (data) {
  console.log(data)
}
