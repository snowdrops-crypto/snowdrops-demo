'use strict'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import snowdrops_logo from '../../assets/snowdrops-logo-1.png'
import '../../scss/header.scss'
import Nav from './Nav'

const Header = () => {
  const rstate = useSelector((rstate) => rstate)

  useEffect(async () => {
  }, [])

  const handleButton = () => {
    if (rstate.main.connected === true) {
      console.log('connected')
    } else {
      console.log('disconnected')
    }
  }

  return (
    <div id='header-container'>
      <div id='header-items-container'>
        <div className='header-items-left'>
          <img id='header-logo' src={snowdrops_logo} />
          <div id='header-title'>Snowdrops</div>
        </div>
        <Nav />
        <div className='header-items-right'>
          <button onClick={handleButton} id='header-wallet'>Connect Wallet</button>
        </div>
      </div>

    </div>
  )
}

export default Header
