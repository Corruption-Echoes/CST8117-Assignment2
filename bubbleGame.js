// Gets the neccesary field variables
const bubbleContainer = document.getElementById('BubbleContainer')
const playWidth = bubbleContainer.getBoundingClientRect().width
const playHeight = bubbleContainer.getBoundingClientRect().height
// Controls bubble position offset(for centering)
const bubbleWidth = 20
const bubbleHeight = 20
const halfWidth = bubbleWidth / 2
// Controls bubble upward/horizontal speed. Bigger numbers=Bigger jumps
const bubbleSpeed = 3
const bubbleHorizontalSpeed = 5
const bubbleHorizontalPercent = 0.25// Percentage a bubble should move left or right
const overflowModeWrap = true
// Controls the fps (animation smoothness) bubble speed SCALES exponentially with this
const desiredFPS = 120
const animationSpeed = 1000 / desiredFPS
// Controls automated bubble spawning
const maximumBubbles = 100
const bubbleFlowRate = 1// Multiplier for bubble spawns
let dynamicFlowRate = bubbleFlowRate
const bubbleFlowPrejudiceRate = 1.005 // Multiplier applied to dynamicRate when spawn fails(except at max pop)
const bubbleSpawnPercentage = 0.0225// Must be a float
const bubbleWeight = 0.5
const breakWeight = 0.5
// Controls the scoring system
const scoreBoardTemplate = document.getElementById('scoreboard').textContent
const streakBoardTemplate = document.getElementById('streakboard').textContent
let score = 0
let streak = 0
const scorePer = 100
const streakMultiplier = 1.1

// Creates bubble objects and places them in the container
function createBubble () {
  const construct = document.createElement('Button')
  construct.className = 'pointGiver bubble'
  construct.textContent = 'O'
  construct.style.left = pickSpawner() + 'px'
  construct.style.bottom = '0px'
  construct.onclick = addPoints
  bubbleContainer.appendChild(construct)
}
function createStreakBreaker () {
  const construct = document.createElement('Button')
  construct.className = 'streakBreaker bubble'
  construct.textContent = 'X'
  construct.style.left = pickSpawner() + 'px'
  construct.style.bottom = '0px'
  construct.onclick = removeStreak
  bubbleContainer.appendChild(construct)
}
function addPoints () {
  streak++
  score += scorePer * (streak * streakMultiplier)
  document.getElementById('scoreboard').textContent = scoreBoardTemplate + score
  document.getElementById('streakboard').textContent = streakBoardTemplate + streak
  this.remove()
}
function removeStreak () {
  streak = 0
  document.getElementById('streakboard').textContent = streakBoardTemplate + streak
  this.remove()
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
      if (type > bubbleWeight) {
        createBubble()
      } else {
        createStreakBreaker()
      }
      dynamicFlowRate = bubbleFlowRate
    } else if (bubbleFlowPrejudiceRate > 1) {
      dynamicFlowRate = bubbleFlowRate * bubbleFlowPrejudiceRate
    }
  }
}
// Core update loop
function animate () {
  const bubbles = document.getElementsByClassName('bubble')
  if (bubbles.length > 0) {
    Array.prototype.forEach.call(bubbles, bubbleWander)
  }
  bubbleSpawnCheck(bubbles)
}
// Initialize the boards and start the loop
document.getElementById('scoreboard').textContent = scoreBoardTemplate + score
document.getElementById('streakboard').textContent = streakBoardTemplate + '0'
setInterval(animate, animationSpeed)
