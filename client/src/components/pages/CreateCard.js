'use strict'
import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import snowdropsLogoRedBgWhite1024 from '../../assets/snowdrops-logo-1024-bg-white.png'
import '../../scss/create-card.scss'

const CreateCard = () => {
  const [message, setMessage] = useState('')
  
  const handleMessaage = e => {
    setMessage(e.target.value)
  }

  const handleUpdateMessage = () => {
    console.log('handle update message')
  }

  const assetRows = () => {
    const assetRow = () => {
      const rows = []
      for(let i = 0; i < 60; i++) {
        rows.push(
          <div className='asset-row'>
            <img src={snowdropsLogoRedBgWhite1024} width='80px' height='80px' />
            <img src={snowdropsLogoRedBgWhite1024} width='80px' height='80px' />
            <img src={snowdropsLogoRedBgWhite1024} width='80px' height='80px' />
          </div>
        )
      }
      return rows
    }
    return (
      <div id='create-card-assets' className='enable-input'>
        {assetRow()}
      </div>
    )
  }
  return (
    <div id='create-card-page'>
      <Header />
      <div id='page-title'>Create a Card</div>
      <div id='create-card-content' className='enable-input'>
        <div className='create-card-title'>Message</div>
        <textarea value={message} className='enable-input' onChange={(e) => handleMessaage(e)} />
        <button onClick={handleUpdateMessage}>Update Message</button>
        <div className='create-card-sub-title'>List of available Items</div>
        {assetRows()}
      </div>
      <Footer />
    </div>
  )
}

export default CreateCard
