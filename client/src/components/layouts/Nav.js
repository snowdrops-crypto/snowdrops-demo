'use strict'
import React from 'react'
import { Link } from 'react-router-dom'

import '../../scss/nav.scss'

const Nav = () => {
  return (
    <div id='nav'>
      <div id='nav-link-container'>
        <Link className='nav-link' to='/'>
          <div className='nav-link-text'>Home</div>
        </Link>
        <Link className='nav-link' to='/marketplace'>
          <div className='nav-link-text'>Marketplace</div>
        </Link>
        <Link className='nav-link' to='/claim-card/123'>
          <div className='nav-link-text'>Claim a Card</div>
        </Link>
        <Link className='nav-link' to='/view-tokens'>
          <div className='nav-link-text'>My Tokens</div>
        </Link>
        <Link className='nav-link' to='/create-card'>
          <div className='nav-link-text'>Create Greeting</div>
        </Link>
        <Link className='nav-link' to='/wiki'>
          <div className='nav-link-text'>Wiki</div>
        </Link>
      </div>
    </div>
  )
}

export default Nav
