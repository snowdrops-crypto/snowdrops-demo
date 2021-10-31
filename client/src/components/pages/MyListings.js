import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import MarketNav from '../layouts/MarketNav'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import '../../scss/marketplace.scss'
import '../../scss/my-listings.scss'

const MyListings = () => {
  useEffect(() => {

  }, [])

  return (
    <div id='marketplace-page'>
      <Header />
      <div className='marketplace-title'>Marketplace</div>
      <div id='markplace-content'>
        <MarketNav />
      </div>
      <Footer />
    </div>
  )
}

export default MyListings
