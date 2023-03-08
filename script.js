// Gets the neccesary field variables
const bubbleContainer = document.getElementById('BubbleContainer')
const leftMargin = document.getElementsByClassName('leftMarker')[0].getBoundingClientRect().right
const playWidth = document.getElementsByClassName('rightMarker')[0].getBoundingClientRect().left - leftMargin
const playHeight = bubbleContainer.getBoundingClientRect().bottom - bubbleContainer.getBoundingClientRect().top
// Controls bubble position offset(for centering)
const bubbleWidth = 20
const bubbleHeight = 20
const halfWidth = bubbleWidth / 2
// Controls bubble upward/horizontal speed. Bigger numbers=Bigger jumps
const bubbleSpeed = 2
const bubbleHorizontalSpeed = 5
const bubbleHorizontalPercent = 0.25// Percentage a bubble should move left or right
const overflowModeWrap = true
// Controls the fps (animation smoothness) bubble speed SCALES exponentially with this
const desiredFPS = 60
const animationSpeed = 1000 / desiredFPS
// Controls automated bubble spawning
const maximumBubbles = 50
const bubbleFlowRate = 1// Multiplier for bubble spawns
let dynamicFlowRate = bubbleFlowRate
const bubbleFlowPrejudiceRate = 1.001 // Multiplier applied to dynamicRate when spawn fails(except at max pop)
const bubbleSpawnPercentage = 0.05// Must be a float

// Creates bubble objects and places them in the container
function createBubble () {
  const construct = document.createElement('Button')
  construct.className = 'bubble'
  construct.textContent = 'O'
  construct.style.left = pickSpawner() + 'px'
  construct.style.bottom = '0px'
  bubbleContainer.appendChild(construct)
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
  console.log('Bubble Spawned')
  return x
}
// Handles bubble automated spawning
function bubbleSpawnCheck (bubbles) {
  if (bubbles.length < maximumBubbles) {
    if (Math.random() * dynamicFlowRate > 1 - bubbleSpawnPercentage) {
      createBubble()
      dynamicFlowRate = bubbleFlowRate
    } else if (bubbleFlowPrejudiceRate > 1) {
      dynamicFlowRate = bubbleFlowRate * bubbleFlowPrejudiceRate
    }
  }
}
// Core update system
function animate () {
  const bubbles = document.getElementsByClassName('bubble')
  if (bubbles.length > 0) {
    Array.prototype.forEach.call(bubbles, bubbleWander)
  }
  bubbleSpawnCheck(bubbles)
}

setInterval(animate, animationSpeed)
