'use strict'

const handleObjectRotations = (scene, cardObjectNames, rotation_factor) => {
  scene.getObjectByName(cardObjectNames.left.card).rotation.y += Math.PI / rotation_factor
  scene.getObjectByName(cardObjectNames.right.card).rotation.y -= Math.PI / rotation_factor

  // Frames
  cardObjectNames.left.in.frames.forEach(name => {
    scene.getObjectByName(name).rotation.y += Math.PI / rotation_factor
  })
  cardObjectNames.right.in.frames.forEach(name => {
    scene.getObjectByName(name).rotation.y -= Math.PI / rotation_factor
  })
  cardObjectNames.left.out.frames.forEach(name => {
    scene.getObjectByName(name).rotation.y += Math.PI / rotation_factor
  })
  cardObjectNames.right.out.frames.forEach(name => {
    scene.getObjectByName(name).rotation.y -= Math.PI / rotation_factor
  })

  // Other
  cardObjectNames.left.in.other.forEach(name => {
    scene.getObjectByName(name).rotation.y += Math.PI / rotation_factor
  })
  cardObjectNames.right.in.other.forEach(name => {
    scene.getObjectByName(name).rotation.y -= Math.PI / rotation_factor
  })
  cardObjectNames.left.out.other.forEach(name => {
    scene.getObjectByName(name).rotation.y += Math.PI / rotation_factor
  })
  cardObjectNames.right.out.other.forEach(name => {
    scene.getObjectByName(name).rotation.y -= Math.PI / rotation_factor
  })

  // Claim
  cardObjectNames.right.in.claim.forEach(name => {
    scene.getObjectByName(name).rotation.y -= Math.PI / rotation_factor
  })

  // Message
  scene.getObjectByName(cardObjectNames.left.in.message).rotation.y += Math.PI / rotation_factor
}

export default handleObjectRotations
