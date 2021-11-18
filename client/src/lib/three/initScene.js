// https://discoverthreejs.com/book/first-steps/animation-loop/
// https://github.com/emreacar/google-fonts-as-json/tree/master/json-files
'use strict'
import { store } from '../../store/store'
import { throttle } from 'lodash-es'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Font } from 'three/examples/jsm/loaders/FontLoader'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

import windowResize from './methods/windowResize'
import LoadGLTFs from './methods/loadGLTF'
import loadLights from './methods/loadLights'

import DefaultCardInfo from '../DefaultCardInfo'

import offsetRotateBoxObject from './methods/offsetRotateBoxObject'
import offsetRotateTextureObject from './methods/offsetRotateTextureObject'
import offsetRotateTextObject from './methods/offsetRotateTextObject'
import offsetRotateButtonObject from './methods/offsetRotateButtonObject'
import pageFrame from './methods/pageFrame'
import handleObjectRotations from './methods/handleObjectRotations'
import autoFormatMessage from './methods/autoFormatMessage'
import floatingParticles from './methods/floatingParticles'
import addFrames from './methods/addFrames'

import avocado from '../../assets/glb/Avocado.glb'

import font_caviar from '../../assets/fonts/CaviarDreams_Regular.json'
import font_marg from '../../assets/fonts/MargatroidGrotesque.json'

import snowdropsLogo1 from '../../assets/snowdrops-logo-1.png'
import basicHeart from '../../assets/basic-heart-1024.png'

export default class InitScene {
  constructor() {
    this.loopCount
    console.log(store.getState())
    // store.dispatch({type: 'main', payload: {...state}})

    // this.renderer = new THREE.WebGLRenderer({antialias: true, powerPreference: "high-performance"})
    this.renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer: false})
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

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
    this.scene.background = new THREE.Color('#222222')
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    this.camera.position.z = 10
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 0, 0)
    // this.controls.maxDistance = 10
    // this.controls.minDistance = 5
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

    this.cardIterator = {left: 'in', right: 'in', left: 'out', right: 'out'}
    this.basePosition = {x: 0, y: 0, z: 0}
    this.cardDimensions = {x: 4, y: 6, z: 0.1}
    this.greetingDimensions = {x: -7.5, y: 4, z: 0.2}

    this.cardInfo = DefaultCardInfo
    this.cardInfo.left.in.greeting.message = 'Happy Birthday!\n\nMay this be the day,\nHappy Birthday today!\nAnd if today is not that day,\nmay this card make it that\nway.\n\nSincerely,\nSnowdrops'
    document.body.addEventListener('update-three-redux', () => {
      console.log(store.getState())
    })
    /* TODO change to Toggle Animation */
    document.body.addEventListener('pause-animation', () => this.stopAnimate())
    document.body.addEventListener('start-animation', () => this.animate())
    document.body.addEventListener('handle-card-message', (e) => {
      if (this.cardInfo.left.in.greeting.message !== e.detail.msg) {
        this.cardInfo.left.in.greeting.message = e.detail.msg

        const saveRotation = this.scene.getObjectByName('greeting').rotation.y
        this.scene.remove(this.scene.getObjectByName('greeting'))
        offsetRotateTextObject(
          this.scene, this.fonter, this.cardInfo.left.in.greeting.name, 0x000000, this.cardInfo.left.in.greeting.message,
          0.35, this.cardInfo.basePosition, {x: -7.5, y: 4, z: this.cardInfo.itemSpacingIn + 0.1}, 0.5
        )
        this.scene.getObjectByName('greeting').rotation.y = saveRotation
      }
    })
    document.body.addEventListener('handle-card-frame', (e) => {
      const cardUpdate = e.detail
      ;['left', 'right'].forEach(card => {
        ['in', 'out'].forEach(side => {
          if (cardUpdate[card][side].framesActive !== this.cardInfo[card][side].framesActive) {
            if (this.cardInfo[card][side].framesActive === true && cardUpdate[card][side].framesActive === false) {
              // Remove
              this.scene.remove(this.scene.getObjectByName(this.cardInfo[card][side].frames.left.name))
              this.scene.remove(this.scene.getObjectByName(this.cardInfo[card][side].frames.right.name))
              this.scene.remove(this.scene.getObjectByName(this.cardInfo[card][side].frames.top.name))
              this.scene.remove(this.scene.getObjectByName(this.cardInfo[card][side].frames.bottom.name))
            } else if (this.cardInfo[card][side].framesActive === false && cardUpdate[card][side].framesActive === true) {
              // add
              const rotation = this.scene.getObjectByName(this.cardInfo[card].name).rotation.y
              addFrames(this.scene, this.cardInfo, `${card}-${side}`, rotation)
            }
            this.cardInfo[card][side].framesActive = cardUpdate[card][side].framesActive
          }
    
          Object.keys(cardUpdate[card][side].frames).forEach(frame => {
            if (cardUpdate[card][side].frames[frame].color !== this.cardInfo[card][side].frames[frame].color) {
              console.log('color changed!')
              console.log(cardUpdate[card][side].frames[frame].color, this.cardInfo[card][side].frames[frame].color)
              console.log(card, side, frame)
              if (this.cardInfo[card][side].framesActive) {
                this.scene.getObjectByName(this.cardInfo[card][side].frames[frame].name).children[0].material.color.set(`#${cardUpdate[card][side].frames[frame].color}`)
              }
              this.cardInfo[card][side].frames[frame].color = cardUpdate[card][side].frames[frame].color
            }
          })
        })
      })
    })

    window.addEventListener('resize', throttle(() => windowResize(this.camera, this.renderer), 100))
    window.addEventListener('keydown', (e) => this.keydown(e), 10)
    window.addEventListener('wheel', e => this.wheelScroll(e), false)
    window.addEventListener('mousemove', e => this.mouseMove(e), false)
    window.addEventListener('mousedown', e => this.mouseDown(e), false)
    window.addEventListener('mouseup', e => this.mouseUp(e), false)
  }

  async init() {
    // Lights
    loadLights(this.scene)
    // const axesHelper = new THREE.AxesHelper(5)
    // this.scene.add(axesHelper)
    this.SkySphere = new THREE.Mesh(new THREE.SphereBufferGeometry(20, 32, 32), new THREE.MeshBasicMaterial({color: '#CCBBFF', side: THREE.DoubleSide, transparent: true, opacity: 0.5}))
    this.SkySphere.name = 'sky-sphere'
    this.scene.add(this.SkySphere)
    this.Floor = new THREE.Mesh(new THREE.BoxBufferGeometry(40, 40, 1), new THREE.MeshBasicMaterial({color: '#EEFFFF'}))
    this.Floor.rotation.x = Math.PI / 2
    this.Floor.position.set(0, -5, 0)
    this.Floor.name = 'floor'
    this.scene.add(this.Floor)

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
    // await floatingParticles(this.scene, this.TextureLoader, basicHeart)


    /** CARD **/

    /* CARD LEFT */
    offsetRotateBoxObject(
      this.scene, this.cardInfo.left.name, 0xeffeef,
      this.cardDimensions, this.cardInfo.basePosition, {x: (-1 * this.cardDimensions.x / 2), y: 0, z: 0}
    )
    /* CARD RIGHT */
    offsetRotateBoxObject(
      this.scene, this.cardInfo.right.name, 0xeffeef,
      this.cardDimensions, this.cardInfo.basePosition, {x: this.cardDimensions.x / 2, y: 0, z: 0},
    )

    // Card Frame
    if (this.cardInfo.left.in.framesActive) addFrames(this.scene, this.cardInfo, 'left-in')
    if (this.cardInfo.right.in.framesActive) addFrames(this.scene, this.cardInfo, 'right-in')
    if (this.cardInfo.left.out.framesActive) addFrames(this.scene, this.cardInfo, 'left-out')
    if (this.cardInfo.right.out.framesActive) addFrames(this.scene, this.cardInfo, 'right-out')

    // LOGO on CARD
    await offsetRotateTextureObject(this.scene, this.TextureLoader, snowdropsLogo1,
      {x: 1, y: 1}, this.cardInfo.basePosition, {x: -1, y: -2.25, z: this.cardInfo.itemSpacingIn},
      `left-in-snowdrops-logo`, 0xffffff
    )
    this.cardInfo.left.in.other.push(`left-in-snowdrops-logo`)

    // MESSAGE on CARD
    offsetRotateTextObject(
      this.scene, this.fonter, this.cardInfo.left.in.greeting.name, 0x000000, this.cardInfo.left.in.greeting.message,
      0.35, this.cardInfo.basePosition, {x: -7.5, y: 4, z: this.cardInfo.itemSpacingIn + 0.1}, 0.5
    )

    // CLAIM Message
    offsetRotateTextObject(
      this.scene, this.fonter, this.cardInfo.right.in.claim.message.name, 0x000000, this.cardInfo.right.in.claim.message.message,
      0.5, this.cardInfo.basePosition, {x: 1, y: 1, z: 0.15}, 0.5
    )
    // Claim Button
    offsetRotateBoxObject(
      this.scene, this.cardInfo.right.in.claim.button.name, 0x55ff55,
      {x: 1.5, y: 0.5, z: 0.1}, this.cardInfo.basePosition, {x: 2, y: 0, z: this.cardInfo.itemSpacingIn},
    )
    offsetRotateTextObject(
      this.scene, this.fonter, this.cardInfo.right.in.claim.buttonText.name, 0x000000, this.cardInfo.right.in.claim.buttonText.message,
      0.2, this.cardInfo.basePosition, {x: 1.6, y: -0.1, z: 0.20}
    )

    /* CARD FRONT Objects */
    offsetRotateBoxObject(
      this.scene, `left-out-object`, 0xff55ff,
      {x: 2, y: 2, z: 0.1}, this.cardInfo.basePosition, {x: -2, y: 1, z: this.cardInfo.itemSpacingOut}
    )
    this.cardInfo.left.out.other.push(`left-out-object`)

    /* BACK CARD Objects */
    offsetRotateBoxObject(
      this.scene, `right-out-object`, 0xff5533,
      {x: 2, y: 2, z: 0.1}, this.cardInfo.basePosition, {x: 2, y: 1, z: this.cardInfo.itemSpacingOut}
    )
    this.cardInfo.right.out.other.push('right-out-object')

    /* ROTATIONS */
    const rotation_factor = 8
    handleObjectRotations(this.scene, this.cardInfo, rotation_factor)

    this.animate()
  }

  animate() {
    this.renderer.setAnimationLoop(() => {
      // Animatated 360 degree rotation
      const rotation_factor = 512
      if (1 > 2) {
        handleObjectRotations(this.scene, this.cardInfo, rotation_factor)
      }

      const intersects = this.raycaster.intersectObjects(this.scene.children)
      if (intersects.length > 0) {
        
        // Ignore Raycasting of Particles
        let intersectionLayer = 0
        while (intersects[intersectionLayer].object.name === 'particles' && intersects.length > intersectionLayer + 1) {
          intersectionLayer++
        }

        if (typeof intersects[intersectionLayer].object !== 'undefined'
          && (intersects[intersectionLayer].object.parent.name.includes('claim-button')
          || intersects[intersectionLayer].object.parent.name.includes('claim-button-text'))
        ) {
          this.scene.getObjectByName('claim-button').children[0].material.color.set(`#66FF66`)
          document.body.style.cursor = 'pointer'
        } else {
          this.scene.getObjectByName('claim-button').children[0].material.color.set(`#00FF00`)
          document.body.style.cursor = 'default'
        }
      }

      this.renderer.render(this.scene, this.camera)
    })
  }

  stopAnimate() {
    this.renderer.setAnimationLoop(null)
  }

  keydown(e) {
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
    const intersects = this.raycaster.intersectObjects( this.scene.children )
    if (intersects.length > 0 && typeof intersects[0].object !== 'undefined') {
      if (intersects[0].object.parent.name.includes('claim-button')
        || intersects[0].object.parent.name.includes('claim-button-text'))
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
