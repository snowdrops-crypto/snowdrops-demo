'use strict'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import '../../scss/claim-card.scss'

const ClaimCard = () => {
  let { addr } = useParams()
  console.log('claim card')
  return (
    <div id='claim-card-page'>
      <Header />
      <div>ClaimCard</div>
      <Footer />
    </div>
  )
}

export default ClaimCard
