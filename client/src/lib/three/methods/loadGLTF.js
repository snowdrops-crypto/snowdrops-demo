'use strict'

import * as MATH from 'mathjs'
import { Scene } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { AsyncForEach } from '../../utils'

/**
 * Loads an array of GLTF or GLB files. GLB loading is prefferable since GLTFs
 * require multiple file types that are not currently supported with this webpack config file.
 * 
 * @param {GLTFLoader} GLTFLoader
 * @param {Scene} scene 
 * @param {Array[GLTF] || Array[GLB]} gltfs/glbs 
 * @param {Object(x, y, z)} initPos 
 * @param {Object} style Arrangement of gltfs onto scene 
 */
const LoadGLTFs = async (GLTFLoader, scene, gltfs, initPos, style) => {
  let count = 0
  AsyncForEach(gltfs, async (gltf) => {
    const ld_obj = await GLTFLoader.loadAsync(
      gltf,
      (xhr) => loadStatus(xhr)
    )
    const ldm_obj = ld_obj.scene.children[0]
    switch(style) {
      case 'rectangular':
      break;
      case 'circular':
        const segments = Math.PI / gltfs.length
        const r = MATH.evaluate(`${gltfs.length} / 10 + 1`)
        const x = r * Math.cos(Math.PI)
        const z = r * Math.sin(Math.PI)
        ldm_obj.position.set(x, 0, z)
      break;
      case 'linear':
        ldm_obj.position.set(
          initPos.x + count,
          initPos.y + count,
          initPos.z + count
        )
      default:
    }
    
    scene.add(ldm_obj)
    count++
  })
}

const loadStatus = (xhr) => {
  const loaded = (xhr.loaded / xhr.total) * 100
}

export default LoadGLTFs

/**
 * TODO
 * 
 * Create arrangement of loaded GLTFs
 */