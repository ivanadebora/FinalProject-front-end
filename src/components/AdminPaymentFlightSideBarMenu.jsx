import React, { Component } from 'react';


class AdminPaymentFlightSideBarMenu extends Component {
    render() {
        return(
            <div>
                <div  style={{ fontSize: "13px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2">
                                <div className="list-group">
                                    <a href="/adminpaymenthome" className="list-group-item active" style={{backgroundColor: "#0a0851", borderColor: "#0a0851" }} >Flight Dashboard</a>
                                    <a href="/manageflightpayment" className="list-group-item">Manage Transaction</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPaymentFlightSideBarMenu;