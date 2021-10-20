'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { store } from './store/store'
import { createBrowserHistory } from 'history';

import App from './App'
import InitScene from './lib/three/initScene.js'

ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

document.addEventListener('DOMContentLoaded', () => {
  const initScene = new InitScene()
  initScene.init()
})
