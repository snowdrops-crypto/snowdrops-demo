'use strict'

import React, { useEffect } from 'react'
import { useHistory, BrowserRouter, Route, Switch } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './store/actions'

// css
import './scss/styles.scss'

const App = () => {
  const history = useHistory()
  const rstate = useSelector((rstate) => rstate)
  const dispatch = useDispatch()
  const { appState } = bindActionCreators(actions, dispatch)

  useEffect(() => {
    appState({...rstate.main, status: 'landing'})
    return () => {
    }
  }, []) //empty array causes this effect to only run on mount

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <div>Welcome to Snowdrops!</div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
