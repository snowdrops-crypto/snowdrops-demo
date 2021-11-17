'use strict'

const handleObjectRotations = (scene, cardObjectNames, rotation_factor) => {
  scene.getObjectByName(cardObjectNames.left.name).rotation.y += Math.PI / rotation_factor
  scene.getObjectByName(cardObjectNames.right.name).rotation.y -= Math.PI / rotation_factor

  // Frames
  Object.keys(cardObjectNames.left.in.frames).forEach(frame => {
    scene.getObjectByName(cardObjectNames.left.in.frames[frame].name).rotation.y += Math.PI / rotation_factor
  })
  Object.keys(cardObjectNames.right.in.frames).forEach(frame => {
    scene.getObjectByName(cardObjectNames.right.in.frames[frame].name).rotation.y -= Math.PI / rotation_factor
  })
  Object.keys(cardObjectNames.left.out.frames).forEach(frame => {
    scene.getObjectByName(cardObjectNames.left.out.frames[frame].name).rotation.y += Math.PI / rotation_factor
  })
  Object.keys(cardObjectNames.right.out.frames).forEach(frame => {
    scene.getObjectByName(cardObjectNames.right.out.frames[frame].name).rotation.y -= Math.PI / rotation_factor
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
  Object.keys(cardObjectNames.right.in.claim).forEach(type => {
    scene.getObjectByName(cardObjectNames.right.in.claim[type].name).rotation.y -= Math.PI / rotation_factor
  })

  // Message
  scene.getObjectByName(cardObjectNames.left.in.greeting.name).rotation.y += Math.PI / rotation_factor
}

export default handleObjectRotations
