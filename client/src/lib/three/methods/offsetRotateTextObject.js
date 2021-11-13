'use strict'

import * as THREE from 'three'

const offsetRotateTextObject = (scene, fonter, name, color, message, textSize, pos, offset, scale = 1) => {
  let textMesh = new THREE.Mesh(
    new THREE.ShapeBufferGeometry(fonter.generateShapes(message, textSize)),
    new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide })
  )
  const textObject = new THREE.Object3D()
  textObject.add(textMesh.clone())
  textObject.children[0].position.set(offset.x, offset.y, offset.z)
  textObject.position.set(pos.x, pos.y, pos.z)
  textObject.scale.set(scale, scale, scale)
  textObject.name = name
  scene.add(textObject)
}

export default offsetRotateTextObject
