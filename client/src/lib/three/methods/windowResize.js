'use strict'

const windowResize = (camera, renderer) => {
  const width = window.innerWidth
  const height = window.innerHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)

  const canvas = document.body.children[1]
  const ratio = window.devicePixelRatio
  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
}

export default windowResize
