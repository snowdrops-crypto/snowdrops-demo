'use strict'

import * as THREE from 'three'

/**
 * A blank white card.
 * 
 * @param {THREE Scene} scene 
 */
const basicCard = (scene, x, y, z) => {
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide, color: 0xffffff, transparent: false
  })
  const firstPage = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 6), material)
  const secondPage = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 6), material)

  firstPage.position.set(x, y, z)
  secondPage.position.set(x, y, z + 2)
  firstPage.rotation.y = Math.PI/4
  secondPage.rotation.y = -Math.PI/4

  scene.add(firstPage)
  scene.add(secondPage)
}

export default basicCard
