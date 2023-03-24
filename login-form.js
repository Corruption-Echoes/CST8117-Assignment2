
// check for input validation and alert if getting empty input
const user = document.getElementById('username')
const pw = document.getElementById('password')
const loginBtn = document.getElementById('login-button')
const usernameAlert = document.getElementById('empty-username')
const pwAlert = document.getElementById('empty-password')

const valid = () => {
  user.addEventListener('input', e => e.preventDefault())
  const username = user.value

  pw.addEventListener('input', e => e.preventDefault())
  const password = pw.value

  if (!(username && password)) {
    if (!username) {
      loginBtn.addEventListener('click', e => {
        e.preventDefault()
        usernameAlert.classList.remove('hide')
      })
      return false
    }
    if (!password) {
      loginBtn.addEventListener('click', e => {
        e.preventDefault()
        pwAlert.classList.remove('hide')
      })
      return false
    }
  } else {
    return true
  }
}

// redirect to other pages
const login = () => {
  if (valid()) {
    if (loggedIn()) {
      location = 'game.html'
    }
  }
}

const register = () => {
  location = 'registration.html'
}
