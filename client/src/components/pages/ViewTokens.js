'use strict'
import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import '../../scss/view-tokens.scss'

const ViewTokens = () => {
  const rstate = useSelector((rstate) => rstate)
  let { addr } = useParams()
  return (
    <div id='view-tokens-page'>
      <Header />
      <div>View Owned Cards</div>
      <div>Your Address: {addr}</div>
      <Footer />
    </div>
  )
}

export default ViewTokens
