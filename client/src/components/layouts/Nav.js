import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
      <Link to='/landing'>Landing</Link>
      <Link to='/marketplace-nft'>Greeting Card Market</Link>
      <Link to='/marketplace-item'>Item Market</Link>
      <Link to='/claim'>Claim</Link>
      <Link to='/view-owned-tokens'>My Tokens</Link>
      <Link to='/create-card'>Create Greeting</Link>
      <Link to='/wiki'>Wiki</Link>
    </div>
  )
}

export default Nav