'use strict'

import * as THREE from 'three'

/**
 * 
 * @param {THREE.Scene} scene 
 * @param {THREE.TextureLoader} TextureLoader 
 * @param {JPG|PNG} texture 
 * @param {*} dim 
 * @param {*} pos 
 * @param {*} offset 
 * @param {*} name 
 * @param {*} color 
 */
const offsetRotateBoxObject = async (scene, TextureLoader, texture, dim, pos, offset, rotation = 0, name = 'texture-object', color = '#FFFFFF', draggable = false) => {
  const loadedTexture = await TextureLoader.load(texture)
  const textureMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(dim.x, dim.y),
    new THREE.MeshBasicMaterial({
      map: loadedTexture, side: THREE.DoubleSide, color: color, transparent: true
    })
  )
  const textureObject = new THREE.Object3D()
  textureObject.add(textureMesh.clone())
  textureObject.children[0].position.set(offset.x, offset.y, offset.z)
  textureObject.name = name
  textureObject.position.set(pos.x, pos.y, pos.z)
  textureObject.rotation.y = rotation
  textureObject.userData.draggable = draggable
  console.log(textureObject.name)
  scene.add(textureObject)
}

export default offsetRotateBoxObject
