'use strict'

import React, { useEffect } from 'react'
import { useHistory, BrowserRouter, Route, Switch } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './store/actions'

import Home from './components/pages/Home'

// css
import './scss/styles.scss'

const App = () => {
  const history = useHistory()
  const rstate = useSelector((rstate) => rstate)
  const dispatch = useDispatch()
  const { appState } = bindActionCreators(actions, dispatch)

  useEffect(() => {
    appState({...rstate.main, status: 'landing'})
    console.log('hi')
    return () => {
    }
  }, []) //empty array causes this effect to only run on mount

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/landing'>

          </Route>
          <Route path='/mint-card'>

          </Route>
          <Route path='/view-owned'>

          </Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
