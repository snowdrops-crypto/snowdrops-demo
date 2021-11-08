import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import '../../scss/landing.scss'

const Landing = () => {
  useEffect(() => {

  }, [])

  const handleScroll = (e) => {
    e.preventDefault()
    console.log('scrolling')
    let element = e.target
    if (e.scrollHeight - element.scrollTop === element.clientHeight) {
      console.log('end of scroll')
    }
  }

  const handleButtonThreeTest = () => {
    const evt = new Event('three-test')
    document.body.dispatchEvent(evt)
  }

  const handleButtonStartAnimation = () => {
    const evt = new Event('start-animation')
    document.body.dispatchEvent(evt)
  }

  const handleButtonStopAnimation = () => {
    const evt = new Event('pause-animation')
    document.body.dispatchEvent(evt)
  }

  return (
    <div id='landing-page' onScroll={(e) => handleScroll(e)}>
      <Header />
      <div id='landing-page-content'>
        <div id='landing-title-description'>
          <div className='landing-title'>Welcome to Snowdrops!</div>
          <div className='landing-description'>Snowdrops are NFT greeting cards.</div>
        </div>
        <div id='three-control-buttons'>
          <button className='enable-input three-control-button' onClick={() => handleButtonThreeTest()}>three test</button>
          <button className='enable-input three-control-button' onClick={() => handleButtonStartAnimation()}>start animation</button>
          <button className='enable-input three-control-button' onClick={() => handleButtonStopAnimation()}>stop animation</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Landing
