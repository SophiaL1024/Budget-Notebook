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
import Transactions from './components/transactions/Transactions.jsx';
// import Budget from './components/budget';
// import Balance from './components/balance/balance';
// import User from './components/user/user';
const App = function() {

const [month,setMonth]=useState(new Date().getMonth()+1);
const [year,setYear]=useState(new Date().getFullYear())
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
            {/* <Budget /> */}
          </Route>
          <Route path="/transactions">
            <SideBar />
            <Transactions/>
          </Route>
          <Route path="/balances">
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
