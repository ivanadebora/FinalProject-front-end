import React, { Component } from 'react';


class AdminProductFlightSideBarMenu extends Component {
    render() {
        return(
            <div>
                <div  style={{ fontSize: "13px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2">
                                <div className="list-group">
                                    <a href="/adminproducthome" className="list-group-item active" style={{backgroundColor: "#0a0851", borderColor: "#0a0851" }} >Flight Dashboard</a>
                                    <a href="/managemaskapai" className="list-group-item">Daftar Maskapai</a>
                                    <a href="/manageflight" className="list-group-item">Products</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminProductFlightSideBarMenu;