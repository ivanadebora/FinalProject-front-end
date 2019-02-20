import React, { Component } from 'react';


class AdminProductFlightDashboard extends Component {
    render() {
        return(
            <div>
                <div  style={{ fontSize: "16px", marginTop: "50px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="list-group">
                                    <a href="/adminproducthome" className="list-group-item active" style={{backgroundColor: "#2abe8d", borderColor: "#2abe8d" }} >Flight Dashboard</a>
                                    <a href="/managemaskapai" className="list-group-item">Maskapai</a>
                                    <a href="/manageflight" className="list-group-item">Flight</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminProductFlightDashboard;