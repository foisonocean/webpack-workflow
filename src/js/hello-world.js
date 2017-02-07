import lazy from 'lazy.js'

import { delayTime } from './shared/constants'

setTimeout(() => {
  document.body.innerHTML = 'This page will be changed by JavaScript.'
  setTimeout(() => {
    document.body.innerHTML = `
    <pre>
      ${lazy.toString()}
    </pre>`
  }, delayTime)
}, delayTime)
