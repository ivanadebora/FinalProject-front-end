import React, { Component } from 'react';
import {
    Col, Card, CardText
} from 'reactstrap';


class ProductFLightListNF extends Component {
    render(){
        return( 
            <Col lg="12" style={{ marginTop: "100px" }}>
       
            <Card style={{height:500}}>
            <center><CardText>
            <img  className="img-responsive" src='img/404.png' alt="not found data" style={{marginTop:20, height:300}}/>
           <h3>Sorry, We could not find any flight for you!</h3>
            </CardText></center>
       </Card>
       
       </Col>
        )
    }
}

export default ProductFLightListNF;