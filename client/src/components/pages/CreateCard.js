'use strict'
import React, { useEffect, useState, useCallback } from 'react'
import Arweave from 'arweave'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import snowdropsLogoRedBgWhite1024 from '../../assets/snowdrops-logo-1024-bg-white.png'
import snowdropsLogo1024 from '../../assets/snowdrops-logo-1024.png'
import basicHeart from '../../assets/basic-heart-1024.png'

import '../../scss/create-card.scss'

const CreateCard = () => {
  const rstate = useSelector((rstate) => rstate)
  const dispatch = useDispatch()
  const { appState } = bindActionCreators(actions, dispatch)

  const [message, setMessage] = useState('')
  const [leftInColor, setLeftInColor] = useState({
    'left-in-left-frame': '55ff55',
    'left-in-right-frame': 'ff5555',
    'left-in-top-frame': '5555ff', 
    'left-in-bottom-frame': 'ff55ff'
  })
  const [rightInColor, setRightInColor] = useState({
    'right-in-left-frame': '55ff55',
    'right-in-right-frame': 'ff5555',
    'right-in-top-frame': '5555ff',
    'right-in-bottom-frame': 'ff55ff'
  })
  const [leftOutColor, setLeftOutColor] = useState({
    'left-out-left-frame': '55ff55',
    'left-out-right-frame': 'ff5555', 
    'left-out-top-frame': '5555ff',
    'left-out-bottom-frame': 'ff55ff'
  })
  const [rightOutColor, setRightOutColor] = useState({
    'right-out-left-frame': '55ff55',
    'right-out-right-frame': 'ff5555',
    'right-out-top-frame': '5555ff',
    'right-out-bottom-frame': 'ff55ff'
  })
  const [addFrames, setAddFrames] = useState({'left-in-frames': true, 'right-in-frames': true, 'left-out-frames': true, 'right-out-frames': true})

  const dev = true

  useEffect(() => {
    setMessage('Lorem Ipsum Upsum Heapson')
    appState({...rstate.main, status: 'create-card'})
    const evt = new Event('update-three-redux')
    document.body.dispatchEvent(evt)
    console.log('reset')
  }, [])
  
  const handleButtonStartAnimation = () => {
    const evt = new Event('start-animation')
    document.body.dispatchEvent(evt)
  }
  const handleButtonStopAnimation = () => {
    const evt = new Event('pause-animation')
    document.body.dispatchEvent(evt)
  }
  const handleUpdateMessage = () => {
    const evt = new CustomEvent('handle-card-message', {detail: {msg: message}})
    document.body.dispatchEvent(evt)
    console.log(message)
  }
  const handleUpdateFrame = () => {
    const evt = new CustomEvent('handle-card-frame', {
      detail: {
        frameColors: {
          leftIn: leftInColor,
          rightIn: rightInColor,
          leftOut: leftOutColor,
          rightOut: rightOutColor
        },
        setFrames: addFrames
      }
    })
    document.body.dispatchEvent(evt)
  }

  const updateCardFrames = () => {
    // const evt = new CustomEvent('select-card-frame', {detail: {cardSide: '', cardColors: []}})
    // document.body.dispatchEvent(evt)
    console.log(leftInColor)
    console.log(rightInColor)
    console.log(leftOutColor)
    console.log(rightOutColor)
    console.log(addFrames)
  }

  const handleMessage = e => {
    console.log(e.target.value)
    setMessage(e.target.value)
  }

  const handleColors = async (e, page) => {
    switch (page) {
      case 'leftIn':
        console.log(e.target.value)
        await setLeftInColor(prevState => ({...prevState, [e.target.name]: e.target.value}))
        break;
      case 'rightIn':
        setRightInColor(prevState => ({...prevState, [e.target.name]: e.target.value}))
        break;
      case 'leftOut':
        setLeftOutColor(prevState => ({...prevState, [e.target.name]: e.target.value}))
        break;
      case 'rightOut':
        setRightOutColor(prevState => ({...prevState, [e.target.name]: e.target.value}))
        break;
      default: console.error('CLIENT: Invalid card side inputted')
    }
    // setColors(prevState => ({...prevState, leftInCard: { l: e.target.value } } ))
  }

  const handleSelectImage = e => {
    console.log(e.target)
    e.target.className === '' ? e.target.className = 'selected-img' : e.target.className = ''
  }

  const handleFrameAdd = (e) => {
    console.log(e.target.checked)
    setAddFrames(prevState => ({...prevState, [e.target.name]: e.target.checked}))
  }

  const assetRow = () => {
    const rows = []
    const dim = '80px'
    for(let i = 0; i < 3; i++) {
      rows.push(
        <div key={`assetrow-${i}`} className='asset-row'>
          <img key={`asset-${i*3 + 0}`} onClick={handleSelectImage} src={snowdropsLogoRedBgWhite1024} width={dim} height={dim} />
          <img key={`asset-${i*3 + 1}`} onClick={handleSelectImage} src={snowdropsLogo1024} width={dim} height={dim} />
          <img key={`asset-${i*3 + 2}`} onClick={handleSelectImage} src={basicHeart} width={dim} height={dim} />
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
          <textarea value={message} className='card-message-input enable-input' onChange={handleMessage} />
          <button onClick={handleUpdateMessage}>Update Message</button>
          
          <hr />

          <div id='frame-container'>
            <div className='create-card-title'>Update Card Frame</div>
            <div><input type='checkbox' checked={addFrames['left-in-frames']} name='left-in-frames' onChange={handleFrameAdd} />Left Card Inside</div>
            <div className='color-container'>
              <div className='color-field'>
                left color
                <input max='6' type='text' className='frame-color-input' name='left-in-left-frame' value={leftInColor['left-in-left-frame']} onChange={(e) => handleColors(e, 'leftIn')}/>
              </div>
              <div className='color-field'>
                right color
                <input max='6' type='text' className='frame-color-input' name='left-in-right-frame' value={leftInColor['left-in-right-frame']} onChange={(e) => handleColors(e, 'leftIn')}/>
              </div>
              <div className='color-field'>
                top color
                <input max='6' type='text' className='frame-color-input' name='left-in-top-frame' value={leftInColor['left-in-top-frame']} onChange={(e) => handleColors(e, 'leftIn')}/>
              </div>
              <div className='color-field'>
                bottom color
                <input max='6' type='text' className='frame-color-input' name='left-in-bottom-frame' value={leftInColor['left-in-bottom-frame']} onChange={(e) => handleColors(e, 'leftIn')}/>
              </div>
            </div>

            <hr className='color-frame-hr'/>
            <div><input type='checkbox' checked={addFrames['right-in-frames']} name='right-in-frames' onChange={handleFrameAdd} />Right Card Inside</div>
            <div className='color-container'>
              <div className='color-field'>
                left color
                <input max='6' type='text' className='frame-color-input' name='right-in-left-frame' value={rightInColor['right-in-left-frame']} onChange={(e) => handleColors(e, 'rightIn')}/>
              </div>
              <div className='color-field'>
                right color
                <input max='6' type='text' className='frame-color-input' name='right-in-right-frame' value={rightInColor['right-in-right-frame']} onChange={(e) => handleColors(e, 'rightIn')}/>
              </div>
              <div className='color-field'>
                top color
                <input max='6' type='text' className='frame-color-input' name='right-in-top-frame' value={rightInColor['right-in-top-frame']} onChange={(e) => handleColors(e, 'rightIn')}/>
              </div>
              <div className='color-field'>
                bottom color
                <input max='6' type='text' className='frame-color-input' name='right-in-bottom-frame' value={rightInColor['right-in-bottom-frame']} onChange={(e) => handleColors(e, 'rightIn')}/>
              </div>
            </div>

            <hr className='color-frame-hr'/>
            <div><input type='checkbox' checked={addFrames['left-out-frames']} name='left-out-frames' onChange={handleFrameAdd} />Left Card Outside</div>
            <div className='color-container'>
              <div className='color-field'>
                left color
                <input max='6' type='text' className='frame-color-input' name='left-out-left-frame' value={leftOutColor['left-out-left-frame']} onChange={(e) => handleColors(e, 'leftOut')}/>
              </div>
              <div className='color-field'>
                right color
                <input max='6' type='text' className='frame-color-input' name='left-out-right-frame' value={leftOutColor['left-out-right-frame']} onChange={(e) => handleColors(e, 'leftOut')}/>
              </div>
              <div className='color-field'>
                top color
                <input max='6' type='text' className='frame-color-input' name='left-out-top-frame' value={leftOutColor['left-out-top-frame']} onChange={(e) => handleColors(e, 'leftOut')}/>
              </div>
              <div className='color-field'>
                bottom color
                <input max='6' type='text' className='frame-color-input' name='left-out-bottom-frame' value={leftOutColor['left-out-bottom-frame']} onChange={(e) => handleColors(e, 'leftOut')}/>
              </div>
            </div>

            <hr className='color-frame-hr'/>
            <div><input type='checkbox' checked={addFrames['right-out-frames']} name='right-out-frames' onChange={handleFrameAdd} />Right Card Outside</div>
            <div className='color-container'>
              <div className='color-field'>
                left color
                <input max='6' type='text' className='frame-color-input' name='right-out-left-frame' value={rightOutColor['right-out-left-frame']} onChange={(e) => handleColors(e, 'rightOut')}/>
              </div>
              <div className='color-field'>
                right color
                <input max='6' type='text' className='frame-color-input' name='right-out-right-frame' value={rightOutColor['right-out-right-frame']} onChange={(e) => handleColors(e, 'rightOut')}/>
              </div>
              <div className='color-field'>
                top color
                <input max='6' type='text' className='frame-color-input' name='right-out-top-frame' value={rightOutColor['right-out-top-frame']} onChange={(e) => handleColors(e, 'rightOut')}/>
              </div>
              <div className='color-field'>
                bottom color
                <input max='6' type='text' className='frame-color-input' name='right-out-bottom-frame' value={rightOutColor['right-out-bottom-frame']} onChange={(e) => handleColors(e, 'rightOut')}/>
              </div>
            </div>

            <button onClick={handleUpdateFrame}>Update</button>
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
