'use strict'
import React from 'react'
import { Link } from 'react-router-dom'

import '../../scss/market-nav.scss'

const MarketNav = () => {
  return (
    <div id='market-nav'>
      <div id='market-nav-link-container'>
        <Link className='market-nav-link' to='/marketplace-cards'>Card Marketplace</Link>
        <Link className='market-nav-link' to='/marketplace-items'>Item Marketplace</Link>
        <Link className='market-nav-link' to='/activity'>Activity</Link>
        <Link className='market-nav-link' to='/my-listings'>My Listings</Link>
        <Link className='market-nav-link' to='/my-sales'>My Sales</Link>
        <Link className='market-nav-link' to='/my-purchases'>My Purchases</Link>
      </div>
    </div>
  )
}

export default MarketNav
