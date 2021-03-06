'use strict'
import React, { useEffect, useState, useCallback } from 'react'
import arweaveImageLinks from '../../assets/arweave-img-links'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import DefaultCardInfo from '../../lib/DefaultCardInfo'
import { cardIterator } from '../../lib/utils'
import '../../scss/create-card.scss'

const CreateCard = () => {
  const rstate = useSelector((rstate) => rstate)
  const dispatch = useDispatch()
  const { appState } = bindActionCreators(actions, dispatch)
  const dev = true

  const [frameControlVisibility, setFrameControlVisibility] = useState({
    'left-in': DefaultCardInfo.left.in.framesActive,
    'right-in': DefaultCardInfo.right.in.framesActive,
    'left-out': DefaultCardInfo.left.out.framesActive,
    'right-out': DefaultCardInfo.right.out.framesActive
  })

  const [message, setMessage] = useState('')
  const [messageScale, setMessageScale] = useState(0.35)
  const [leftInColor, setLeftInColor] = useState({
    'left-in-left-frame': DefaultCardInfo.left.in.frames.left.color,
    'left-in-right-frame': DefaultCardInfo.left.in.frames.right.color,
    'left-in-top-frame': DefaultCardInfo.left.in.frames.top.color, 
    'left-in-bottom-frame': DefaultCardInfo.left.in.frames.bottom.color
  })
  const [rightInColor, setRightInColor] = useState({
    'right-in-left-frame': DefaultCardInfo.right.in.frames.left.color,
    'right-in-right-frame': DefaultCardInfo.right.in.frames.right.color,
    'right-in-top-frame': DefaultCardInfo.right.in.frames.top.color,
    'right-in-bottom-frame': DefaultCardInfo.right.in.frames.bottom.color
  })
  const [leftOutColor, setLeftOutColor] = useState({
    'left-out-left-frame': DefaultCardInfo.left.out.frames.left.color,
    'left-out-right-frame': DefaultCardInfo.left.out.frames.right.color, 
    'left-out-top-frame': DefaultCardInfo.left.out.frames.top.color,
    'left-out-bottom-frame': DefaultCardInfo.left.out.frames.bottom.color
  })
  const [rightOutColor, setRightOutColor] = useState({
    'right-out-left-frame': DefaultCardInfo.right.out.frames.left.color,
    'right-out-right-frame': DefaultCardInfo.right.out.frames.right.color,
    'right-out-top-frame': DefaultCardInfo.right.out.frames.top.color,
    'right-out-bottom-frame': DefaultCardInfo.right.out.frames.bottom.color
  })
  const [addFrames, setAddFrames] = useState({
    'left-in-frames': DefaultCardInfo.left.in.framesActive,
    'right-in-frames': DefaultCardInfo.right.in.framesActive,
    'left-out-frames': DefaultCardInfo.left.out.framesActive,
    'right-out-frames': DefaultCardInfo.right.out.framesActive
  })
  const [selectAsset, setSelectAsset] = useState('')
  const [prevSelectAsset, setPrevSelectAsset] = useState('')
  const [assetCardSideSelect, setAssetCardSideSelect] = useState('')

  useEffect(() => {
    setMessage('Lorem Ipsum Upsum Heapson')
    appState({...rstate.main, status: 'create-card'})
    const evt = new Event('update-three-redux')
    document.body.dispatchEvent(evt)
  }, [])
  

  const handleFrameControlVisibility = e => {
    const name = e.target.name
    console.log(name)
    setFrameControlVisibility(prevState => ({...prevState, [name]: frameControlVisibility[name] ? false : true}))
    console.log(frameControlVisibility)
  }

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
      console.log(e.target)
      setSelectAsset(e.target.name)
      setPrevSelectAsset(e.target)
      e.target.className === '' ? e.target.className = 'selected-img' : e.target.className = ''
    } else {
      console.log(prevSelectAsset.className)
      if (e.target.name === selectAsset) {
        e.target.className = ''
        setSelectAsset('')
      } else {
        setSelectAsset(e.target.name)
      
        e.target.className === '' ? e.target.className = 'selected-img' : e.target.className = ''
        prevSelectAsset === '' ? prevSelectAsset.className = 'selected-img' : prevSelectAsset.className = ''
        setPrevSelectAsset(e.target)
      }
    }
  }

  const handleFileUpload = async e => {
    console.log(e.target.files[0])
    const fileReader = new FileReader()
    
    fileReader.onload = e => {
      console.log(e.target.result)
      console.log(JSON.parse(e.target.result))
    }
    await fileReader.readAsText(e.target.files[0], 'utf-8')
  }

  const assetRow = () => {
    const imgTags = []
    const rows = []
    const dim = '80px'
    let assetRowCount = 0

    Object.keys(arweaveImageLinks).forEach(imgName => {
      imgTags.push(<img key={`asset-${imgName}`} name={`${imgName}`} onClick={handleSelectImage} src={arweaveImageLinks[imgName]} width={dim} height={dim} />)
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
            <div>
              <input type='checkbox' checked={addFrames['left-in-frames']} name='left-in-frames' onChange={handleFrameAdd} />
              Left Card Inside
              <button onClick={handleFrameControlVisibility} name='left-in' style={{float: 'right'}}>V</button>
            </div>
            {frameControlVisibility['left-in'] ? 
              <div className='color-container' id='color-container-left-in'>
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
              </div> : '' }

            <hr className='color-frame-hr'/>
            <div>
              <input type='checkbox' checked={addFrames['right-in-frames']} name='right-in-frames' onChange={handleFrameAdd} />
              Right Card Inside
              <button onClick={handleFrameControlVisibility} name='right-in' style={{float: 'right'}}>V</button>
            </div>
            {frameControlVisibility['right-in'] ?
              <div className='color-container' id='color-container-right-in'>
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
              </div> : '' }

            <hr className='color-frame-hr'/>
            <div>
              <input type='checkbox' checked={addFrames['left-out-frames']} name='left-out-frames' onChange={handleFrameAdd} />
              Left Card Outside
              <button onClick={handleFrameControlVisibility} name='left-out' style={{float: 'right'}}>V</button>
            </div>
            {frameControlVisibility['left-out'] ?
              <div className='color-container' id='color-container-left-out'>
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
              </div> : '' }

            <hr className='color-frame-hr'/>
            <div>
              <input type='checkbox' checked={addFrames['right-out-frames']} name='right-out-frames' onChange={handleFrameAdd} />
              Right Card Outside
              <button onClick={handleFrameControlVisibility} name='right-out' style={{float: 'right'}}>V</button>
            </div>
            {frameControlVisibility['right-out'] ?
              <div className='color-container' id='color-container-right-out'>
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
              </div> : '' }

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
          <div id='upload-card-info'>
            <input onChange={handleFileUpload} type='file' name='uploaded-card-info' accept='.json' required />
          </div>
        </div>
        {dev ?
          <div id='three-control-buttons'>
            <button className='enable-input three-control-button' onClick={() => document.body.dispatchEvent(new Event('toggle-animation'))}>toggle animation</button>
          </div> : '' }
        <div id='item-controls' className='enable-input'>
          <div>scale <input type='number' min='0.1' max='3' step='0.1' /> <button onClick={()=>{}}>update scale</button></div>
          <div>rotate <input type='number' min='0' max='360' step='5' /><button onClick={()=>{}}>update rotation</button></div>
          <div className='item-control'>
            <button name='item-controls-done-button' onClick={() =>{}}>done</button>
            <button name='item-controls-delete-button' onClick={()=> {}}>delete</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CreateCard
