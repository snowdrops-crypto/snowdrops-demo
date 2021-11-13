'use strict'

import * as THREE from 'three'

const createTree = (scene, x, y, z) => {
  const treeTrunk = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 12, 44, 32), new THREE.MeshBasicMaterial({ color: 0xffff99 }))
  treeTrunk.position.set(x, y, z)

  const treeHead = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 16), new THREE.MeshBasicMaterial({ color: 0x66aa66}))
  treeHead.position.set(x, y + 10, z)

  const tree = new THREE.Group()
  treeTrunk.name = 'tree-trunk'
  treeHead.name = 'tree-head'
  tree.add(treeTrunk)
  tree.add(treeHead)
  scene.add(tree)
}

export default createTree
