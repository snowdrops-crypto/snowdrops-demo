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

import offsetRotateBoxObject from './methods/offsetRotateBoxObject'
import offsetRotateTextureObject from './methods/offsetRotateTextureObject'
import offsetRotateTextObject from './methods/offsetRotateTextObject'
import offsetRotateButtonObject from './methods/offsetRotateButtonObject'

import avocado from '../../assets/glb/Avocado.glb'
import font_caviar from '../../assets/fonts/CaviarDreams_Regular.json'
import font_marg from '../../assets/fonts/MargatroidGrotesque.json'
import snowdropsLogo1 from '../../assets/snowdrops-logo-1.png'
import snowdropsLogoRed from '../../assets/snowdrops-logo-red.png'
import snowdropsLogoRed1024 from '../../assets/snowdrops-logo-1024.png'
import snowdropsLogoRedBgWhite1024 from '../../assets/snowdrops-logo-1024-bg-white.png'

// rotation: https://codepen.io/mjurczyk/pen/XWKJojR
export default class InitScene {
  constructor() {
    this.loopCount

    // this.renderer = new THREE.WebGLRenderer({antialias: true, powerPreference: "high-performance"})
    this.renderer = new THREE.WebGLRenderer({antialias: true})
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

    window.addEventListener('resize', throttle(() => windowResize(this.camera, this.renderer), 100))
    window.addEventListener('keydown', (e) => this.keydown(e), 10)
    window.addEventListener('wheel', e => this.wheelScroll(e), false)
    window.addEventListener('mousemove', e => this.mouseMove(e), false)
    window.addEventListener('mousedown', e => this.mouseDown(e), false)
    window.addEventListener('mouseup', e => this.mouseUp(e), false)

    document.body.addEventListener('pause-animation', () => this.stopAnimate())
    document.body.addEventListener('start-animation', () => this.animate())
    document.body.addEventListener('three-test', (e) => console.log('test triggered in three', e.detail.x))
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

    const groupPositionX = 0
    // CARD
    const leftCardName = 'left-card'
    const cardDimensions = {x: 4, y: 6, z: 0.1}
    const verticalFrameDimensions = {x: 0.1, y: 6, z: 0.1}
    const horizontalFrameDimensions = {x: 4, y: 0.1, z: 0.1}
    const itemSpacing = 0.1
    offsetRotateBoxObject(
      this.scene, `${leftCardName}`, 0xeffeef,
      cardDimensions, {x: groupPositionX, y: 0, z: 0}, {x: (-1 * cardDimensions.x / 2), y: 0, z: 0}
    )
    // BOX on CARD
    offsetRotateBoxObject(
      this.scene, `${leftCardName}-left-box`, 0x55ff55,
      verticalFrameDimensions, {x: groupPositionX, y: 0, z: 0}, {x: -1 * (cardDimensions.x - 0.05), y: 0, z: itemSpacing}
    )
    offsetRotateBoxObject(
      this.scene, `${leftCardName}-right-box`, 0xff5555,
      verticalFrameDimensions, {x: groupPositionX, y: 0, z: 0}, {x: 0, y: 0, z: itemSpacing}
    )
    offsetRotateBoxObject(
      this.scene, `${leftCardName}-top-box`, 0x5555ff,
      horizontalFrameDimensions, {x: groupPositionX, y: 0, z: 0},
      {x: (-1 * cardDimensions.x / 2), y: cardDimensions.y / 2, z: itemSpacing}
    )
    offsetRotateBoxObject(
      this.scene, `${leftCardName}-bottom-box`, 0xff55ff,
      horizontalFrameDimensions, {x: groupPositionX, y: 0, z: 0},
      {x: (-1 * cardDimensions.x / 2), y: (-1 * cardDimensions.y / 2), z: itemSpacing}
    )
    // LOGO on CARD
    await offsetRotateTextureObject(this.scene, this.TextureLoader, snowdropsLogo1,
      {x: 1, y: 1}, {x: groupPositionX, y: 0, z: 0}, {x: -1, y: -2.25, z: itemSpacing},
      `${leftCardName}-snowdrops-logo`, 0xffffff
    )
    // MESSAGE on CARD
    offsetRotateTextObject(
      this.scene, this.fonter, `${leftCardName}-message`, 0x000000,
      'Happy Birthday!\n\nMay this be the day,\nHappy Birthday today!\nAnd if today is not that day,\nmay this card make it that\nway.\n\nSincerely,\nSnowdrops',
      0.35, {x: groupPositionX, y: 0, z: 0}, {x: -7.5, y: 4, z: 0.20}, 0.5
    )

    /**Card 2 */
    // CARD
    const rightCardName = 'right-card'
    offsetRotateBoxObject(
      this.scene, `${rightCardName}`, 0xeffeef,
      cardDimensions, {x: groupPositionX, y: 0, z: 0}, {x: cardDimensions.x / 2, y: 0, z: 0},
    )

    // MESSAGE on CARD
    offsetRotateTextObject(
      this.scene, this.fonter, `${rightCardName}-claim-message`, 0x000000, 'Claim your ETH: 0.5',
      0.5, {x: groupPositionX, y: 0, z: 0}, {x: 1, y: 1, z: 0.15}, 0.5
    )

    // Claim Button
    offsetRotateBoxObject(
      this.scene, `claim-button`, 0x55ff55,
      {x: 1.5, y: 0.5, z: 0.1},{x: groupPositionX, y: 0, z: 0}, {x: 2, y: 0, z: itemSpacing},
    )
    offsetRotateTextObject(
      this.scene, this.fonter, `claim-button-text`, 0x000000, 'Claim!',
      0.2, {x: groupPositionX, y: 0, z: 0}, {x: 1.6, y: -0.1, z: 0.20}
    )

    // BOX on CARD
    offsetRotateBoxObject(
      this.scene, `${rightCardName}-left-box`, 0x55ff55,
      {x: 0.1, y: 6, z: 0.1}, {x: groupPositionX, y: 0, z: 0}, {x: 0, y: 0, z: itemSpacing}
    )
    offsetRotateBoxObject(
      this.scene, `${rightCardName}-right-box`, 0xff5555,
      {x: 0.1, y: 6, z: 0.1}, {x: groupPositionX, y: 0, z: 0}, {x: cardDimensions.x, y: 0, z: itemSpacing}
    )
    offsetRotateBoxObject(
      this.scene, `${rightCardName}-top-box`, 0x5555ff,
      {x: 4, y: 0.1, z: 0.1}, {x: groupPositionX, y: 0, z: 0}, {x: cardDimensions.x / 2, y: cardDimensions.y / 2, z: itemSpacing}
    )
    offsetRotateBoxObject(
      this.scene, `${rightCardName}-bottom-box`, 0xff55ff,
      {x: 4, y: 0.1, z: 0.1}, {x: groupPositionX, y: 0, z: 0}, {x: cardDimensions.x / 2, y: -1 * cardDimensions.y / 2, z: itemSpacing}
    )

    //CARD FRONT
    const frontCardName = 'front-card'
    offsetRotateBoxObject(
      this.scene, `${frontCardName}-object`, 0xff55ff,
      {x: 2, y: 2, z: 0.1}, {x: groupPositionX, y: 0, z: 0}, {x: -2, y: 1, z: (-1 * itemSpacing)}
    )

    //BACK CARD
    const backCardName = 'back-card'
    offsetRotateBoxObject(
      this.scene, `${backCardName}-object`, 0xff5533,
      {x: 2, y: 2, z: 0.1}, {x: groupPositionX, y: 0, z: 0}, {x: 2, y: 1, z: (-1 * itemSpacing)}
    )

    /* ROTATIONS */
    const rotation_factor = 8
    // LEFT CARD
    this.scene.getObjectByName(`${leftCardName}`).rotation.y += Math.PI / rotation_factor
    this.scene.getObjectByName(`${leftCardName}-left-box`).rotation.y += Math.PI / rotation_factor
    this.scene.getObjectByName(`${leftCardName}-right-box`).rotation.y += Math.PI / rotation_factor
    this.scene.getObjectByName(`${leftCardName}-top-box`).rotation.y += Math.PI / rotation_factor
    this.scene.getObjectByName(`${leftCardName}-bottom-box`).rotation.y += Math.PI / rotation_factor
    this.scene.getObjectByName(`${leftCardName}-snowdrops-logo`).rotation.y += Math.PI / rotation_factor
    this.scene.getObjectByName(`left-card-message`).rotation.y += Math.PI / rotation_factor

    // RIGHT CARD
    this.scene.getObjectByName(`${rightCardName}`).rotation.y -= Math.PI / rotation_factor
    this.scene.getObjectByName(`${rightCardName}-claim-message`).rotation.y -= Math.PI / rotation_factor
    this.scene.getObjectByName(`claim-button`).rotation.y -= Math.PI / rotation_factor
    this.scene.getObjectByName(`claim-button-text`).rotation.y -= Math.PI / rotation_factor

    this.scene.getObjectByName(`${rightCardName}-left-box`).rotation.y -= Math.PI / rotation_factor
    this.scene.getObjectByName(`${rightCardName}-right-box`).rotation.y -= Math.PI / rotation_factor
    this.scene.getObjectByName(`${rightCardName}-top-box`).rotation.y -= Math.PI / rotation_factor
    this.scene.getObjectByName(`${rightCardName}-bottom-box`).rotation.y -= Math.PI / rotation_factor

    // FRONT CARD
    this.scene.getObjectByName(`${frontCardName}-object`).rotation.y += Math.PI / rotation_factor

    // BACK CARD
    this.scene.getObjectByName(`${backCardName}-object`).rotation.y -= Math.PI / rotation_factor

    this.animate()
  }

  animate() {
    this.renderer.setAnimationLoop(() => {
      const rotation_factor = 512
      if (1 > 2) {
        // LEFT CARD ROTATIONS
        this.scene.getObjectByName('left-card').rotation.y += Math.PI / rotation_factor
        this.scene.getObjectByName('left-card-left-box').rotation.y += Math.PI / rotation_factor
        this.scene.getObjectByName('left-card-right-box').rotation.y += Math.PI / rotation_factor
        this.scene.getObjectByName('left-card-top-box').rotation.y += Math.PI / rotation_factor
        this.scene.getObjectByName('left-card-bottom-box').rotation.y += Math.PI / rotation_factor
        this.scene.getObjectByName('left-card-snowdrops-logo').rotation.y += Math.PI / rotation_factor
        this.scene.getObjectByName('left-card-message').rotation.y += Math.PI / rotation_factor
    
        // RIGHT CARD
        this.scene.getObjectByName('right-card').rotation.y -= Math.PI / rotation_factor
        this.scene.getObjectByName('right-card-claim-message').rotation.y -= Math.PI / rotation_factor
        this.scene.getObjectByName('claim-button').rotation.y -= Math.PI / rotation_factor
        this.scene.getObjectByName('claim-button-text').rotation.y -= Math.PI / rotation_factor
    
        this.scene.getObjectByName('right-card-left-box').rotation.y -= Math.PI / rotation_factor
        this.scene.getObjectByName('right-card-right-box').rotation.y -= Math.PI / rotation_factor
        this.scene.getObjectByName('right-card-top-box').rotation.y -= Math.PI / rotation_factor
        this.scene.getObjectByName('right-card-bottom-box').rotation.y -= Math.PI / rotation_factor
    
        // FRONT CARD
        this.scene.getObjectByName('front-card-object').rotation.y += Math.PI / rotation_factor
    
        // BACK CARD
        this.scene.getObjectByName('back-card-object').rotation.y -= Math.PI / rotation_factor
      }

      const intersects = this.raycaster.intersectObjects(this.scene.children)
      if (intersects.length > 0) {
        // if (typeof intersects[0].object !== 'undefined' && (intersects[0].object.name.includes('claim-button') || intersects[0].object.name.includes('claim-button-text'))) {
        //   // console.log(intersects[0].object.name)
        //   let claimButton = this.scene.getObjectByName('claim-button')
        //   // console.log(claimButton)
        //   claimButton.material.color.set(`#99FF99`)
        // } else {
        //   let claimButton = this.scene.getObjectByName('claim-button')
        //   claimButton.material.color.set(`#00FF00`)
        // }
        const hexValues = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
        if (this.loopCount % 15 === 0) {
          let hex = ''
          for(let i = 0; i < 6; i++){
            const index = Math.floor(Math.random() * hexValues.length)
            hex += hexValues[index];
          }
          intersects[0].object.material.color.set(`#${hex}`)
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
    console.log(e.key)
    if (e.key === 'p') {
      this.stopAnimate()
    }

    if (e.key === 's') {
      this.animate()
    }
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
    if (intersects.length > 0) {
      if (intersects[0].object.name === 'cube_0') {
        console.log('cube 0 clicked')
        const evt_cube_click = new Event('cube-click')
        document.body.dispatchEvent(evt_cube_click)
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
