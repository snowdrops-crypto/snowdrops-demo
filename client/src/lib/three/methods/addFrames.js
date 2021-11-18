'use strict'

import offsetRotateBoxObject from "./offsetRotateBoxObject"

const addFrames = (scene, cardInfo, side = '', rotation = 0) => {
  const verticalFrameDimensions = {x: 0.1, y: 6, z: 0.1}
  const horizontalFrameDimensions = {x: 4 - (verticalFrameDimensions.x * 2), y: 0.1, z: 0.1}
  let offsetPosition = {}

  if (side === 'left-in' || side === 'all') {
    Object.keys(cardInfo.left.in.frames).forEach(frame => {
      switch (frame) {
        case 'left':
          offsetPosition = {
            x: -1 * (cardInfo.dimensions.x - verticalFrameDimensions.x / 2),
            y: 0,
            z: cardInfo.itemSpacingIn
          }
          break;
        case 'right':
          offsetPosition = {
            x: -1 * verticalFrameDimensions.x / 2,
            y: 0,
            z: cardInfo.itemSpacingIn
          }
          break;
        case 'top':
          offsetPosition = {
            x: (-1 * cardInfo.dimensions.x / 2),
            y: cardInfo.dimensions.y / 2 - horizontalFrameDimensions.y / 2,
            z: cardInfo.itemSpacingIn
          }
          break;
        case 'bottom':
          offsetPosition = {
            x: (-1 * cardInfo.dimensions.x / 2),
            y: (-1 * cardInfo.dimensions.y / 2) + horizontalFrameDimensions.y / 2,
            z: cardInfo.itemSpacingIn
          }
          break;
        default: // console.log('ignore parameters that are not frames like: active')
      }
      if (frame !== 'active') {
        let frameDimesions
        if (frame === 'left' || frame === 'right') {
          frameDimesions = verticalFrameDimensions
        } else {
          frameDimesions = horizontalFrameDimensions
        }
        offsetRotateBoxObject(
          scene, cardInfo.left.in.frames[frame].name, `#${cardInfo.left.in.frames[frame].color}`,
          frameDimesions, cardInfo.basePosition, offsetPosition
        )
        scene.getObjectByName(cardInfo.left.in.frames[frame].name).rotation.y = rotation
      }
    })
  }

  if (side === 'right-in' || side === 'all') {
    Object.keys(cardInfo.right.in.frames).forEach(frame => {
      switch (frame) {
        case 'left':
          offsetPosition = {
            x: verticalFrameDimensions.x / 2,
            y: 0,
            z: cardInfo.itemSpacingIn
          }
          break;
        case 'right':
          offsetPosition = {
            x: cardInfo.dimensions.x - verticalFrameDimensions.x / 2,
            y: 0,
            z: cardInfo.itemSpacingIn
          }
          break;
        case 'top':
          offsetPosition = {
            x: cardInfo.dimensions.x / 2,
            y: cardInfo.dimensions.y / 2 - horizontalFrameDimensions.y / 2,
            z: cardInfo.itemSpacingIn
          }
          break;
        case 'bottom':
          offsetPosition = {
            x: cardInfo.dimensions.x / 2,
            y: (-1 * cardInfo.dimensions.y / 2) + horizontalFrameDimensions.y / 2,
            z: cardInfo.itemSpacingIn
          }
          break;
        default: // console.log('ignore parameters that are not frames like: active')
      }
      if (frame !== 'active') {
        let frameDimesions
        if (frame === 'left' || frame === 'right') {
          frameDimesions = verticalFrameDimensions
        } else {
          frameDimesions = horizontalFrameDimensions
        }
        offsetRotateBoxObject(
          scene, cardInfo.right.in.frames[frame].name, `#${cardInfo.right.in.frames[frame].color}`,
          frameDimesions, cardInfo.basePosition, offsetPosition
        )
        scene.getObjectByName(cardInfo.left.in.frames[frame].name).rotation.y = rotation
      }
    })
  }

  if (side === 'left-out' || side === 'all') {
    Object.keys(cardInfo.left.out.frames).forEach(frame => {
      switch (frame) {
        case 'left':
          offsetPosition = {
            x: -1 * (cardInfo.dimensions.x - verticalFrameDimensions.x / 2),
            y: 0,
            z: cardInfo.itemSpacingOut
          }
          break;
        case 'right':
          offsetPosition = {
            x: -1 * verticalFrameDimensions.x / 2,
            y: 0,
            z: cardInfo.itemSpacingOut
          }
          break;
        case 'top':
          offsetPosition = {
            x: (-1 * cardInfo.dimensions.x / 2),
            y: cardInfo.dimensions.y / 2 - horizontalFrameDimensions.y / 2,
            z: cardInfo.itemSpacingOut
          }
          break;
        case 'bottom':
          offsetPosition = {
            x: (-1 * cardInfo.dimensions.x / 2),
            y: (-1 * cardInfo.dimensions.y / 2) + horizontalFrameDimensions.y / 2,
            z: cardInfo.itemSpacingOut
          }
          break;
        default: // console.log('ignore parameters that are not frames like: active')
      }
      if (frame !== 'active') {
        let frameDimesions
        if (frame === 'left' || frame === 'right') {
          frameDimesions = verticalFrameDimensions
        } else {
          frameDimesions = horizontalFrameDimensions
        }
        offsetRotateBoxObject(
          scene, cardInfo.left.out.frames[frame].name, `#${cardInfo.left.out.frames[frame].color}`,
          frameDimesions, cardInfo.basePosition, offsetPosition
        )
        scene.getObjectByName(cardInfo.left.in.frames[frame].name).rotation.y = rotation
      }
    })
  }

  if (side === 'right-out' || side === 'all') {
    Object.keys(cardInfo.right.out.frames).forEach(frame => {
      switch (frame) {
        case 'left':
          offsetPosition = {
            x: verticalFrameDimensions.x / 2,
            y: 0,
            z: cardInfo.itemSpacingOut
          }
          break;
        case 'right':
          offsetPosition = {
            x: cardInfo.dimensions.x - verticalFrameDimensions.x / 2,
            y: 0,
            z: cardInfo.itemSpacingOut
          }
          break;
        case 'top':
          offsetPosition = {
            x: cardInfo.dimensions.x / 2,
            y: cardInfo.dimensions.y / 2 - horizontalFrameDimensions.y / 2,
            z: cardInfo.itemSpacingOut
          }
          break;
        case 'bottom':
          offsetPosition = {
            x: cardInfo.dimensions.x / 2,
            y: (-1 * cardInfo.dimensions.y / 2) + horizontalFrameDimensions.y / 2,
            z: cardInfo.itemSpacingOut
          }
          break;
        default: // console.log('ignore parameters that are not frames like: active')
      }
      if (frame !== 'active') {
        let frameDimesions
        if (frame === 'left' || frame === 'right') {
          frameDimesions = verticalFrameDimensions
        } else {
          frameDimesions = horizontalFrameDimensions
        }
        offsetRotateBoxObject(
          scene, cardInfo.right.out.frames[frame].name, `#${cardInfo.right.out.frames[frame].color}`,
          frameDimesions, cardInfo.basePosition, offsetPosition
        )
        scene.getObjectByName(cardInfo.left.in.frames[frame].name).rotation.y = rotation
      }
    })
  }
}

export default addFrames
