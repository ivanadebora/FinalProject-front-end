import React, { Component } from 'react';
import './App.css';
import HeaderTID from './components/HeaderTID';
import Homepage from './components/Homepage';
import FooterTID from './components/FooterTID';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderTID/>
        <div>
          <Homepage/>
        </div>
        <FooterTID/>
      </div>
    );
  }
}

export default App;
