const theme = {
  tea: {
    greenTea: '#B1CBA666',
    chai: '#B2833066',
    coconut: '#E9EDF666',
    taro: '#A3A6E866',
    watermelon: '#D23B6866'
  },
  bubble: ''
}

const storage = localStorage.getItem('style')
const style = JSON.parse(storage)
if (style) {
  const bgTea = document.getElementById('bg-tea')
  const newTea = theme.tea[style.tea]
  bgTea.style.borderTop = ''
  bgTea.style.borderTopColor = newTea
}
