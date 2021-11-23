'use strict'

const AsyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const sleep = async (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds))

const cardIterator = cb => {
  ['left', 'right'].forEach(card => {
    ['in', 'out'].forEach(side => {
      cb(card, side)
    })
  })
}

const randomHexColor = () => {
  const hexValues = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
  let hex = ''

  for(let i = 0; i < 6; i++){
    const index = Math.floor(Math.random() * hexValues.length)
    hex += hexValues[index];
  }

  return hex
}

export {
  AsyncForEach,
  sleep,
  cardIterator,
  randomHexColor
}
