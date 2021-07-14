import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import dateContext from './context.js';
import './App.css';
import SideBar from './components/sideBar';
import Dashboard from './components/dashboard';
import Budget from './components/budgets/budget';
import User from './components/user/user';
import Transactions from './components/transactions/Transactions.jsx';

const App = function () {

  const cookie = document.cookie ? document.cookie.split(';').find(e => e.includes('userId=')).slice(7) : '';

  const [userId, setUserId] = useState(document.cookie ? Number(cookie) : '');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());


  return (
    <>
      <Router>
        <dateContext.Provider value={{ month, setMonth, year, setYear, userId, setUserId }}>
          {/* <Link to='/'></Link> */}
          {!userId && <User />}
          {userId &&
            <Switch>
              {/* <Route path="/">
            <User />
          </Route> */}
              <Route path="/dashboards">
                <SideBar />
                <Dashboard />
              </Route>
              <Route path="/budgets">
                <SideBar />
                <Budget />
              </Route>
              <Route path="/transactions">
                <SideBar />
                <Transactions />
              </Route>
            </Switch>
          }
        </dateContext.Provider>

      </Router>
    </>
  )

}

export default App;
