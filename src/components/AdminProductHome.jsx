import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {
    TabContent, TabPane, Nav, NavItem, NavLink, Card, Row, Col
} from 'reactstrap';
import AdminProductFlightSideBarMenu from './AdminProductFlightSideBarMenu';


const cookie = new Cookies()
class AdminProductHome extends Component {

    state = {
      tiketTerjual:{}, tiketTersisa:{}, tiketWaitForConf:{},
      totalPenerbangan:{}, flightFav:[], flightNeverReserved:[]
    }

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
    }
    
    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }

    componentDidMount(){
      this.getTiketTerjual();
      this.getTiketTersisa();
      this.getTiketOnWaitingConf();
      this.getTotalFlight();
    }

    getTiketTerjual = () => {
      axios.get('http://localhost:1212/admin/flight/product/tiketterjual')
      .then((res) => {
        this.setState({tiketTerjual: res.data[0].hasil})
        console.log(res.data[0].hasil)
      })
    }

    getTiketTersisa = () => {
      axios.get('http://localhost:1212/admin/flight/product/tiketsisa')
      .then((res) => {
        this.setState({tiketTersisa: res.data[0].hasil})
      })
    }

    getTiketOnWaitingConf = () => {
      axios.get('http://localhost:1212/admin/flight/product/tiketonwaiting')
      .then((res) => {
        this.setState({tiketWaitForConf: res.data[0].hasil})
      })
    }

    getTotalFlight = () => {
      axios.get('http://localhost:1212/admin/flight/product/totalflight')
      .then((res) => {
        this.setState({totalPenerbangan: res.data[0].hasil})
      })
    }

    render(){
      var newRole = cookie.get('dataRole')
      if (newRole === 'AdminProduct') {
        var totalTiket = this.state.tiketTerjual + this.state.tiketTersisa + this.state.tiketWaitForConf;
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
              <div style={{ fontSize: "13px", marginTop:0, marginLeft:10, marginRight:10 }}>
                <div style={{ padding: "20px" }}>
                    <div className="row">
                        <div >
                            <AdminProductFlightSideBarMenu />
                        </div>
                        <div className="col-lg-4 card shadow rounded" style={{marginLeft:-900, backgroundColor:"#26ad59"}}>
                        <div className="row">
                          <div style={{margin:40}}>
                            <h3><i className="fa fa-ticket fa-2x" style={{color:"#fff"}}/></h3>
                          </div>
                          <div>
                          <div style={{marginTop:30, marginRight:5}}>
                            <h3 style={{fontSize:16, color:"#fff"}}>Total Tiket: {totalTiket}</h3>
                            <h3 style={{fontSize:16, color:"#fff"}}>Tiket Terjual: {this.state.tiketTerjual}</h3>
                            <h3 style={{fontSize:16, color:"#fff"}}>Tiket Tersisa: {this.state.tiketTersisa}</h3>
                            <h3 style={{fontSize:16, color:"#fff"}}>Tiket Menunggu Konfirmasi: {this.state.tiketWaitForConf}</h3>
                          </div>
                          </div>
                          </div>
                        </div>
                        <div className="col-lg-4 card shadow rounded" style={{marginLeft:10, backgroundColor:"#11469b"}} >
                        <div className="row">
                        <div style={{margin:40}}>
                            <h3><i className="fa fa-plane fa-2x" style={{color:"#fff"}}/></h3>
                          </div>
                          <div>
                          <div style={{marginTop:30, marginRight:5}}>
                          <h3 style={{fontSize:16, color:"#fff"}}>Total Penerbangan: {this.state.totalPenerbangan}</h3>
                          </div>
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


export default connect(mapStateToProps)(AdminProductHome);