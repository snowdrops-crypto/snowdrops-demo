'use strict'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Signup = () => {
  const rstate = useSelector((rstate) => rstate)
  const [userEmail, setUserEmail] = useState('')
  useEffect(async () => {
  }, [])

  const handleButton = () => {
    console.log('Sign up')
  }

  const handleUserEmailInput = (e) => {
    setUserEmail(e.target.value)
  }

  return (
    <div id='signup-container'>
      <input value={userEmail} onChange={(e) => handleUserEmailInput(e)} id='user-signup-email' />
      <button onClick={handleButton} id='signup-button'>Signup</button>
    </div>
  )
}

export default Signup
