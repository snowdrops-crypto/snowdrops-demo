'use strict'
import React, { useEffect, useState, useCallback } from 'react'
import Arweave from 'arweave'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import snowdropsLogoRedBgWhite1024 from '../../assets/snowdrops-logo-1024-bg-white.png'
import '../../scss/create-card.scss'

const CreateCard = () => {
  const rstate = useSelector((rstate) => rstate)
  const dispatch = useDispatch()
  const { appState } = bindActionCreators(actions, dispatch)

  const [message, setMessage] = useState('')
  const [colors, setColors] = useState({
    leftInCard: { l: '', r: '', t: '', b: ''},
    rightInCard: { l: '', r: '', t: '', b: ''},
    leftOutCard: { l: '', r: '', t: '', b: ''},
    rightOutCard: { l: '', r: '', t: '', b: ''},
  })
  const images = ['img1', 'img2', 'img3']
  const dev = true

  useEffect(() => {
    setMessage('Lorem Ipsum Upsum Heapson')
    appState({...rstate.main, status: 'create-card'})
    const evt = new Event('update-three-redux')
    document.body.dispatchEvent(evt)
  }, [])
  
  const handleButtonStartAnimation = () => {
    const evt = new Event('start-animation')
    document.body.dispatchEvent(evt)
  }
  const handleButtonStopAnimation = () => {
    const evt = new Event('pause-animation')
    document.body.dispatchEvent(evt)
  }
  const handleButtonSelectFrame = () => {
    const evt = new CustomEvent('select-card-frame', {detail: {cardSide: '', cardColors: []}})
    document.body.dispatchEvent(evt)
  }
  const handleCardMessage = () => {
    const evt = new CustomEvent('handle-card-message', {detail: {msg: message}})
    document.body.dispatchEvent(evt)
  }

  const handleMessage = e => {
    console.log(e.target.value)
    setMessage(e.target.value)
  }

  const handleUpdateMessage = () => {
    handleCardMessage()
    console.log(message)
  }

  const handleColors = (e) => {
    setColors(prevState => ({...prevState, leftInCard: { l: e.target.value } } ))
    console.log(colors)
  }

  const handleSelectImage = e => {
    console.log(e.target)
    e.target.className === '' ? e.target.className = 'selected-img' : e.target.className = ''
  }

  const assetRow = () => {
    const rows = []
    const dim = '80px'
    for(let i = 0; i < 3; i++) {
      rows.push(
        <div className='asset-row'>
          <img onClick={handleSelectImage} src={snowdropsLogoRedBgWhite1024} width={dim} height={dim} />
          <img onClick={handleSelectImage} src={snowdropsLogoRedBgWhite1024} width={dim} height={dim} />
          <img onClick={handleSelectImage} src={snowdropsLogoRedBgWhite1024} width={dim} height={dim} />
        </div>
      )
    }
    return rows
  }

  return (
    <div id='create-card-page'>
      <Header />
      <div id='page-title'>Create a Card</div>
      <div id='create-card-main'>
        <div id='create-card-content' className='enable-input'>
          <div className='create-card-title'>Message</div>
          <textarea value={message} className='card-message enable-input' onChange={handleMessage} />
          <button onClick={handleUpdateMessage}>Update Message</button>
          
          <hr />

          <div id='frame-container'>
            <div className='create-card-title'>Update Card Frame</div>
            <div><input type='checkbox' />Left Card Inside</div>
            <div className='color-container'>
              <div className='color-field'>
                left color<input max='6' name='leftInCardl' value={colors.leftInCard.l} onChange={handleColors} type='text' className='frame-color-input' />
              </div>
              <div className='color-field'>right color<input type='text' className='frame-color-input' /></div>
              <div className='color-field'>top color<input type='text' className='frame-color-input' /></div>
              <div className='color-field'>bottom color<input type='text' className='frame-color-input' /></div>
            </div>

            <hr className='color-frame-hr'/>
            <div><input type='checkbox' />Right Card Inside</div>
            <div className='color-container'>
              <div className='color-field'>left color<input type='text' className='frame-color-input' /></div>
              <div className='color-field'>right color<input type='text' className='frame-color-input' /></div>
              <div className='color-field'>top color<input type='text' className='frame-color-input' /></div>
              <div className='color-field'>bottom color<input type='text' className='frame-color-input' /></div>
            </div>

            <hr className='color-frame-hr'/>
            <div><input type='checkbox' />Left Card Outside</div>
            <div className='color-container'>
              <div className='color-field'>left color<input type='text' className='frame-color-input' /></div>
              <div className='color-field'>right color<input type='text' className='frame-color-input' /></div>
              <div className='color-field'>top color<input type='text' className='frame-color-input' /></div>
              <div className='color-field'>bottom color<input type='text' className='frame-color-input' /></div>
            </div>

            <hr className='color-frame-hr'/>
            <div><input type='checkbox' />Right Card Outside</div>
            <div className='color-container'>
              <div className='color-field'>left color<input type='text' className='frame-color-input' /></div>
              <div className='color-field'>right color<input type='text' className='frame-color-input' /></div>
              <div className='color-field'>top color<input type='text' className='frame-color-input' /></div>
              <div className='color-field'>bottom color<input type='text' className='frame-color-input' /></div>
            </div>

            <button>Update</button>
          </div>

          <hr className='main-hr'/>
          
          <div className='create-card-title'>List of Available Items</div>
          <div id='create-card-assets' className='enable-input'>
            {assetRow()}
          </div>
        </div>
        {dev ?
          <div id='three-control-buttons'>
            <button className='enable-input three-control-button' onClick={() => handleButtonThreeTest()}>three test</button>
            <button className='enable-input three-control-button' onClick={() => handleButtonStartAnimation()}>start animation</button>
            <button className='enable-input three-control-button' onClick={() => handleButtonStopAnimation()}>stop animation</button>
          </div> : ''
        }
      </div>
      <Footer />
    </div>
  )
}

export default CreateCard
