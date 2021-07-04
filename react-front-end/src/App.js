import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SideBar from './components/sideBar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    axios.get('/dashboards/1') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) 
      this.setState({
        message: response.data.annualExpenseSum
      });
    }) 
  }

  render() {
    return (
      <>
      <SideBar className="side-bar"/>
      <div className="App">
        <h1>{ this.state.message }</h1>
        <button onClick={this.fetchData} >
          Fetch Data
        </button>        
      </div>
      </>
    );
  }
}

export default App;
