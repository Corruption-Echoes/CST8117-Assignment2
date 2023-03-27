
const highscoreContainer = document.getElementById('highscoreContainer')
const personalContainer = document.getElementById('personalConstainer')

const userID = localStorage.getItem('userID')

function printHighscores (leaderboardData) {
  // console.log('Data Received:' + leaderboardData)
  highscoreContainer.innerHTML = leaderboardData
}
function printPersonalHighscores (leaderboardData) {
  personalContainer.innerHTML = leaderboardData
}
function loadHighscores () {
  getHighscores(printHighscores)
  if (userID !== null) {
    getHighscore(userID, printPersonalHighscores)
  }
}

loadHighscores()
