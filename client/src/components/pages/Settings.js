'use strict'
import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

/*
  Pass in 
*/

const Settings = () => {
  return (
    <>
      <Header />
      <div>Settings</div>
      <Footer />
    </>
  )
}

export default Settings
