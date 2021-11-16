'use strict'

import * as THREE from 'three'

const floatingParticles = async (scene, TextureLoader, img) => {
  const loadedTexture = await TextureLoader.load(img)
  const particleCount = 180
  const particlesGeometry = new THREE.BufferGeometry
  const pMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 0.5,
    map: loadedTexture,
    transparent: true
  })
  
  const particlesArray = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount * 3; i++) {
    particlesArray[i] = Math.random() * 20 - 10
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesArray, 3))

  const pt = new THREE.Points(particlesGeometry, pMaterial)
  pt.name = 'particles'
  scene.add(pt)
}

export default floatingParticles
