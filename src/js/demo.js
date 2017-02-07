import { delayTime } from './shared/constants'
import worlds from './demo/worlds'

import './../css/demo.css'

const obj = document.querySelector('#demo')
let index = 0

setInterval(() => {
  if (index >= worlds.length) {
    index = 0
  }
  const { name, color } = worlds[index]
  obj.innerHTML = name
  obj.style.color = color
  index++
}, delayTime)
