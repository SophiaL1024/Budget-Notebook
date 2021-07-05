import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { context } from './context';
import './App.css';
import SideBar from './components/sideBar';
import Dashboard from './components/dashboard';
import Balance from './components/balance/balance';
import User from './components/user/user';
const App = function() {


  return (
    <>
      <Router>

        <Switch>
          <Route path="/dashboards">
            <SideBar />
            <Dashboard />
          </Route>
          <Route path="/categories">
            <SideBar />
            <Dashboard />
          </Route>
          <Route path="/budgets">
            <SideBar />
            <Dashboard />
          </Route>
          <Route path="/transactions">
            <SideBar />
            <Dashboard />
          </Route>
          <Route path="/balances">
            <SideBar />
            <Dashboard />
          </Route>
          <Route path="/users">
            <SideBar />
            <User />
          </Route>
        </Switch>

      </Router>
    </>
  )

}

export default App;
