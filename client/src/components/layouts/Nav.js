'use strict'

import React from 'react'
import { Link } from 'react-router-dom'

import '../../scss/nav.scss'

const Nav = () => {
  return (
    <div id='nav'>
      <Link className='nav-link' to='/landing'>Landing</Link>
      <Link className='nav-link' to='/marketplace-nft'>Greeting Card Market</Link>
      <Link className='nav-link' to='/marketplace-item'>Item Market</Link>
      <Link className='nav-link' to='/claim'>Claim</Link>
      <Link className='nav-link' to='/view-owned-tokens'>My Tokens</Link>
      <Link className='nav-link' to='/create-card'>Create Greeting</Link>
      <Link className='nav-link' to='/wiki'>Wiki</Link>
    </div>
  )
}

export default Nav