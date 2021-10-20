'use strict'

const AsyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const sleep = async (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds))

export {
  AsyncForEach,
  sleep
}
