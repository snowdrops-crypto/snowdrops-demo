'use strict'

const autoFormatMessage = (msg) => {
  let index = -2
  msg = 'hi\n hello\n andanother now make the character count really long'
  console.log(msg[100])
  if (msg[28] !== 'undefined' && msg.indexOf('\n', index) + 1)
  while(index !== 0) {
    index === -2 ? index = 0 : null
    index = msg.indexOf('\n', index) + 1
    console.log('found', index)
    if (index > 28) {
      console.log('more')
    } else if (index === -1) {
      console.log('end')
    }
  }
}

export default autoFormatMessage
