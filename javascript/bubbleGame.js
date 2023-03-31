// Gets the neccesary field variables
const bubbleContainer = document.getElementById('BubbleContainer')
const Decorative = document.getElementsByClassName('decorative')
// Decorative.style.backgroundColor = 'red'
const playWidth = bubbleContainer.getBoundingClientRect().width
const playHeight = bubbleContainer.getBoundingClientRect().height
// Controls bubble position offset(for centering)
const bubbleWidth = 20
const bubbleHeight = 20
const bubbleScale = 3
const halfWidth = bubbleWidth / 2
// Controls bubble upward/horizontal speed. Bigger numbers=Bigger jumps
const bubbleSpeed = 2
const bubbleHorizontalSpeed = 3
const bubbleHorizontalPercent = 0.25// Percentage a bubble should move left or right
const overflowModeWrap = true
// Controls the fps (animation smoothness) bubble speed SCALES exponentially with this
const desiredFPS = 60
const animationSpeed = 1000 / desiredFPS
const gameLength = 60000
let gameTime = 0
let intervalID = ''
// Controls automated bubble spawning
const maximumBubbles = 100
const bubbleFlowRate = 1// Multiplier for bubble spawns
let dynamicFlowRate = bubbleFlowRate
const bubbleFlowPrejudiceRate = 1.015 // Multiplier applied to dynamicRate when spawn fails(except at max pop)
const bubbleSpawnPercentage = 0.0225// Must be a float
const bubbleWeight = 0.6
const breakWeight = 0.3
const goldWeight = 0.1
// Controls the scoring system
const scoreBoardTemplate = document.getElementById('scoreboard').textContent
const streakBoardTemplate = document.getElementById('streakboard').textContent
let score = 0
let streak = 0
const scorePer = 100
const streakMultiplier = 1.1
const goldMultiplier = 10

// Creates bubble objects and places them in the container
function createBubble (mode) {
  const construct = document.createElement('a')
  const image = document.createElement('img')
  construct.appendChild(image)
  construct.style.left = pickSpawner() + 'px'
  construct.style.bottom = '0px'
  image.style.width = bubbleWidth * bubbleScale + 'px'
  image.style.height = bubbleHeight * bubbleScale + 'px'
  construct.className = 'bubble'
  if (mode === 'normal') {
    construct.onclick = addPoints
    image.src = 'images/Bubble.png'
  } else if (mode === 'break') {
    image.src = 'images/redBubble.png'
    construct.onclick = removeStreak
  } else if (mode === 'gold') {
    image.src = 'images/goldBubble.png'
    construct.onclick = addGoldPoints
  }
  bubbleContainer.appendChild(construct)
}
function addGoldPoints () {
  streak++
  score += scorePer * goldMultiplier * (streak * streakMultiplier)
  document.getElementById('scoreboard').textContent = scoreBoardTemplate + score
  document.getElementById('streakboard').textContent = streakBoardTemplate + streak
  this.onclick = null
}
function addPoints () {
  streak++
  score += scorePer * (streak * streakMultiplier)
  document.getElementById('scoreboard').textContent = scoreBoardTemplate + score
  document.getElementById('streakboard').textContent = streakBoardTemplate + streak
  this.onclick = null
}
function removeStreak () {
  streak = 0
  document.getElementById('streakboard').textContent = streakBoardTemplate + streak
  this.onclick = null
}
// Controls bubble movement
function bubbleWander (bubble) {
  bubble.style.bottom = (parseInt(bubble.style.bottom) + (Math.random() * bubbleSpeed)) + 'px'
  // Generate a random number to determine left/right movement
  const Horizontal = Math.random()
  if (Horizontal < 0 + bubbleHorizontalPercent) {
    bubble.style.left = (parseInt(bubble.style.left) + (Math.random() * bubbleHorizontalSpeed)) + 'px'
  } else if (Horizontal > 1 - bubbleHorizontalPercent) {
    bubble.style.left = (parseInt(bubble.style.left) - (Math.random() * bubbleHorizontalSpeed)) + 'px'
  }
  overflowPrevention(bubble)
  // Kill bubbles when they reach the termination point
  if (parseInt(bubble.style.bottom) + bubbleHeight > playHeight) {
    bubble.remove()
  }
}
function bubbleAnimate (bubble) {
  if (bubble.onclick == null) {
    const x = bubble.firstChild.src
    // console.log(x)
    if (Math.random() > 0.7) {
      if (x.includes('ubble.')) {
        bubble.firstChild.src = 'images/pop1.png'
      } else if (x.includes('p1')) {
        bubble.firstChild.src = 'images/pop2.png'
      } else if (x.includes('p2')) {
        bubble.firstChild.src = 'images/pop3.png'
      } else if (x.includes('p3')) {
        bubble.firstChild.src = 'images/pop4.png'
      } else if (x.includes('p4')) {
        bubble.firstChild.src = 'images/pop5.png'
      } else if (x.includes('p5')) {
        bubble.firstChild.src = 'images/pop6.png'
      } else if (x.includes('p6')) {
        bubble.firstChild.src = 'images/pop7.png'
      } else if (x.includes('p7')) {
        bubble.firstChild.src = 'images/pop8.png'
      } else if (x.includes('p8')) {
        bubble.remove()
      }
    }
  }
}
function overflowPrevention (bubble) {
  // Make sure bubbles stay in their container properly!
  if (!overflowModeWrap) {
    if (parseInt(bubble.style.left) < 0) {
      bubble.style.left = 0
    } else if (parseInt(bubble.style.left) + halfWidth > playWidth) {
      bubble.style.left = playWidth
    }
  } else {
    if (parseInt(bubble.style.left) < 0) {
      bubble.style.left = playWidth - bubbleWidth + 'px'
    } else if (parseInt(bubble.style.left) + halfWidth > playWidth) {
      bubble.style.left = bubbleWidth + 'px'
    }
  }
}
// Picks the spawn left coordinate
function pickSpawner () {
  const x = Math.floor(Math.random() * playWidth)
  return x
}
// Handles bubble automated spawning
function bubbleSpawnCheck (bubbles) {
  if (bubbles.length < maximumBubbles) {
    if (Math.random() * dynamicFlowRate > 1 - bubbleSpawnPercentage) {
      const type = Math.random()
      if (type < bubbleWeight) {
        createBubble('normal')
      } else if (type < bubbleWeight + breakWeight) {
        createBubble('break')
      } else {
        createBubble('gold')
      }
      dynamicFlowRate = bubbleFlowRate
    } else if (bubbleFlowPrejudiceRate > 1) {
      dynamicFlowRate = bubbleFlowRate * bubbleFlowPrejudiceRate
    }
  }
}
function logout () {
  localStorage.removeItem('userID')
  const address = 'main.html'
  window.location.href = address
}
function wipeBubble () {
  const bubbles = document.getElementsByClassName('bubble')
  Array.prototype.forEach.call(bubbles, deleteBubble)
  const nbubbles = document.getElementsByClassName('bubble')
  if (nbubbles.length > 0) {
    clearInterval(intervalID)
  }
}
function deleteBubble (bubble) {
  bubble.remove()
}
// Core update loop
function update () {
  const bubbles = document.getElementsByClassName('bubble')
  gameTime += animationSpeed
  Decorative.style.height = playHeight * (gameLength / gameTime) + 'px'
  // console.log(gameTime)
  if (gameTime > gameLength) {
    clearInterval(intervalID)
    intervalID = setInterval(wipeBubble, animationSpeed * 3)
    registerHighscore(score, replay)
  } else {
    bubbleSpawnCheck(bubbles)
  }
  if (bubbles.length > 0) {
    Array.prototype.forEach.call(bubbles, bubbleWander)
    Array.prototype.forEach.call(bubbles, bubbleAnimate)
  }
}
function replay () {

}
// Initialize the boards and start the loop
document.getElementById('scoreboard').textContent = scoreBoardTemplate + score
document.getElementById('streakboard').textContent = streakBoardTemplate + '0'
intervalID = setInterval(update, animationSpeed)
