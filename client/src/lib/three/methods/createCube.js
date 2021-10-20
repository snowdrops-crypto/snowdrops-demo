'use strict'

import * as THREE from 'three'

const createCube = (scene, x, y, z) => {
  const geometryCube = new THREE.BoxGeometry(1, 1, 1)
  const materialCube = new THREE.MeshLambertMaterial({ color: 0x779ab9f })
  const cube = new THREE.Mesh(geometryCube, materialCube)
  
  cube.name = 'cube'
  cube.position.set(x, y, z)

  scene.add(cube)
}

export default createCube