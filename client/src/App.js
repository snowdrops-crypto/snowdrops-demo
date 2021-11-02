'use strict'

import React, { useEffect } from 'react'
import { useHistory, BrowserRouter, Route, Switch } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './store/actions'

import web3i from './lib/web3/web3i'

import Landing from './components/pages/Landing'

import CreateCard from './components/pages/CreateCard'
import ClaimCard from './components/pages/ClaimCard'

import Marketplace from './components/pages/Marketplace'
import MarketplaceCards from './components/pages/marketplace-pages/MarketplaceCards'
import MarketplaceItems from './components/pages/marketplace-pages/MarketplaceItems'
import Activity from './components/pages/marketplace-pages/Activity'
import MyListings from './components/pages/marketplace-pages/MyListings'
import MySales from './components/pages/marketplace-pages/MySales'
import MyPurchases from './components/pages/marketplace-pages/MyPurchases'

import ViewTokens from './components/pages/ViewTokens'
import ViewCards from './components/pages/ViewCards'
import ViewCard from './components/pages/ViewCard'
import ViewItems from './components/pages/ViewItems'
import ViewItem from './components/pages/ViewItem'

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

          <Route path='/create-card'><CreateCard /></Route>
          <Route path='/claim-card/:addr' children={<ClaimCard />} />

          <Route path='/marketplace'><Marketplace /></Route>
          <Route path='/marketplace-cards'><MarketplaceCards /></Route>
          <Route path='/marketplace-items'><MarketplaceItems /></Route>
          <Route path='/activity'><Activity /></Route>
          <Route path='/my-listings'><MyListings /></Route>
          <Route path='/my-sales'><MySales /></Route>
          <Route path='/my-purchases'><MyPurchases /></Route>
          
          <Route path='/view-tokens' children={<ViewTokens />} />
          <Route path='/view-cards' children={<ViewCards />} />
          <Route path='/view-items' children={<ViewItems />} />
          
          <Route path='/view-card/:addr' children={<ViewCard />} />
          <Route path='/view-item/:addr' children={<ViewItem />} />
          
          <Route path='/settings'><Settings /></Route>
          <Route path='/wiki'><Wiki /></Route>

          <Route exact path='*'><NotFound /></Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
