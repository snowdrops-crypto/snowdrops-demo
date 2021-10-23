import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import '../../scss/landing.scss'

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
      <div>
        <div className='marketplace-title'>Marketplace</div>
        <div>
          <button>NFT Market</button>
          <button>Items Market</button>
          <button>Activity</button>
          <button>My Listings</button>
          <button>My Sales</button>
          <button>My Purchases</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Marketplace
