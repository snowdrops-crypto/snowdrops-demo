'use strict'

const handleObjectRotations = (scene, cardObjectNames, rotation_factor) => {
  Object.keys(cardObjectNames).forEach(cardSide => {
    cardObjectNames[cardSide].forEach(objectName => {
      switch (cardSide) {
        case Object.keys(cardObjectNames)[0]:
          scene.getObjectByName(`${objectName}`).rotation.y += Math.PI / rotation_factor
          break;
        case Object.keys(cardObjectNames)[1]:
          scene.getObjectByName(`${objectName}`).rotation.y -= Math.PI / rotation_factor
          break;
        case Object.keys(cardObjectNames)[2]:
          scene.getObjectByName(`${objectName}`).rotation.y += Math.PI / rotation_factor
          break;
        case Object.keys(cardObjectNames)[3]:
          scene.getObjectByName(`${objectName}`).rotation.y -= Math.PI / rotation_factor
          break;
      }
    })
  })
}

export default handleObjectRotations
