import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import HeaderTID from './components/HeaderTID';
import Homepage from './components/Homepage';
import FooterTID from './components/FooterTID';
import Register from './components/Register';
import Login from './components/Login';


class App extends Component {
  render() {
    return (
      <div>
        <HeaderTID/>
        <div>
          <Route exact path="/" component={Homepage}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
        </div>
        <FooterTID/>
      </div>
    );
  }
}

export default App;
