'use strict'

import * as THREE from 'three'

/**
 * 
 * @param {THREE texture loader} textureLoader 
 * @param {THREE scene} scene 
 * @param {png/jpg} img 
 * @param {Number} width 
 * @param {Number} height 
 * @param {Object {x, y, z}} position 
 */
const textureToPlane = async (textureLoader, scene, img, width, height, position) => {
  const loadedTexture = await textureLoader.load(img)
  
  const material = new THREE.MeshBasicMaterial({
    map: loadedTexture, side: THREE.DoubleSide, color: 0xffffff, transparent: true
  })
  
  let planeGeometry
  if (typeof width !== 'undefined' && typeof height !== 'undefined') {
    planeGeometry = new THREE.PlaneGeometry(width, height)
  } else {
    planeGeometry = new THREE.PlaneGeometry(10, 10)
  }
  const plane = new THREE.Mesh(planeGeometry, material)

  if (typeof position !== 'undefined' &&
      typeof position.x !== 'undefined' &&
      typeof position.y !== 'undefined' &&
      typeof position.z !== 'undefined') {
    plane.position.set(position.x, position.y, position.z)
  }
  scene.add(plane)
}

export default textureToPlane
