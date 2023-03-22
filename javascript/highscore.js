
const highscoreContainer = document.getElementById('highscoreContainer')
const personalContainer = document.getElementById('personalConstainer')
let ranking = 0
//const login = { username: 'waffle' }

function printHighscores (leaderboardData) {
  //console.log('Data Received:' + leaderboardData)
  highscoreContainer.innerHTML=leaderboardData
}
function APIGOESHERE () {
  const x = [{ name: 'x', score: '500', time: '2023/02/25' }, { name: 'x', score: '500', time: '2023/02/25' }, { name: 'x', score: '500', time: '2023/02/25' }]
  return x
}
function loadHighscores(){
  getHighscores(printHighscores)
}

loadHighscores()