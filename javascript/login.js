const userInput = document.getElementById('username')
const passwordInput = document.getElementById('password')

function login () {

}
function register () {
  const address = '../registration.html?u=' + userInput.value + '&p=' + passwordInput.value
  window.location.href = address
}
