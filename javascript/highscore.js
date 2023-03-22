
const highscoreContainer = document.getElementById('highscoreContainer')
const personalContainer = document.getElementById('personalConstainer')

const userName = localStorage.getItem('userID')

function printHighscores (leaderboardData) {
  // console.log('Data Received:' + leaderboardData)
  highscoreContainer.innerHTML = leaderboardData
}
function printPersonalHighscores (leaderboardData) {
  personalContainer.innerHTML = leaderboardData
}
function loadHighscores () {
  getHighscores(printHighscores)
  if (userName !== null) { getHighscore(userName, printPersonalHighscores) }
}

loadHighscores()
