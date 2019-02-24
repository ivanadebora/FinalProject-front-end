import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from './actions';
import HeaderTID from './components/HeaderTID';
import Homepage from './components/Homepage';
import FooterTID from './components/FooterTID';
import Register from './components/Register';
import Login from './components/Login';
import Verified from './components/Verified';
import WaitingVerification from './components/WaitingVerification';
import AdminProductHome from './components/AdminProductHome';
import AdminProductFlightManage from './components/AdminProductFlightManage';
import AdminProductFlightDashboard from './components/AdminProductFlightDashboard';
import AdminProductFlightManageMaskapai from './components/AdminProductFlightManageMaskapai';
import ProductFlightHome from './components/ProductFlightHome';
import ProductFlightList from './components/ProductFlightList';
import ProductFlightDetail from './components/ProductFlightDetail';
import ProductFlighAddToCart from './components/ProductFlighAddToCart';
import ProductFlightCart from './components/ProductFlightCart';
import ProductFlightCartDetail from './components/ProductFlightCartDetail';




const cookies = new Cookies();

class App extends Component {

  componentDidMount() {
    const username = cookies.get('dataUser');
    if (username !== undefined) {
        this.props.keepLogin(username);
    }
    else {
      this.props.cookieChecked();
    }
  }

  render() {
      return (
        <div>
          <HeaderTID/>
          <div>
            <Route exact path="/" component={Homepage}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/verified" component={Verified} />
            <Route path="/waitingverification" component={WaitingVerification} />

            <Route path="/adminproducthome" component={AdminProductHome} />
            <Route path="/managemaskapai" component={AdminProductFlightManageMaskapai} />
            <Route path="/manageflight" component={AdminProductFlightManage} />
            <Route path="/flightdashboard" component={AdminProductFlightDashboard} />

            <Route path="/flighthome" component={ProductFlightHome} />
            <Route path="/flightlist" component={ProductFlightList} />
            <Route path="/flightdetail" component={ProductFlightDetail} />
            <Route path="/flightdetailpesanan" component={ProductFlighAddToCart} />
            <Route path="/flightcart" component={ProductFlightCart} />
            <Route path="/flightcartdetail" component={ProductFlightCartDetail} />
          </div>
          <FooterTID/>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    cookie: state.auth.cookie
  }
}

export default withRouter(connect(mapStateToProps,{keepLogin, cookieChecked})(App));

