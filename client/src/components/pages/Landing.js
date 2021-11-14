import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import '../../scss/landing.scss'

const Landing = () => {
  const dev = true

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

  return (
    <div id='landing-page' onScroll={(e) => handleScroll(e)}>
      <Header />
      <div id='landing-page-content'>
        <div id='landing-title-description'>
          <div className='landing-title'>Welcome to Snowdrops!</div>
          <div className='landing-description'>Snowdrops are NFT greeting cards.</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Landing
