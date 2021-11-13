'use strict'

import * as THREE from 'three'

const loadLights = (scene) => {
  const ambientLight = new THREE.AmbientLight( 0x404040, 1 )
  ambientLight.name = 'ambient-light'
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 )
  directionalLight.name = 'directional-light'
  directionalLight.position.y = 3
  directionalLight.position.z = 3
  scene.add(directionalLight)

  const spotlight = new THREE.SpotLight(0xffffff)
  spotlight.name = 'spot-light'
  spotlight.position.set(0, 3, 5)
  spotlight.lookAt(0, 0, 0)
  scene.add(spotlight)

  const spotlight2 = new THREE.SpotLight(0xffffff)
  spotlight2.name = 'spot-light'
  spotlight2.position.set(0, 3, -5)
  spotlight2.lookAt(0, 0, 0)
  scene.add(spotlight2)

  const pointLight = new THREE.PointLight( 0xff0000, 1, 1 )
  pointLight.name = 'point-light'
  pointLight.position.set( -5, -5, -5 )
  scene.add(pointLight)
}

export default loadLights
