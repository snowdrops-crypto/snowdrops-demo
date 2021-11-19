'use strict'

export default (cb) => {
  document.body.addEventListener('toggle-animation', () => cb())
}
