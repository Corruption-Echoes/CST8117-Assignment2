const bubbles = []
const bubbleSpawners = document.getElementsByClassName('BubbleSpawnerDivs')

function createBubble () {
  const spawn = pickSpawner()
  bubbles.push({ x: spawn.left, y: 0 })
}

function bubbleWander (bubble) {
  bubble.style.bottom = bubble.y + 1
  bubble.y += 1
}

function pickSpawner () {
  return bubbleSpawners.random()
}

function animate () {
  for (const b in bubbles) {
    bubbleWander(b)
  }
}

setInterval(animate, 150)
