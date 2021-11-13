'use strict'

import * as THREE from 'three'

const offsetRotateButtonObject = (scene, name, color, dim, pos, offset) => {
  const boxMesh = new THREE.Mesh(
    new THREE.BoxBufferGeometry(dim.x, dim.y, dim.z),
    new THREE.MeshStandardMaterial({ color: color })
  )
  const boxObj = new THREE.Object3D()
  boxObj.add(boxMesh.clone())
  boxObj.children[0].position.set(offset.x, offset.y, offset.z)
  boxObj.position.set(pos.x, pos.y, pos.z)
  boxObj.name = name
  scene.add(boxObj)
}

export default offsetRotateButtonObject
