import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {
    TabContent, TabPane, Nav, NavItem, 
    NavLink, Card, CardTitle, CardBody, CardText,
    Row, Col
} from 'reactstrap';
import AdminPaymentFlightSideBarMenu from './AdminPaymentFlightSideBarMenu';


const cookie = new Cookies()
class AdminPaymentHome extends Component {

    state = {
      acceptedTrans:{}, deniedTrans:{}, onWaitingConf:{}, allTransCount: {}
    }

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
      }

      componentDidMount(){
        this.getAcceptedTrans();
        this.getDeniedTrans();
        this.getOnWaitingConfTrans();
        this.getAllTransCount();
      }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

      getAllTransCount = () => {
        axios.post('http://localhost:1212/admin/flight/payment/countalltrans')
        .then((res) => {
          console.log(res.data)
          this.setState({allTransCount:res.data[0].hasil})
        })
        .catch((err) => {
          console.log(err)
        })
      }

      getAcceptedTrans = () => {
        axios.post('http://localhost:1212/admin/flight/payment/countacceptedtrans')
        .then((res) => {
          console.log(res.data)
          this.setState({acceptedTrans:res.data[0].hasil})
        })
        .catch((err) => {
          console.log(err)
        })
      }

      getDeniedTrans = () => {
        axios.post('http://localhost:1212/admin/flight/payment/countdeniedtrans')
        .then((res) => {
          console.log(res.data)
          this.setState({deniedTrans:res.data[0].hasil})
        })
        .catch((err) => {
          console.log(err)
        })
      }

      getOnWaitingConfTrans = () => {
        axios.post('http://localhost:1212/admin/flight/payment/countwaitingtrans')
        .then((res) => {
          console.log(res.data)
          this.setState({onWaitingConf:res.data[0].hasil})
        })
        .catch((err) => {
          console.log(err)
        })
      }

    render(){
      var newRole = cookie.get('dataRole')
      if (newRole === 'AdminPembayaran') {
        return(
          <div id="hero" className="wow fadeIn">
              <div className="container-fluid">
              <div className="tab-admin">
      <Nav tabs >
        <NavItem>
          <NavLink
            className={({ active: this.state.activeTab === '1' })}
            onClick={() => { this.toggle('1'); }}
          >
          Flight
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink
            className={({ active: this.state.activeTab === '2' })}
            onClick={() => { this.toggle('2'); }}
          >
          Hotel
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={({ active: this.state.activeTab === '3' })}
            onClick={() => { this.toggle('3'); }}
          >
          Entertaiment
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
        <Row>
            <Col lg="12">
              <Card body>
                  <div style={{ fontSize: "13px", marginTop:20}}>
                    <div className="row" style={{marginLeft:-20}}>
                        <div className="col-lg-3" >
                            <AdminPaymentFlightSideBarMenu />
                        </div>
                        <div className="col-lg-3 card shadow rounded" style={{marginLeft:-100, backgroundColor:"#26ad59"}}>
                          <div className="row">
                          <div style={{margin:30}}>
                            <h3><i className="fa fa-check-circle fa-2x" style={{color:"#fff"}}/></h3>
                          </div>
                          <div style={{marginTop:30, marginRight:5}}>
                            <h3 style={{fontSize:16, color:"#fff", fontWeight:'bold'}}>Accepted Transaction:</h3>
                            <h3 style={{fontSize:18, color:"#fff"}}>{this.state.acceptedTrans}</h3>
                            <h3 style={{fontSize:14, color:"#fff"}}> from {this.state.allTransCount} transaction</h3>
                          </div>
                          </div>
                        </div>
                        <div className="col-lg-3 card shadow rounded" style={{marginLeft:10, backgroundColor:"#a83023"}}>
                        <div className="row">
                          <div style={{margin:30}}>
                            <h3><i className="fa fa-times-circle fa-2x" style={{color:"#fff"}}/></h3>
                          </div>
                          <div>
                          <div style={{marginTop:30, marginRight:5}}>
                            <h3 style={{fontSize:16, color:"#fff", fontWeight:'bold'}}>Denied Transaction:</h3>
                            <h3 style={{fontSize:18, color:"#fff"}}>{this.state.deniedTrans}</h3>
                            <h3 style={{fontSize:14, color:"#fff"}}> from {this.state.allTransCount} transaction</h3>
                          </div>
                          </div>
                          </div>
                        </div>
                        <div className="col-lg-3 card shadow rounded" style={{marginLeft:10, backgroundColor:"#e8d122"}} >
                        <div className="row">
                        <div style={{margin:30}}>
                            <h3><i className="fa fa-hourglass-start fa-2x" style={{color:"#fff"}}/></h3>
                          </div>
                          <div>
                          <div style={{marginTop:30, marginRight:5}}>
                            <h3 style={{fontSize:16, color:"#fff", fontWeight:'bold'}}>On Waiting Confirmastion:</h3>
                            <h3 style={{fontSize:18, color:"#fff"}}>{this.state.onWaitingConf}</h3>
                            <h3 style={{fontSize:14, color:"#fff"}}> from {this.state.allTransCount} transaction</h3>
                          </div>
                         
                          </div>
                          </div>
                          </div>
                    </div>
                </div>
      
         </Card>
         </Col>
         </Row>
        </TabPane>
        {/* <TabPane tabId="2">
          <Row>
            <Col lg="12">
              <Card body>
                <CardTitle>Special Page Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col lg="12">
              <Card body>
                <CardTitle>Special Admin Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane> */}
      </TabContent>
    </div>
          </div>
          </div>
      );
      }
        return <Redirect to="/" />
      }
}

const mapStateToProps = (state) => {
  console.log(state.auth.role)
  return {
      role: state.auth.role
  };
}


export default connect(mapStateToProps)(AdminPaymentHome);