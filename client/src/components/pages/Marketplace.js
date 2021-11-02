import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import MarketNav from '../layouts/MarketNav'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import '../../scss/marketplace.scss'

const Marketplace = () => {
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
    <div id='marketplace-page' onScroll={(e) => handleScroll(e)}>
      <Header />
      <div className='marketplace-title'>Marketplace</div>
      <div id='markplace-content'>
        <MarketNav />
        <div id='marketplace-inner'>
          hi
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Marketplace
