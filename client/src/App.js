'use strict'

import React, { useEffect } from 'react'
import { useHistory, BrowserRouter, Route, Switch } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './store/actions'

import Landing from './components/pages/Landing'
import CreateNFT from './components/pages/CreateNFT'
import Marketplace from './components/pages/Marketplace'
import Settings from './components/pages/Settings'
import ViewItems from './components/pages/ViewItems'
import ViewNFTs from './components/pages/ViewNFTs'

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
            <Landing />
          </Route>
          <Route path='/create-card'>
            <CreateNFT />
          </Route>
          <Route path='/marketplace'>
            <Marketplace />
          </Route>
          <Route path='/view-owned-cards'>
            <ViewNFTs />
          </Route>
          <Route path='/view-owned-items'>
            <ViewItems />
          </Route>
          <Route path='/settings'>
            <Settings />
          </Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
