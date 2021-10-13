'use strict'

export const status = (val) => {
  return (dispatch) => {
    dispatch({
      type: 'status',
      payload: val
    })
  }
}

export const appState = (state) => {
  return (dispatch) => {
    dispatch({
      type: 'main',
      payload: state
    })
  }
} 
