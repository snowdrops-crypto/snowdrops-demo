'use strict'
import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import '../../scss/create-card.scss'

const CreateCard = () => {
  const [message, setMessage] = useState('')
  const items = [{name: 'house'}, {name: 'car'}]
  // const listItems = items.map(item, key => <li key={key}>item.name</li>) 
  const handleMessaage = e => {
    setMessage(e.target.value)
  }
  return (
    <div id='create-card-page'>
      <Header />
      <div className='create-card-title'>Message</div>
      <textarea value={message} className='enable-input' onChange={(e) => handleMessaage(e)} />
      <div className='create-card-sub-title'>List of available Items</div>
      {/* <ul>{listItems}</ul> */}
      <Footer />
    </div>
  )
}

export default CreateCard
