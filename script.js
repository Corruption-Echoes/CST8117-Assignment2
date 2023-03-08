// Gets the neccesary field variables
const bubbleContainer = document.getElementById('BubbleContainer')
const leftMargin = document.getElementsByClassName('leftMarker')[0].getBoundingClientRect().right
const playWidth = document.getElementsByClassName('rightMarker')[0].getBoundingClientRect().left - leftMargin
const playHeight = bubbleContainer.getBoundingClientRect().bottom - bubbleContainer.getBoundingClientRect().top
// Controls bubble position offset(for centering)
const bubbleWidth = 20
const bubbleHeight = 20
// Controls bubble upward/horizontal speed. Bigger numbers=Bigger jumps
const bubbleSpeed = 5
const bubbleHorizontalSpeed = 5
// Controls the fps (animation smoothness) bubble speed SCALES exponentially with this
const desiredFPS = 30
const animationSpeed = 1000 / desiredFPS

function createBubble () {
  const construct = document.createElement('Button')
  construct.className = 'bubble'
  construct.textContent = 'O'
  construct.style.left = pickSpawner() + 'px'
  construct.style.bottom = '0px'
  bubbleContainer.appendChild(construct)
}

function bubbleWander (bubble) {
  bubble.style.bottom = (parseInt(bubble.style.bottom) + (Math.random() * bubbleSpeed)) + 'px'
  const Horizontal = Math.random()
  if (Horizontal < 0.3) {
    bubble.style.left = (parseInt(bubble.style.left) + (Math.random() * bubbleHorizontalSpeed)) + 'px'
  } else if (Horizontal > 0.7) {
    bubble.style.left = (parseInt(bubble.style.left) - (Math.random() * bubbleHorizontalSpeed)) + 'px'
  }
  if (parseInt(bubble.style.left) < 0) {
    bubble.style.left = 0
  } else if (parseInt(bubble.style.left) > playWidth) {
    bubble.style.left = playWidth
  }
  if (parseInt(bubble.style.bottom) + bubbleHeight > playHeight) {
    bubble.remove()
  }
}

function pickSpawner () {
  const x = Math.floor(Math.random() * playWidth) - bubbleWidth
  console.log(x)
  return x
}

function animate () {
  const bubbles = document.getElementsByClassName('bubble')
  if (bubbles.length > 0) {
    Array.prototype.forEach.call(bubbles, bubbleWander)
  }
}

setInterval(animate, animationSpeed)
