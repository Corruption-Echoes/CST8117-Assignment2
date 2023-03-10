const highscoreContainer = document.getElementById('highscoreContainer')
function retrieveHighscores () {
  const leaderboardData = APIGOESHERE()

  const table = document.createElement('table')
  for (const score of leaderboardData) {
    table.appendChild(printToBoard(score))
  }
  highscoreContainer.appendChild(table)
}
function printToBoard (score) {
  const row = document.createElement('tr')
  const nameTD = document.createElement('td')
  const scoreTD = document.createElement('td')
  const timeTD = document.createElement('td')
  nameTD.textContent = score.name
  scoreTD.textContent = score.score
  timeTD.textContent = score.time
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
