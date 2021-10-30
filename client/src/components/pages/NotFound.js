import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import '../../scss/not-found.scss'

const NotFound = () => {

  return (
    <div id='not-found-page'>
      <Header />
      404
      <Footer />
    </div>
  )
}

export default NotFound
