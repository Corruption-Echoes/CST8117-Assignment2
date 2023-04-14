const style = { tea: '', bubble: '' }
const tea = document.getElementById('tea')
const storage = localStorage.getItem('style')
if (storage) {
  const currentStyle = JSON.parse(storage)
  let currentTea = currentStyle.tea
  // initialize
  if (currentTea === 'greenTea') {
    currentTea = 'green-tea'
  }
  tea.classList.add(currentTea)
} else {
  tea.classList.add('green-tea')
}

const greenTea = document.getElementById('green-tea')
greenTea.addEventListener('click', e => {
  e.preventDefault()

  if (tea.classList.value !== 'green-tea') {
    tea.className = ''
    tea.classList.add('green-tea')
  } else {
    tea.classList.remove('green-tea')
  }

  style.tea = 'greenTea'
})

const chai = document.getElementById('chai')
chai.addEventListener('click', e => {
  e.preventDefault()

  if (tea.classList.value !== 'chai') {
    tea.className = ''
    tea.classList.add('chai')
  } else {
    tea.classList.remove('chai')
  }

  style.tea = 'chai'
})

const coconut = document.getElementById('coconut')
coconut.addEventListener('click', e => {
  e.preventDefault()

  if (tea.classList.value !== 'coconut') {
    tea.className = ''
    tea.classList.add('coconut')
  } else {
    tea.classList.remove('coconut')
  }

  style.tea = 'coconut'
})

const taro = document.getElementById('taro')
taro.addEventListener('click', e => {
  e.preventDefault()

  if (tea.classList.value !== 'taro') {
    tea.className = ''
    tea.classList.add('taro')
  } else {
    tea.classList.remove('taro')
  }

  style.tea = 'taro'
})

const watermelon = document.getElementById('watermelon')
watermelon.addEventListener('click', e => {
  e.preventDefault()

  if (tea.classList.value !== 'watermelon') {
    tea.className = ''
    tea.classList.add('watermelon')
  } else {
    tea.classList.remove('watermelon')
  }

  style.tea = 'watermelon'
})

const save = document.getElementById('save-tea')
save.addEventListener('click', e => {
  e.preventDefault()

  localStorage.setItem('style', JSON.stringify(style))
  window.location.href = 'game.html'
})
