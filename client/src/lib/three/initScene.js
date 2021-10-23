// https://discoverthreejs.com/book/first-steps/animation-loop/
// https://github.com/emreacar/google-fonts-as-json/tree/master/json-files
'use strict'

import { throttle } from 'lodash-es'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Font } from 'three/examples/jsm/loaders/FontLoader'

import windowResize from './methods/windowResize'
import LoadGLTFs from './methods/loadGLTF'
import loadLights from './methods/loadLights'

import textureToPlane from './methods/textureToPlane'
import createTree from './methods/createTree'
import basicCard from './methods/basicCard'
import createCube from './methods/createCube'

import avocado from '../../assets/glb/Avocado.glb'
import font_caviar from '../../assets/fonts/CaviarDreams_Regular.json'
import font_marg from '../../assets/fonts/MargatroidGrotesque.json'
import snowdropsLogo1 from '../../assets/snowdrops-logo-1.png'
import snowdropsLogoRed from '../../assets/snowdrops-logo-red.png'
import snowdropsLogoRed1024 from '../../assets/snowdrops-logo-1024.png'
import snowdropsLogoRedBgWhite1024 from '../../assets/snowdrops-logo-1024-bg-white.png'

export default class InitScene {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({antialias: true, powerPreference: "high-performance"})
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize( window.innerWidth, window.innerHeight )

    document.body.appendChild( this.renderer.domElement )
    const canvas = document.body.children[1]
    canvas.style.id = 'canvas-el'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.position = 'fixed'
    canvas.style.top = '0px'
    canvas.style.zIndex = '-1'
    canvas.style.pointerEvents = 'all'
    
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color( '#BBBBBB' )

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    this.camera.position.z = -10

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set( 0, 0, 0 )

    this.GLTFloader = new GLTFLoader()
    this.fonter = new Font(font_caviar)

    this.TextureLoader = new THREE.TextureLoader()

    window.addEventListener('resize', throttle(() => windowResize(this.camera, this.renderer), 100))
    window.addEventListener('keydown', (e) => this.keydown(e), 10)
  }

  async init() {
    // Lights
    loadLights(this.scene)

    let text = new THREE.Mesh(
      new THREE.ShapeBufferGeometry(this.fonter.generateShapes('Loading...', 1)),
      new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide })
    )
    text.name = 'loading'
    text.position.set(-1.5, 3, 0)
    this.scene.add(text)

    this.renderer.render(this.scene, this.camera)

    // await this.loadObjects(['https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/ladybug.gltf', avocado])
    await LoadGLTFs(this.GLTFloader, this.scene, ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/ladybug.gltf', avocado], {x: 2, y: 2, z: 2})

    this.scene.remove(this.scene.getObjectByName('loading'))
    // Objects
    createCube(this.scene, -5, 0, 5)
    createTree(this.scene, 8, 0, 8)
    basicCard(this.scene, 3, 0, -3)
    textureToPlane(this.TextureLoader, this.scene, snowdropsLogoRed1024, 5, 5, {x: 5, y: 1, z: 0})

    this.animate()
  }

  keydown(e) {
    console.log(e.key)
  }

  destroy() {
    window.removeEventListener('resize', throttle(() => windowResize(this.camera, this.renderer), 100))
    window.removeEventListener('keydown', (e) => this.keydown(e))
  }

  animate() {
    this.renderer.setAnimationLoop(() => {
      const cube = this.scene.getObjectByName('cube')
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      this.renderer.render(this.scene, this.camera)
    })
  }

  stopAnimate() {
    this.renderer.setAnimationLoop(null)
  }
}
