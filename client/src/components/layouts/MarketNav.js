'use strict'
import React from 'react'
import { Link } from 'react-router-dom'

import '../../scss/market-nav.scss'

const MarketNav = () => {
  return (
    <div id='market-nav'>
      <Link className='market-nav-link' to='/marketplace-nft'>Card Marketplace</Link>
      <Link className='market-nav-link' to='/marketplace-item'>Item Marketplace</Link>
      <Link className='market-nav-link' to='/activity'>Activity</Link>
      <Link className='market-nav-link' to='/view-owned-tokens'>My Tokens</Link>
      <Link className='market-nav-link' to='/create-card'>Create Greeting</Link>
      <Link className='market-nav-link' to='/wiki'>Wiki</Link>
    </div>
  )
}

export default MarketNav
