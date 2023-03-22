
const highscoreContainer = document.getElementById('highscoreContainer')
const personalContainer = document.getElementById('personalConstainer')
let ranking = 0
//const login = { username: 'waffle' }

function printHighscores (leaderboardData) {
  //console.log('Data Received:' + leaderboardData)
  highscoreContainer.innerHTML=leaderboardData
}
function loadHighscores(){
  getHighscores(printHighscores)
}

loadHighscores()