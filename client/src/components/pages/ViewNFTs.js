import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

const ViewOwnedNFTs = () => {
  return (
    <div>
      <div>View Owned NFTs</div>
    </div>
  )
}

export default ViewOwnedNFTs