import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from './actions';
import HeaderTID from './components/HeaderTID';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import Verified from './components/Verified';
import WaitingVerification from './components/WaitingVerification';
import AdminProductHome from './components/AdminProductHome';
import AdminProductFlightManage from './components/AdminProductFlightManage';
import AdminProductFlightManageMaskapai from './components/AdminProductFlightManageMaskapai';
import ProductFlightHome from './components/ProductFlightHome';
import ProductFlightList from './components/ProductFlightList';
import ProductFlightDetail from './components/ProductFlightDetail';
import ProductFlighAddToCart from './components/ProductFlighAddToCart';
import ProductFlightCart from './components/ProductFlightCart';
import ProductFlightCartDetail from './components/ProductFlightCartDetail';
import ProductFlightHistory from './components/ProductFlightHistory';
import ProductFlightTicket from './components/ProductFlightTicket';
import AdminPaymentFlightManage from './components/AdminPaymentFlightManage';
import ProductFLightListNF from './components/ProductFlightListNF';
import AdminPaymentHome from './components/AdminPaymentHome';





const cookie = new Cookies();

class App extends Component {

  componentDidMount() {
    const username = cookie.get('dataUser');
    const role = cookie.get('dataRole')
    if (username !== undefined && role !== undefined) {
        this.props.keepLogin(username);
    }
    else {
      this.props.cookieChecked();
    }
  }

  render() {
    if(this.props.cookie === true) {
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

            <Route path="/flighthome" component={ProductFlightHome} />
            <Route path="/flightlist" component={ProductFlightList} />
            <Route path="/flightlistnotfound" component={ProductFLightListNF} />
            <Route path="/flightdetail" component={ProductFlightDetail} />
            <Route path="/flightdetailpesanan" component={ProductFlighAddToCart} />
            <Route path="/flightcart" component={ProductFlightCart} />
            <Route path="/flightcartdetail" component={ProductFlightCartDetail} />
            <Route path="/flighthistory" component={ProductFlightHistory} />
            <Route path="/flight_ticket" component={ProductFlightTicket} />

            <Route path="/adminpaymenthome" component ={AdminPaymentHome} />
            <Route path="/manageflightpayment" component={AdminPaymentFlightManage} />
          </div>
        </div>
      );
    }
      return (<h1>Loading...</h1>)
  }
}

const mapStateToProps = (state) => {
  return {
    cookie: state.auth.cookie
  }
}

export default withRouter(connect(mapStateToProps,{keepLogin, cookieChecked})(App));

