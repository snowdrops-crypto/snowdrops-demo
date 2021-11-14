// https://discoverthreejs.com/book/first-steps/animation-loop/
// https://github.com/emreacar/google-fonts-as-json/tree/master/json-files
'use strict'
import { store } from '../../store/store'
import { throttle } from 'lodash-es'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Font } from 'three/examples/jsm/loaders/FontLoader'

import windowResize from './methods/windowResize'
import LoadGLTFs from './methods/loadGLTF'
import loadLights from './methods/loadLights'

import offsetRotateBoxObject from './methods/offsetRotateBoxObject'
import offsetRotateTextureObject from './methods/offsetRotateTextureObject'
import offsetRotateTextObject from './methods/offsetRotateTextObject'
import offsetRotateButtonObject from './methods/offsetRotateButtonObject'
import pageFrame from './methods/pageFrame'
import handleObjectRotations from './methods/handleObjectRotations'
import autoFormatMessage from './methods/autoFormatMessage'

import avocado from '../../assets/glb/Avocado.glb'

import font_caviar from '../../assets/fonts/CaviarDreams_Regular.json'
import font_marg from '../../assets/fonts/MargatroidGrotesque.json'

import snowdropsLogo1 from '../../assets/snowdrops-logo-1.png'

export default class InitScene {
  constructor() {
    this.loopCount
    console.log(store.getState())
    // store.dispatch({type: 'main', payload: {...state}})

    // this.renderer = new THREE.WebGLRenderer({antialias: true, powerPreference: "high-performance"})
    this.renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer: true})
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
    this.scene.background = new THREE.Color( '#444444' )

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    this.camera.position.z = 10

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 0, 0)
    this.controls.maxDistance = 10
    this.controls.minDistance = 5
    // Horizontal Angle
    // this.controls.maxAzimuthAngle = Math.PI/4
    // this.controls.minAzimuthAngle = -Math.PI/4
    // Vertical Angle
    // this.controls.maxPolarAngle = Math.PI/2
    // this.controls.minPolarAngle = Math.PI/4

    this.mouse = new THREE.Vector2()
    this.raycaster = new THREE.Raycaster()
    this.raycaster.params.Line.threshold = 0.1

    this.GLTFloader = new GLTFLoader()
    this.fonter = new Font(font_caviar)

    this.TextureLoader = new THREE.TextureLoader()

    this.cardObjectNames = {'left-card': [], 'right-card': [], 'front-card': [], 'back-card': []}
    this.basePosition = {x: 0, y: 0, z: 0}
    this.cardDimensions = {x: 4, y: 6, z: 0.1}

    this.cardMessage = ''

    window.addEventListener('resize', throttle(() => windowResize(this.camera, this.renderer), 100))
    window.addEventListener('keydown', (e) => this.keydown(e), 10)
    window.addEventListener('wheel', e => this.wheelScroll(e), false)
    window.addEventListener('mousemove', e => this.mouseMove(e), false)
    window.addEventListener('mousedown', e => this.mouseDown(e), false)
    window.addEventListener('mouseup', e => this.mouseUp(e), false)

    document.body.addEventListener('update-three-redux', () => {
      console.log(store.getState())
    })
    document.body.addEventListener('pause-animation', () => this.stopAnimate())
    document.body.addEventListener('start-animation', () => this.animate())
    document.body.addEventListener('three-test', (e) => console.log('test triggered in three', e.detail.x))
    document.body.addEventListener('handle-card-frame', (e) => {
      console.log(e.detail)
    })
    document.body.addEventListener('handle-card-message', (e) => {
      this.cardMessage = e.detail.msg
      console.log(this.cardMessage)
    })
  }

  async init() {
    // Lights
    loadLights(this.scene)
    
    // const axesHelper = new THREE.AxesHelper(5)
    // this.scene.add(axesHelper)

    let text = new THREE.Mesh(
      new THREE.ShapeBufferGeometry(this.fonter.generateShapes('Loading...', 1)),
      new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide })
    )
    text.name = 'loading'
    text.position.set(-1.5, 3, 0)
    this.scene.add(text)

    this.renderer.render(this.scene, this.camera)
    this.scene.remove(this.scene.getObjectByName('loading'))

    // await this.loadObjects(['https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/ladybug.gltf', avocado])
    // await LoadGLTFs(this.GLTFloader, this.scene, ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/ladybug.gltf', avocado], {x: 2, y: 2, z: 2})

    // CARD
    const itemSpacingInside = 0.1
    const itemSpacingOutside = -0.1

    /* CARD LEFT */
    offsetRotateBoxObject(
      this.scene, `${Object.keys(this.cardObjectNames)[0]}`, 0xeffeef,
      this.cardDimensions, this.basePosition, {x: (-1 * this.cardDimensions.x / 2), y: 0, z: 0}
    )
    this.cardObjectNames[Object.keys(this.cardObjectNames)[0]].push(Object.keys(this.cardObjectNames)[0])
    // Card Frame
    this.cardObjectNames[Object.keys(this.cardObjectNames)[0]].push(
      ...pageFrame(this.scene, this.basePosition, Object.keys(this.cardObjectNames)[0], this.cardDimensions, [])
    )
    // LOGO on CARD
    await offsetRotateTextureObject(this.scene, this.TextureLoader, snowdropsLogo1,
      {x: 1, y: 1}, this.basePosition, {x: -1, y: -2.25, z: itemSpacingInside},
      `${Object.keys(this.cardObjectNames)[0]}-snowdrops-logo`, 0xffffff
    )
    this.cardObjectNames[Object.keys(this.cardObjectNames)[0]].push(`${Object.keys(this.cardObjectNames)[0]}-snowdrops-logo`)
    // MESSAGE on CARD
    offsetRotateTextObject(
      this.scene, this.fonter, `${Object.keys(this.cardObjectNames)[0]}-message`, 0x000000,
      'Happy Birthday!\n\nMay this be the day,\nHappy Birthday today!\nAnd if today is not that day,\nmay this card make it that\nway.\n\nSincerely,\nSnowdrops',
      0.35, this.basePosition, {x: -7.5, y: 4, z: itemSpacingInside + 0.1}, 0.5
    )
    autoFormatMessage('Happy Birthday!\n\nMay this be the day,\nHappy Birthday today!\nAnd if today is not that day,\nmay this card make it that\nway.\n\nSincerely,\nSnowdrops')
    this.cardObjectNames[Object.keys(this.cardObjectNames)[0]].push(`${Object.keys(this.cardObjectNames)[0]}-message`)

    /* CARD RIGHT */
    offsetRotateBoxObject(
      this.scene, `${Object.keys(this.cardObjectNames)[1]}`, 0xeffeef,
      this.cardDimensions, this.basePosition, {x: this.cardDimensions.x / 2, y: 0, z: 0},
    )
    this.cardObjectNames[Object.keys(this.cardObjectNames)[1]].push(Object.keys(this.cardObjectNames)[1])
    // Card Frame
    this.cardObjectNames[Object.keys(this.cardObjectNames)[1]].push(
      ...pageFrame(this.scene, this.basePosition, Object.keys(this.cardObjectNames)[1], this.cardDimensions, [])
    )
    // MESSAGE on CARD
    offsetRotateTextObject(
      this.scene, this.fonter, `${Object.keys(this.cardObjectNames)[1]}-claim-message`, 0x000000, 'Claim your ETH: 0.5',
      0.5, this.basePosition, {x: 1, y: 1, z: 0.15}, 0.5
    )
    this.cardObjectNames[Object.keys(this.cardObjectNames)[1]].push(`${Object.keys(this.cardObjectNames)[1]}-claim-message`)
    // Claim Button
    offsetRotateBoxObject(
      this.scene, `${Object.keys(this.cardObjectNames)[1]}-claim-button`, 0x55ff55,
      {x: 1.5, y: 0.5, z: 0.1}, this.basePosition, {x: 2, y: 0, z: itemSpacingInside},
    )
    this.cardObjectNames[Object.keys(this.cardObjectNames)[1]].push(`${Object.keys(this.cardObjectNames)[1]}-claim-button`)
    offsetRotateTextObject(
      this.scene, this.fonter, `${Object.keys(this.cardObjectNames)[1]}-claim-button-text`, 0x000000, 'Claim!',
      0.2, this.basePosition, {x: 1.6, y: -0.1, z: 0.20}
    )
    this.cardObjectNames[Object.keys(this.cardObjectNames)[1]].push(`${Object.keys(this.cardObjectNames)[1]}-claim-button-text`)

    /* CARD FRONT */
    offsetRotateBoxObject(
      this.scene, `${Object.keys(this.cardObjectNames)[2]}-object`, 0xff55ff,
      {x: 2, y: 2, z: 0.1}, this.basePosition, {x: -2, y: 1, z: itemSpacingOutside}
    )
    this.cardObjectNames[Object.keys(this.cardObjectNames)[2]].push(`${Object.keys(this.cardObjectNames)[2]}-object`)
    this.cardObjectNames[Object.keys(this.cardObjectNames)[2]].push(
      ...pageFrame(this.scene, this.basePosition, Object.keys(this.cardObjectNames)[2], this.cardDimensions, [])
    )

    /* BACK CARD */
    offsetRotateBoxObject(
      this.scene, `${Object.keys(this.cardObjectNames)[3]}-object`, 0xff5533,
      {x: 2, y: 2, z: 0.1}, this.basePosition, {x: 2, y: 1, z: itemSpacingOutside}
    )
    this.cardObjectNames[Object.keys(this.cardObjectNames)[3]].push(`${Object.keys(this.cardObjectNames)[3]}-object`)
    this.cardObjectNames[Object.keys(this.cardObjectNames)[3]].push(
      ...pageFrame(this.scene, this.basePosition, Object.keys(this.cardObjectNames)[3], this.cardDimensions, [])
    )

    /* ROTATIONS */
    const rotation_factor = 8
    handleObjectRotations(this.scene, this.cardObjectNames, rotation_factor)

    this.animate()
  }

  animate() {
    this.renderer.setAnimationLoop(() => {
      const rotation_factor = 512
      if (1 > 2) {
        handleObjectRotations(this.scene, this.cardObjectNames, rotation_factor)
      }

      const intersects = this.raycaster.intersectObjects(this.scene.children)
      if (intersects.length > 0) {
        // console.log(intersects[0].object.parent.name)
        // console.log(intersects[0].object.parent.children[0].material.color)

        if (typeof intersects[0].object !== 'undefined'
        && (intersects[0].object.parent.name.includes('right-card-claim-button')
        || intersects[0].object.parent.name.includes('right-card-claim-button-text'))
        ) {
          this.scene.getObjectByName('right-card-claim-button').children[0].material.color.set(`#66FF66`)
          document.body.style.cursor = 'pointer'
        } else {
          this.scene.getObjectByName('right-card-claim-button').children[0].material.color.set(`#00FF00`)
          document.body.style.cursor = 'default'
          // console.log(this.scene.getObjectByName('right-card-claim-button'))
        }
      }

      this.renderer.render(this.scene, this.camera)
    })
  }

  stopAnimate() {
    this.renderer.setAnimationLoop(null)
  }

  keydown(e) {
    // Don't really need keydown
    // Maybe in the future for shortcuts
    // console.log(e.key)
    if (e.key === 'p') {
      this.stopAnimate()
    }

    if (e.key === 's') {
      this.animate()
    }

    // Add Card Frames
    // if (e.key === 'd') {
    //   const nameNotRemoves = []
    //   let framesRemoved = false
    //   for (let i = 0; i < this.cardObjectNames['left-card'].length; i++) {
    //     if (this.cardObjectNames['left-card'][i].includes('frame')) {
    //       this.scene.remove(this.scene.getObjectByName(this.cardObjectNames['left-card'][i]))
    //       framesRemoved = true
    //     } else {
    //       nameNotRemoves.push(this.cardObjectNames['left-card'][i])
    //     }
    //   }
    //   if (framesRemoved) {
    //     this.cardObjectNames['left-card'] = nameNotRemoves
    //   } else {
    //     console.log('Frames do not exist')
    //   }
    // }

    // // Removes Card Frames
    // if (e.key === 'a') {
    //   let framesExist = false
    //   for (let i = 0; i < this.cardObjectNames['left-card'].length; i++) {
    //     if (this.cardObjectNames['left-card'][i].includes('frame')) {
    //       this.scene.remove(this.scene.getObjectByName(this.cardObjectNames['left-card'][i]))
    //       framesExist = true
    //     }
    //   }
    //   if (!framesExist) {
    //     this.cardObjectNames['left-card'].push(
    //       ...pageFrame(this.scene, this.basePosition, 'left-card', this.cardDimensions, [], this.scene.getObjectByName('left-card').rotation.y)
    //     )
    //   } else {
    //     console.log('Frames already exist')
    //   }
    // }
  }

  wheelScroll(e) {
    if (e.deltaY > 0) {
      this.camera.z += 1
    } else {
      this.camera.z -= 1
    }
  }

  mouseDown(e) {
    // e.preventDefault()
    // this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    // this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    // this.raycaster.setFromCamera( this.mouse, this.camera )
    const intersects = this.raycaster.intersectObjects( this.scene.children )
    if (intersects.length > 0 && typeof intersects[0].object !== 'undefined1') {
      if (intersects[0].object.parent.name.includes('right-card-claim-button')
        || intersects[0].object.parent.name.includes('right-card-claim-button-text'))
      {
        console.log('claim button clicked')
      }
    }
  }

  mouseUp(e) {
    // e.preventDefault()
    // 
  }

  mouseMove(e) {
    // e.preventDefault()
    this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    this.raycaster.setFromCamera( this.mouse, this.camera )
  }


  destroy() {
    window.removeEventListener('resize', throttle(() => windowResize(this.camera, this.renderer), 100))
    window.removeEventListener('keydown', (e) => this.keydown(e))
    window.removeEventListener('wheel', e => this.wheelScroll(e))
    window.removeEventListener('mousemove', e => this.mouseMove(e))
    window.removeEventListener('mousedown', e => this.mouseDown(e))
    window.removeEventListener('mouseup', e => this.mouseUp(e))
  }
}
