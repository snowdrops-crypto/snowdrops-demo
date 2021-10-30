'use strict'

import React, { useEffect } from 'react'
import { useHistory, BrowserRouter, Route, Switch } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './store/actions'

import web3i from './lib/web3/web3i'

import Landing from './components/pages/Landing'
import CreateCard from './components/pages/CreateCard'
import Marketplace from './components/pages/Marketplace'
import ViewTokens from './components/pages/ViewTokens'
import ViewCards from './components/pages/ViewCards'
import ViewCard from './components/pages/ViewCard'
import ViewItems from './components/pages/ViewItems'
import ViewItem from './components/pages/ViewItem'
import ClaimCard from './components/pages/ClaimCard'
import Settings from './components/pages/Settings'
import Wiki from './components/pages/Wiki'
import NotFound from './components/pages/NotFound'

const App = () => {
  const history = useHistory()
  const rstate = useSelector((rstate) => rstate)
  const dispatch = useDispatch()
  const { appState } = bindActionCreators(actions, dispatch)

  useEffect(async () => {
    await web3i()
    appState({...rstate.main, status: 'landing'})
    console.log('hi')
    return () => {
    }
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'><Landing connected={false}/></Route>
          <Route exact path='*'><NotFound /></Route>

          <Route path='/create-card'><CreateCard /></Route>
          <Route path='/marketplace'><Marketplace /></Route>
          <Route path='/claim-card/:addr' children={<ClaimCard />} />

          <Route path='/view-tokens' children={<ViewTokens />} />
          <Route path='/view-cards' children={<ViewCards />} />
          <Route path='/view-items' children={<ViewItems />} />
          
          <Route path='/view-card/:addr' children={<ViewCard />} />
          <Route path='/view-item/:addr' children={<ViewItem />} />
          
          <Route path='/settings'><Settings /></Route>
          <Route path='/wiki'><Wiki /></Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
