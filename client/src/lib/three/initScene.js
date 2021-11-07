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
import { MeshBasicMaterial } from 'three'
// rotation: https://codepen.io/mjurczyk/pen/XWKJojR
export default class InitScene {
  constructor() {
    this.loopCount

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
    this.scene.background = new THREE.Color( '#444444' )

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    this.camera.position.z = 10

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 0, 0)

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
  }

  async init() {
    // Lights
    loadLights(this.scene)
    
    const axesHelper = new THREE.AxesHelper(5)
    this.scene.add(axesHelper)

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
    // createCube(this.scene, -5, 0, 5)
    // createTree(this.scene, 8, 0, 8)
    // basicCard(this.scene, 3, 0, -3)

    // const material1 = new THREE.MeshBasicMaterial({
    //   side: THREE.DoubleSide, color: 0x00ff00, transparent: false
    // })
    // const material2 = new THREE.MeshBasicMaterial({
    //   side: THREE.DoubleSide, color: 0xff0000, transparent: false
    // })
    // const firstPage = new THREE.Mesh(new THREE.PlaneGeometry(4, 6), material1)
    // const secondPage = new THREE.Mesh(new THREE.PlaneGeometry(4, 6), material2)
  
    // firstPage.position.set(-2, 0, 0)
    // secondPage.position.set(2, 0, 3)
    // // firstPage.rotation.y = Math.PI/4
    // // secondPage.rotation.y = -Math.PI/4
  
    // this.scene.add(firstPage)
    // this.scene.add(secondPage)

    const groupPositionX = 0
    // CARD
    const cardLeftMesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry(4, 6, 0.1),
      new THREE.MeshStandardMaterial({ color: 0xeffeef })
    )
    this.cardLeft = new THREE.Object3D()
    this.cardLeft.add(cardLeftMesh.clone())
    this.cardLeft.children[0].position.set(-2, 0, 0)
    this.cardLeft.position.set(groupPositionX, 0, 0)
    this.scene.add(this.cardLeft)

    // BOX on CARD
    const leftCardLeftBoxMesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry(0.1, 6, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x55ff55 })
    )
    this.leftCardLeftBox = new THREE.Object3D()
    this.leftCardLeftBox.add(leftCardLeftBoxMesh.clone())
    this.leftCardLeftBox.children[0].position.set(-3.95, 0, 0.15)
    this.leftCardLeftBox.position.set(groupPositionX, 0, 0)
    this.scene.add(this.leftCardLeftBox)

    const rightBoxMesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry(0.1, 6, 0.1),
      new THREE.MeshStandardMaterial({ color: 0xff5555 })
    )
    this.rightBox = new THREE.Object3D()
    this.rightBox.add(rightBoxMesh.clone())
    this.rightBox.children[0].position.set(0, 0, 0.15)
    this.rightBox.position.set(groupPositionX, 0, 0)
    this.scene.add(this.rightBox)

    const topBoxMesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry(4, 0.1, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x5555ff })
    )
    this.topBox = new THREE.Object3D()
    this.topBox.add(topBoxMesh.clone())
    this.topBox.children[0].position.set(-2.05, 2.95, 0.15)
    this.topBox.position.set(groupPositionX, 0, 0)
    this.scene.add(this.topBox)

    const bottomBoxMesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry(4, 0.1, 0.1),
      new THREE.MeshStandardMaterial({ color: 0xff55ff })
    )
    this.bottomBox = new THREE.Object3D()
    this.bottomBox.add(bottomBoxMesh.clone())
    this.bottomBox.children[0].position.set(-2, -3, 0.15)
    this.bottomBox.position.set(groupPositionX, 0, 0)
    this.scene.add(this.bottomBox)

    // textureToPlane(this.TextureLoader, this.scene, snowdropsLogoRed1024, 5, 5, {x: 5, y: 1, z: 0})

    // LOGO on CARD
    const snowdropsLogoTexture = await this.TextureLoader.load(snowdropsLogo1)
    const snowdropsLogoMaterial = new THREE.MeshBasicMaterial({
      map: snowdropsLogoTexture, side: THREE.DoubleSide, color: 0xffffff, transparent: true
    })
    const snowdropsLogoPlane = new THREE.PlaneGeometry(1, 1)
    const snowdropsMesh = new THREE.Mesh(snowdropsLogoPlane, snowdropsLogoMaterial)
    this.sd = new THREE.Object3D()
    this.sd.add(snowdropsMesh.clone())
    this.sd.children[0].position.set(-1, -2.25, 0.2)
    this.sd.position.set(groupPositionX, 0, 0)
    this.scene.add(this.sd)

    // MESSAGE on CARD
    let message = new THREE.Mesh(
      new THREE.ShapeBufferGeometry(this.fonter.generateShapes('Happy Birthday!\n\nMay this be the day,\nHappy Happy Birthday\ntoday today!\nAnd if today is not today,\nmay this card be that way.\n\nSincerely,\nSnowdrops', 0.4)),
      new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide })
    )
    this.msg = new THREE.Object3D()
    this.msg.add(message.clone())
    this.msg.children[0].position.set(-7.5, 4, 0.15)
    this.msg.position.set(groupPositionX, 0, 0)
    this.msg.scale.set(0.5, 0.5, 0.5)
    this.scene.add(this.msg)


    /**Card 2 */
    // CARD
    const cardRightMesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry(4, 6, 0.1),
      new THREE.MeshStandardMaterial({ color: 0xeffeef })
    )
    this.cardRight = new THREE.Object3D()
    this.cardRight.add(cardRightMesh.clone())
    this.cardRight.children[0].position.set(2, 0, 0)
    this.cardRight.position.set(groupPositionX, 0, 0)
    this.scene.add(this.cardRight)

    // MESSAGE on CARD
    let message2 = new THREE.Mesh(
      new THREE.ShapeBufferGeometry(this.fonter.generateShapes('Claim your ETH: 0.5', 0.5)),
      new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide })
    )
    this.msg2 = new THREE.Object3D()
    this.msg2.add(message2.clone())
    this.msg2.children[0].position.set(1, 4, 0.15)
    this.msg2.position.set(groupPositionX, 0, 0)
    this.msg2.scale.set(0.5, 0.5, 0.5)
    this.scene.add(this.msg2)
    
    this.cardLeft.rotation.y += Math.PI / 8
    this.leftCardLeftBox.rotation.y += Math.PI / 8
    this.rightBox.rotation.y += Math.PI / 8
    this.topBox.rotation.y += Math.PI / 8
    this.bottomBox.rotation.y += Math.PI / 8
    this.sd.rotation.y += Math.PI / 8
    this.msg.rotation.y += Math.PI / 8

    this.cardRight.rotation.y -= Math.PI / 8
    this.msg2.rotation.y -= Math.PI / 8

    this.animate()
  }

  animate() {
    this.renderer.setAnimationLoop(() => {
      const rotation_speed = 1024
      const cube = this.scene.getObjectByName('cube')
      // this.cardLeft.rotation.y += Math.PI / rotation_speed
      // this.leftBox.rotation.y += Math.PI / rotation_speed
      // this.rightBox.rotation.y += Math.PI / rotation_speed
      // this.topBox.rotation.y += Math.PI / rotation_speed
      // this.bottomBox.rotation.y += Math.PI / rotation_speed
      // this.sd.rotation.y += Math.PI / rotation_speed
      // this.msg.rotation.y += Math.PI / rotation_speed

      // this.cardRight.rotation.y -= Math.PI / rotation_speed

      const intersects = this.raycaster.intersectObjects( this.scene.children )

      if (intersects.length > 0 && !intersects[0].object.name.includes('axis')) {
        // console.log(intersects[0].object.name)
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
    // console.log(e.key)
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
