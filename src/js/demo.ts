import { delayTime } from './shared/constants.js'
import worlds from './demo/words'

import './../css/demo.css'

const obj: HTMLElement = document.querySelector('#demo') as HTMLElement
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
