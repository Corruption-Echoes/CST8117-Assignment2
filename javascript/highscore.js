const highscoreContainer = document.getElementById('highscoreContainer')
const personalContainer = document.getElementById('personalConstainer')
let ranking = 0
const login = { username: 'waffle' }

function retrieveHighscores () {
  const leaderboardData = APIGOESHERE()
  const table = document.createElement('table')
  for (const score of leaderboardData) {
    ranking++
    table.appendChild(printToBoard(score, ranking))
    if (score.name === login.name) {
      personalContainer.textContent = ' #' + ranking + ' ' + score.score
    }
  }
  highscoreContainer.appendChild(table)
}
function printToBoard (score, ranking) {
  const row = document.createElement('tr')
  const rankingTD = document.createElement('td')
  const nameTD = document.createElement('td')
  const scoreTD = document.createElement('td')
  const timeTD = document.createElement('td')
  rankingTD.textContent = ranking
  nameTD.textContent = score.name
  scoreTD.textContent = score.score
  timeTD.textContent = score.time
  row.appendChild(rankingTD)
  row.appendChild(nameTD)
  row.appendChild(scoreTD)
  row.appendChild(timeTD)
  return row
}
function APIGOESHERE () {
  const x = [{ name: 'x', score: '500', time: '2023/02/25' }, { name: 'x', score: '500', time: '2023/02/25' }, { name: 'x', score: '500', time: '2023/02/25' }]
  return x
}

retrieveHighscores()
