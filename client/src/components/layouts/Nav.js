'use strict'
import React from 'react'
import { Link } from 'react-router-dom'

import '../../scss/nav.scss'

const Nav = () => {
  return (
    <div id='nav'>
      <Link className='nav-link' to='/landing'>Landing</Link>
      <Link className='nav-link' to='/marketplace'>Marketplace</Link>
      <Link className='nav-link' to='/claim-card/123'>Claim a Card</Link>
      <Link className='nav-link' to='/view-tokens'>My Tokens</Link>
      <Link className='nav-link' to='/create-card'>Create Greeting</Link>
      <Link className='nav-link' to='/wiki'>Wiki</Link>
    </div>
  )
}

export default Nav
