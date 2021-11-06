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

    const doorMesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry(4, 6, 0.1),
      new THREE.MeshStandardMaterial({ color: 0xff5555 })
    )
    this.door = new THREE.Object3D()
    this.door.add(doorMesh.clone())
    this.door.children[0].position.set(-2, 0, 0)
    this.door.position.set(0, 0, 0)
    this.scene.add(this.door)

    const sampleMesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry(1, 1, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x55ff55 })
    )
    this.sampleBox = new THREE.Object3D()
    this.sampleBox.add(sampleMesh.clone())
    this.sampleBox.children[0].position.set(-3.5, 0, 0.2)
    this.sampleBox.position.set(0, 0, 0)
    this.scene.add(this.sampleBox)

    // textureToPlane(this.TextureLoader, this.scene, snowdropsLogoRed1024, 5, 5, {x: 5, y: 1, z: 0})

    const snowdropsLogoTexture = await this.TextureLoader.load(snowdropsLogoRed1024)
    const snowdropsLogoMaterial = new THREE.MeshBasicMaterial({
      map: snowdropsLogoTexture, side: THREE.DoubleSide, color: 0xffffff, transparent: true
    })
    const snowdropsLogoPlane = new THREE.PlaneGeometry(1, 1)
    const snowdropsMesh = new THREE.Mesh(snowdropsLogoPlane, snowdropsLogoMaterial)
    this.sd = new THREE.Object3D()
    this.sd.add(snowdropsMesh.clone())
    this.sd.children[0].position.set(-3.5, 2, 0.2)
    this.sd.position.set(0, 0, 0)
    this.scene.add(this.sd)

    this.animate()
  }

  animate() {
    this.renderer.setAnimationLoop(() => {
      // const cube = this.scene.getObjectByName('cube')
      // this.door.rotation.y += Math.PI / 128
      // this.sampleBox.rotation.y += Math.PI / 128
      // this.sd.rotation.y += Math.PI / 128

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
    console.log(e.key)
  }

  wheelScroll(e) {
    if (e.deltaY > 0) {
      this.camera.z += 1
    } else {
      this.camera.z -= 1
    }
  }

  mouseDown(e) {
    e.preventDefault()
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
    e.preventDefault()
  }

  mouseMove(e) {
    e.preventDefault()
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
