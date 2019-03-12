import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {
    TabContent, TabPane, Nav, NavItem, NavLink, Card, Row, Col
} from 'reactstrap';
import AdminProductFlightManageMaskapai from './AdminProductFlightManageMaskapai';

const cookie = new Cookies()
class AdminProductFlightManageMaskapaiFull extends Component {

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


    render(){
      var newRole = cookie.get('dataRole')
      if (newRole === 'AdminProduct') {
        return(
          // <div id="hero" className="wow fadeIn">
          // <div className="container-fluid">
          <div className="tab-admin" style={{margin:"70px 0px 10px 10px", width:1340}}>
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
                      <AdminProductFlightManageMaskapai />
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
          // </div>
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


export default connect(mapStateToProps)(AdminProductFlightManageMaskapaiFull);