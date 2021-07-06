import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import  dateContext  from './context.js';
import './App.css';
import SideBar from './components/sideBar';
import Dashboard from './components/dashboard';
import Budget from './components/budgets/budget';

// import User from './components/user/user';
const App = function() {

const [month,setMonth]=useState(new Date().getMonth()+1);
const [year,setYear]=useState(new Date().getFullYear());
  return (
    <>
      <Router>

        <Switch>
        <dateContext.Provider value={{month,setMonth,year,setYear}}>
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
            <Budget />
          </Route>
          <Route path="/transactions">
            <SideBar />
            <Dashboard />
          </Route>
          </dateContext.Provider>
        </Switch>

      </Router>
    </>
  )

}

export default App;
