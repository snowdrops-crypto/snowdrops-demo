'use strict'

import offsetRotateBoxObject from './offsetRotateBoxObject'

/**
 * 
 * @param {THREE.Scene} scene 
 * @param {{x,y,z}} basePosition 
 * @param {String} cardSide 
 * @param {{x,y,z}} cardDimensions 
 * @param {Object[]} colors
 */
const pageFrame = (scene, basePosition, cardSide, cardDimensions, colors) => {
  const itemSpacingInside = 0.1
  const itemSpacingOutside = - 0.1
  const offsetPositions = [] //Left, Right, Front, Back

  colors = [0x55ff55, 0xff5555, 0x5555ff, 0xff55ff]
  const verticalFrameDimensions = {x: 0.1, y: 6, z: 0.1}
  const horizontalFrameDimensions = {x: 4 - (verticalFrameDimensions.x * 2), y: 0.1, z: 0.1}
  switch (cardSide) {
    case 'left-card': // LEFT
      offsetPositions.push({
        x: -1 * (cardDimensions.x - verticalFrameDimensions.x / 2),
        y: 0,
        z: itemSpacingInside
      })
      offsetPositions.push({
        x: -1 * verticalFrameDimensions.x / 2,
        y: 0,
        z: itemSpacingInside
      })
      offsetPositions.push({
        x: (-1 * cardDimensions.x / 2),
        y: cardDimensions.y / 2 - horizontalFrameDimensions.y / 2,
        z: itemSpacingInside
      })
      offsetPositions.push({
        x: (-1 * cardDimensions.x / 2),
        y: (-1 * cardDimensions.y / 2) + horizontalFrameDimensions.y / 2,
        z: itemSpacingInside
      })
      break;
    case 'right-card': // RIGHT
      offsetPositions.push({
        x: verticalFrameDimensions.x / 2,
        y: 0,
        z: itemSpacingInside
      })
      offsetPositions.push({
        x: cardDimensions.x - verticalFrameDimensions.x / 2,
        y: 0,
        z: itemSpacingInside
      })
      offsetPositions.push({
        x: cardDimensions.x / 2,
        y: cardDimensions.y / 2 - horizontalFrameDimensions.y / 2,
        z: itemSpacingInside
      })
      offsetPositions.push({
        x: cardDimensions.x / 2,
        y: (-1 * cardDimensions.y / 2) + horizontalFrameDimensions.y / 2,
        z: itemSpacingInside
      })
      break;
    case 'front-card': // FRONT
      offsetPositions.push({
        x: -1 * (cardDimensions.x - verticalFrameDimensions.x / 2),
        y: 0,
        z: itemSpacingOutside
      })
      offsetPositions.push({
        x: -1 * verticalFrameDimensions.x / 2,
        y: 0,
        z: itemSpacingOutside
      })
      offsetPositions.push({
        x: (-1 * cardDimensions.x / 2),
        y: cardDimensions.y / 2 - horizontalFrameDimensions.y / 2,
        z: itemSpacingOutside
      })
      offsetPositions.push(    {
        x: (-1 * cardDimensions.x / 2),
        y: (-1 * cardDimensions.y / 2) + horizontalFrameDimensions.y / 2,
        z: itemSpacingOutside
      })
      break;
    case 'back-card': // BACK
      offsetPositions.push({
        x: verticalFrameDimensions.x / 2,
        y: 0,
        z: itemSpacingOutside
      })
      offsetPositions.push({
        x: cardDimensions.x - verticalFrameDimensions.x / 2,
        y: 0,
        z: itemSpacingOutside
      })
      offsetPositions.push({
        x: cardDimensions.x / 2,
        y: cardDimensions.y / 2 - horizontalFrameDimensions.y / 2,
        z: itemSpacingOutside
      })
      offsetPositions.push(    {
        x: cardDimensions.x / 2,
        y: (-1 * cardDimensions.y / 2) + horizontalFrameDimensions.y / 2,
        z: itemSpacingOutside
      })
      break;
    default: console.error('Invalid string inputted for cardSide.')
  }

  const objectNames = [`${cardSide}-left-box`, `${cardSide}-right-box`, `${cardSide}-top-box`, `${cardSide}-bottom-box`]
  offsetRotateBoxObject(
    scene, `${cardSide}-left-box`, colors[0],
    verticalFrameDimensions, basePosition, offsetPositions[0]
  )
  offsetRotateBoxObject(
    scene, `${cardSide}-right-box`, colors[1],
    verticalFrameDimensions, basePosition, offsetPositions[1]
  )
  offsetRotateBoxObject(
    scene, `${cardSide}-top-box`, colors[2],
    horizontalFrameDimensions, basePosition, offsetPositions[2]
  )
  offsetRotateBoxObject(
    scene, `${cardSide}-bottom-box`, colors[3],
    horizontalFrameDimensions, basePosition, offsetPositions[3]
  )

  return objectNames
}

export default pageFrame
