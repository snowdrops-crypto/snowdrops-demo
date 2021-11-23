'use strict'
import React, { useEffect, useState, useCallback } from 'react'
import Arweave from 'arweave'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import DefaultCardInfo from '../../lib/DefaultCardInfo'
import { cardIterator } from '../../lib/utils'

import snowdropsLogoRedBgWhite1024 from '../../assets/snowdrops-logo-1024-bg-white.png'
import snowdropsLogo1024 from '../../assets/snowdrops-logo-1024.png'
import basicHeart from '../../assets/basic-heart-1024.png'

import arweaveImageLinks from '../../assets/arweave-img-links'

import '../../scss/create-card.scss'
import { setSize } from 'mathjs'

const CreateCard = () => {
  const rstate = useSelector((rstate) => rstate)
  const dispatch = useDispatch()
  const { appState } = bindActionCreators(actions, dispatch)
  const dev = true

  const [message, setMessage] = useState('')
  const [messageScale, setMessageScale] = useState(0.5)
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
  const [selectAsset, setSelectAsset] = useState('')
  const [prevSelectAsset, setPrevSelectAsset] = useState('')
  const [assetCardSideSelect, setAssetCardSideSelect] = useState('')

  useEffect(() => {
    setMessage('Lorem Ipsum Upsum Heapson')
    appState({...rstate.main, status: 'create-card'})
    const evt = new Event('update-three-redux')
    document.body.dispatchEvent(evt)
  }, [])
  
  const handleUpdateMessage = () => {
    const evt = new CustomEvent('handle-card-message', {detail: {msg: message, scale: messageScale}})
    document.body.dispatchEvent(evt)
  }
  const handleUpdateFrame = () => {
    const cardInfo = {
      left: {in: {framesActive: true, frames: {
        left: {name: '', color: ''},
        right: {name: '', color: ''},
        top: {name: '', color: ''},
        bottom: {name: '', color: ''},
      }}, out: {framesActive: true, frames: {
        left: {name: '', color: ''},
        right: {name: '', color: ''},
        top: {name: '', color: ''},
        bottom: {name: '', color: ''},
      }}},
      right: {in: {framesActive: true, frames: {
        left: {name: '', color: ''},
        right: {name: '', color: ''},
        top: {name: '', color: ''},
        bottom: {name: '', color: ''},
      }}, out: {framesActive: true, frames: {
        left: {name: '', color: ''},
        right: {name: '', color: ''},
        top: {name: '', color: ''},
        bottom: {name: '', color: ''},
      }}}
    }

    cardIterator((card, side) => {
      console.log(card, side)
      Object.keys(cardInfo[card][side].frames).forEach(frame => {
        switch (`${card}${side}`) {
          case 'leftin':
            cardInfo[card][side].frames[frame].color = leftInColor[`${card}-${side}-${frame}-frame`]
            break;
          case 'rightin':
            cardInfo[card][side].frames[frame].color = rightInColor[`${card}-${side}-${frame}-frame`]
            break;
          case 'leftout':
            cardInfo[card][side].frames[frame].color = leftOutColor[`${card}-${side}-${frame}-frame`]
            break;
          case 'rightout':
            cardInfo[card][side].frames[frame].color = rightOutColor[`${card}-${side}-${frame}-frame`]
            break;
          default: console.error('[CardCard.js][HandleFrameUpdateSwitch]: Something when wrong!')
        }
      })
    })

    cardInfo.left.in.framesActive = addFrames['left-in-frames']
    cardInfo.right.in.framesActive = addFrames['right-in-frames']
    cardInfo.left.out.framesActive = addFrames['left-out-frames']
    cardInfo.right.out.framesActive = addFrames['right-out-frames']

    const evt = new CustomEvent('handle-card-frame', {detail:cardInfo})
    document.body.dispatchEvent(evt)
  }

  const handleMessage = e => {
    setMessage(e.target.value)
  }

  const handleMessageScale = e => {
    setMessageScale(e.target.value)
  }

  const handleFrameAdd = (e) => {
    setAddFrames(prevState => ({...prevState, [e.target.name]: e.target.checked}))
  }

  const handleColors = async (e, page) => {
    switch (page) {
      case 'leftIn':
        setLeftInColor(prevState => ({...prevState, [e.target.name]: e.target.value}))
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
      default: console.error('[CreateCard][handleColors]: Invalid card side in switch statement')
    }
  }

  const handleAssetSideSelect = e => {
    console.log(e.target.value)
    setAssetCardSideSelect(e.target.value)
  }

  const handleButtonAddAsset = () => {
    if (selectAsset === '') {
      alert('asset not selected!')
    } else if (assetCardSideSelect === '') {
      alert('Which card surface the item is placed on is not selected')
    } else {
      const evt = new CustomEvent('handle-add-asset', {detail: {assetName: selectAsset, side: assetCardSideSelect}})
      document.body.dispatchEvent(evt)
    }
  }

  const handleSelectImage = e => {
    if (selectAsset === '') {
      setSelectAsset(e.target.name)
      setPrevSelectAsset(e.target)
      e.target.className === '' ? e.target.className = 'selected-img' : e.target.className = ''
      console.log('one')
    } else {
      console.log(prevSelectAsset.className)
      setSelectAsset(e.target.name)
      
      e.target.className === '' ? e.target.className = 'selected-img' : e.target.className = ''
      
      prevSelectAsset === '' ? prevSelectAsset.className = 'selected-img' : prevSelectAsset.className = ''
      setPrevSelectAsset(e.target)
    }
  }

  const assetRow = () => {
    const imgTags = []
    const rows = []
    const dim = '80px'
    let assetRowCount = 0

    Object.keys(arweaveImageLinks).forEach(imgName => {
      imgTags.push(<img key={`asset-${imgName}`} name={`asset-${imgName}`} onClick={handleSelectImage} src={arweaveImageLinks[imgName]} width={dim} height={dim} />)
    })

    let imgTagsThree = []
    for (let i = 0; i < imgTags.length; i++) {
      
      if (i === imgTags.length - 1 || i % 3 === 0 && i !== 0) {
        if (i === imgTags.length - 1) {
          imgTagsThree.push(imgTags[i])
        }
        rows.push(
          <div key={`assetrow-${assetRowCount}`} className='asset-row'>
            {imgTagsThree}
          </div>
        )
        imgTagsThree = []
        assetRowCount++
      }
      imgTagsThree.push(imgTags[i])
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
          <textarea onChange={handleMessage} value={message} className='card-message-input enable-input' />
          Scale <input onChange={handleMessageScale} step='0.05' value={messageScale} className='card-message-scale-input' type='number' name='card-message-scale-input' />
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
            <div id='asset-card-side-select' style={{display: 'flex', justifyContent: 'space-around'}}>
              leftin<input onChange={handleAssetSideSelect} name='asset-side-select' type='radio' value='left-in' />
              rightin<input onChange={handleAssetSideSelect} name='asset-side-select' type='radio' value='right-in' />
              leftout<input onChange={handleAssetSideSelect} name='asset-side-select' type='radio' value='left-out' />
              rightout<input onChange={handleAssetSideSelect} name='asset-side-select' type='radio' value='right-out' />
            </div>
            <button onClick={handleButtonAddAsset}>Add</button>
            {assetRow()}
          </div>
        </div>
        {dev ?
          <div id='three-control-buttons'>
            <button className='enable-input three-control-button' onClick={() => document.body.dispatchEvent(new Event('toggle-animation'))}>toggle animation</button>
          </div> : ''
        }
      </div>
      <Footer />
    </div>
  )
}

export default CreateCard
