// https://discoverthreejs.com/book/first-steps/animation-loop/
// https://github.com/emreacar/google-fonts-as-json/tree/master/json-files
'use strict'
import { store } from '../../store/store'
import { throttle } from 'lodash-es'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Font } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

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
import floatingParticles from './methods/floatingParticles'

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
    this.renderer = new THREE.WebGLRenderer({antialias: false, logarithmicDepthBuffer: false})
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

    this.objectCardNames = {
      left: {
        card: 'left-card',
        in: { frames: [], message: '', other: [] },
        out: { frames: [], other: [] }
      },
      right: {
        card: 'right-card',
        in: { frames: [], claim: [], other: [] },
        out: { frames: [], other: [] },
      }
    }
    this.basePosition = {x: 0, y: 0, z: 0}
    this.cardDimensions = {x: 4, y: 6, z: 0.1}

    this.cardMessage = 'Happy Birthday!\n\nMay this be the day,\nHappy Birthday today!\nAnd if today is not that day,\nmay this card make it that\nway.\n\nSincerely,\nSnowdrops'
    this.cardFrames = {
      frameColors: {
        leftIn: {'left-in-left-frame': '55ff55', 'left-in-right-frame': 'ff5555', 'left-in-top-frame': '5555ff', 'left-in-bottom-frame': 'ff55ff'},
        rightIn: {'right-in-left-frame': '55ff55', 'right-in-right-frame': 'ff5555', 'right-in-top-frame': '5555ff', 'right-in-bottom-frame': 'ff55ff'},
        leftOut: {'left-out-left-frame': '55ff55', 'left-out-right-frame': 'ff5555', 'left-out-top-frame': '5555ff', 'left-out-bottom-frame': 'ff55ff'},
        rightOut: {'right-out-left-frame': '55ff55', 'right-out-right-frame': 'ff5555', 'right-out-top-frame': '5555ff', 'right-out-bottom-frame': 'ff55ff'}
      },
      setFrames: {'left-in-frames': true, 'right-in-frames': true, 'left-out-frames': true, 'right-out-frames': true}
    }
    this.frameSetActions = []
    this.frameColorActions = []
    this.updateCardMessage = false
    this.updateCardFrameSet = false
    this.updateCardFrameColor = false

    document.body.addEventListener('update-three-redux', () => {
      console.log(store.getState())
    })
    /* TODO change to Toggle Animation */
    document.body.addEventListener('pause-animation', () => this.stopAnimate())
    document.body.addEventListener('start-animation', () => this.animate())
    document.body.addEventListener('handle-card-message', (e) => {
      console.log(this.cardMessage)
      if (this.cardMessage !== e.detail.msg) {
        this.updateCardMessage = true
        this.cardMessage = e.detail.msg
      }
    })
    document.body.addEventListener('handle-card-frame', (e) => {
      this.updateCardFrameSet = true
      Object.keys(e.detail.setFrames).forEach(key => {
        switch(key) {
          case 'left-in-frames':
            if (e.detail.setFrames[key]) {

            } else {

            }
            break;
          case 'right-in-frames':
            break;
          case 'left-out-frames':
            break;
          case 'right-out-frames':
            break;
        }
      })
      e.detail.frameColors
      // Object.keys(this.cardFrames.setFrames).forEach(frame => {
      //   // console.log(frame, this.cardFrames.setFrames[frame])
      //   if (this.cardFrames.setFrames[frame] !== e.detail.setFrames[frame]) {
      //     this.updateCardFrameSet = true
      //     this.frameSetActions.push({frame: frame, action: e.detail.setFrames[frame]})
      //     this.cardFrames.setFrames[frame] = e.detail.setFrames[frame]
      //   }
      // })

      // Object.keys(this.cardFrames.frameColors).forEach(side => {
      //   Object.keys(this.cardFrames.frameColors[side]).forEach(frameName => {
      //     if (this.cardFrames.frameColors[side][frameName] !== e.detail.frameColors[side][frameName]) {
      //       this.updateCardFrameColor = true
      //       this.frameColorActions.push({frame: frameName, action: e.detail.frameColors[side][frameName]})
      //     }
      //   })
      // })
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

    await floatingParticles(this.scene, this.TextureLoader, basicHeart)



    /** CARD **/
    const itemSpacingInside = 0.1
    const itemSpacingOutside = -0.1

    /* CARD LEFT */
    offsetRotateBoxObject(
      this.scene, this.objectCardNames.left.card, 0xeffeef,
      this.cardDimensions, this.basePosition, {x: (-1 * this.cardDimensions.x / 2), y: 0, z: 0}
    )

    /* CARD RIGHT */
    offsetRotateBoxObject(
      this.scene, this.objectCardNames.right.card, 0xeffeef,
      this.cardDimensions, this.basePosition, {x: this.cardDimensions.x / 2, y: 0, z: 0},
    )

    // Card Frame
    this.objectCardNames.left.in.frames.push(...pageFrame(this.scene, this.basePosition, 'left-in', this.cardDimensions, []))
    this.objectCardNames.right.in.frames.push(...pageFrame(this.scene, this.basePosition, 'right-in', this.cardDimensions, []))
    this.objectCardNames.left.out.frames.push(...pageFrame(this.scene, this.basePosition, 'left-out', this.cardDimensions, []))
    this.objectCardNames.right.out.frames.push(...pageFrame(this.scene, this.basePosition, 'right-out', this.cardDimensions, []))

    // LOGO on CARD
    await offsetRotateTextureObject(this.scene, this.TextureLoader, snowdropsLogo1,
      {x: 1, y: 1}, this.basePosition, {x: -1, y: -2.25, z: itemSpacingInside},
      `left-in-snowdrops-logo`, 0xffffff
    )
    this.objectCardNames.left.in.other.push(`left-in-snowdrops-logo`)

    // MESSAGE on CARD
    autoFormatMessage(this.cardMessage)
    offsetRotateTextObject(
      this.scene, this.fonter, `left-in-message`, 0x000000,
      this.cardMessage,
      0.35, this.basePosition, {x: -7.5, y: 4, z: itemSpacingInside + 0.1}, 0.5
    )
    this.objectCardNames.left.in.message = `left-in-message`

    // CLAIM Message
    offsetRotateTextObject(
      this.scene, this.fonter, `right-in-claim-message`, 0x000000, 'Claim your ETH: 0.5',
      0.5, this.basePosition, {x: 1, y: 1, z: 0.15}, 0.5
    )
    this.objectCardNames.right.in.claim.push(`right-in-claim-message`)

    // Claim Button
    offsetRotateBoxObject(
      this.scene, `right-in-claim-button`, 0x55ff55,
      {x: 1.5, y: 0.5, z: 0.1}, this.basePosition, {x: 2, y: 0, z: itemSpacingInside},
    )
    this.objectCardNames.right.in.claim.push(`right-in-claim-button`)

    offsetRotateTextObject(
      this.scene, this.fonter, `right-in-claim-button-text`, 0x000000, 'Claim!',
      0.2, this.basePosition, {x: 1.6, y: -0.1, z: 0.20}
    )
    this.objectCardNames.right.in.claim.push(`right-in-claim-button-text`)

    /* CARD FRONT Objects */
    offsetRotateBoxObject(
      this.scene, `left-out-object`, 0xff55ff,
      {x: 2, y: 2, z: 0.1}, this.basePosition, {x: -2, y: 1, z: itemSpacingOutside}
    )
    this.objectCardNames.left.out.other.push(`left-out-object`)


    /* BACK CARD Objects */
    offsetRotateBoxObject(
      this.scene, `right-out-object`, 0xff5533,
      {x: 2, y: 2, z: 0.1}, this.basePosition, {x: 2, y: 1, z: itemSpacingOutside}
    )
    this.objectCardNames.right.out.other.push(`right-out-object`)

    /* ROTATIONS */
    const rotation_factor = 8
    handleObjectRotations(this.scene, this.objectCardNames, rotation_factor)

    this.animate()
  }

  animate() {
    this.renderer.setAnimationLoop(() => {
      // Animatated 360 degree rotation
      const rotation_factor = 512
      if (1 > 2) {
        handleObjectRotations(this.scene, this.objectCardNames, rotation_factor)
      }

      // Update card message
      if (this.updateCardMessage) {
        const saveRotation = this.scene.getObjectByName('left-in-message').rotation.y
        this.scene.remove(this.scene.getObjectByName('left-in-message'))
        offsetRotateTextObject(
          this.scene, this.fonter, `left-in-message`, 0x000000,
          this.cardMessage,
          0.35, this.basePosition, {x: -7.5, y: 4, z: 0.2}, 0.5
        )
        this.scene.getObjectByName('left-in-message').rotation.y = saveRotation
        this.updateCardMessage = false
      }

      if (this.updateCardFrameSet) {
        this.updateCardFrameSet = false
        this.frameSetActions.forEach(action => {
          const idx = action.frame.indexOf('-', 6)
          const cardSide = action.frame.substr(0, idx)
          console.log(cardSide)
          if (action.action) {
            pageFrame(this.scene, this.basePosition, `${cardSide}-right-frame`, this.cardDimensions, [], this.scene.getObjectByName(`${cardSide}-card`).rotation.y)
          } else {
            
            const frameNames = [`${cardSide}-card-left-frame`, `${cardSide}-card-right-frame`, `${cardSide}-card-top-frame`, `${cardSide}-card-bottom-frame`]
            frameNames.forEach(frameName => {
              console.log(this.scene.getObjectByName(frameName))
              this.scene.remove(this.scene.getObjectByName(frameName))
            })
          }
        })
      }

      if (this.updateCardFrameColor) {
        this.updateCardFrameColor = false
        this.frameColorActions.forEach(action => {
          const idx = action.frame.indexOf('-', 6)
          const name = action.frame.substr(0, idx)
          console.log(name)
          console.log(action.frame, action.action)
          // this.scene.getObjectByName()
        })
      }

      const intersects = this.raycaster.intersectObjects(this.scene.children)
      if (intersects.length > 0) {
        
        // Ignore Raycasting of Particles
        let intersectionLayer = 0
        while (intersects[intersectionLayer].object.name === 'particles' && intersects.length > intersectionLayer + 1) {
          intersectionLayer++
        }

        if (typeof intersects[intersectionLayer].object !== 'undefined'
          && (intersects[intersectionLayer].object.parent.name.includes('right-in-claim-button')
          || intersects[intersectionLayer].object.parent.name.includes('right-in-claim-button-text'))
        ) {
          this.scene.getObjectByName('right-in-claim-button').children[0].material.color.set(`#66FF66`)
          document.body.style.cursor = 'pointer'
        } else {
          this.scene.getObjectByName('right-in-claim-button').children[0].material.color.set(`#00FF00`)
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
