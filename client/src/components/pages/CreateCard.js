'use strict'
import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import '../../scss/create-card.scss'

const items = [{name: 'house'}, {name: 'car'}]

const listItems = items.map(item => { <li>item.name</li> }) 

const CreateCard = () => {
  return (
    <div id='create-card-page'>
      <Header />
      <div className='create-nft-option-title'>Message</div>
      <textarea onChange={(e) => handleMessage} />
      <div className='create-nft-option-title'>List of available Items</div>
      <ul>{listItems}</ul>
      <Footer />
    </div>
  )
}

export default CreateCard
