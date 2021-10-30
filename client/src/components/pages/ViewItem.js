'use strict'
import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

// Need to also trigger scene change with threejs
const ViewItem = () => {
  let { addr } = useParams()
  return (
    <>
      <Header />
      <div>{addr}</div>
      <Footer />
    </>
  )
}

export default ViewItem