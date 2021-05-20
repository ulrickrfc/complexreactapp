import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8080'
//Componentes

import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSlinglePost'
import FlashMessages from './components/FlashMessages'

import StateContext from './StateContext'
import DispatchContext from './DispatchContext'

function Main() {

  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: []
  }
  function ourReducer(state, action) {
    switch (action.type) {
      case "login":
        return { loggedIn: true, flashMessages: state.flashMessages }

      case "logout":
        return { loggedIn: false, flashMessages: state.flashMessages }

      case "flashMessage":
        return { loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value) }
    }
  }

  const [state, dispatch] = useReducer(ourReducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>

        <BrowserRouter>
          <Header />
          <FlashMessages messages={state.flashMessages} />
          <Switch>

            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>

            <Route path="/about">
              <About />
            </Route>

            <Route path="/terms" exact>
              <Terms />
            </Route>

            <Route path="/create-post">
              <CreatePost />
            </Route>

            <Route path="/post/:id">
              <ViewSinglePost />
            </Route>

          </Switch>
          <Footer />

        </ BrowserRouter>

      </DispatchContext.Provider>
    </StateContext.Provider>


  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}