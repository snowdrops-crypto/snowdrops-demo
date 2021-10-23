'use strict'

import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'

function getModalStyle() {
  const top = 50
  const left = 50
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  paper: {
    position: 'absolute',
    width: '75%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

const IntroModal = (props) => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    handleOpen()
  }, [])

  return (
    <div className='intro-modal'>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Intro
      </Button>
      <Modal
        aria-labelledby="Hello"
        aria-describedby="hello-modal"
        style={modalStyle}
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>{props.title}</h2>
          <p>{props.message}</p>
          <p style={{fontSize: '12px', marginTop: '2%'}}>Click anywhere outside this box to close.</p>
        </div>
      </Modal>
    </div>
  )
}

export default IntroModal