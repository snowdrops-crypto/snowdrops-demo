'use strict'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import '../../scss/claim-card.scss'

const ClaimCard = () => {
  let { addr } = useParams()

  const validate_card_exists = async () => {
    await ethers.getContractAt('ItemsFacet', 'addr')
    // Search for token address using ethers
    // If the token is found then jump to token view
    // If the token is not found, display token not found
    // If the token is found but not claimable, dispay token not claimable

  }

  // enum token found {foundClaimable: 0, foundNotClaimable: 1, notFound: 2}
  const tokenView = () => {
    switch(tokenFound) {
      case 0:
        <div>
          Token View
        </div>
      break;
      case 1:
        <div>
          Token View
        </div>
      break;
      case 2:
        <div>
          Token View
        </div>
      break;
      default:
    }
    <div>
      Token View
    </div>
  }

  const tokenFoundNotClaimable = () => {
    <div>
      Token has been found but is not claimable
    </div>
  }

  const handleClaimButton = () => {
    console.log('claim button clicked')
  }
  
  const [inputTxt, setInputTxt] = useState('')
  const onChange = (e) => { setInputTxt(e.target.value); console.log(e.target.value)}
  console.log('claim card')
  return (
    <div id='claim-card-page'>
      <Header />
      <div id='main-content'>
        <div id='page-title'>Claim a Card</div>
        <div>
          <input value={inputTxt} className='input-code' placeholder='address' onChange={e => onChange(e)}/>
          <button onClick={handleClaimButton}>Claim</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ClaimCard
