
const highscoreContainer = document.getElementById('highscoreContainer')
const personalContainer = document.getElementById('personalContainer')

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
    getHighscore(printPersonalHighscores)
  }
}

loadHighscores()
