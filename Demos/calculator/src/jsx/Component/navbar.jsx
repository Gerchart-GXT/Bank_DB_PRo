import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.esm';
import { Link } from 'react-router-dom';
import $ from "jquery";
class Navbar extends Component {
    state = {  } 

    renderCalculator() {
        if(this.props.isLogin === true){
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/calculator">Calculator</Link>
                </li>
            )
        } else {
            return "";
        }
    }

    handleLogout() {
        // $.ajax({
        //     url: "https://app165.acapp.acwing.com.cn/calculator/logout/",
        //     type: "get",
        //     success: resp => {
        //         if(resp.result === "success"){
        //             window.location.href="/";
        //         }
        //     }
        // });
    }

    rendUser() {
        if(this.props.isLogin === true) {
            return (
                <form className="d-inline-flex justify-content-end ms-auto m-2">
                <button className="btn btn-sm btn-outline-secondary" type="button">
                    <a className="nav-link" >{this.props.userName}</a>
                </button>
                <button onClick={this.handleLogout} className="btn btn-sm btn-outline-secondary ms-3" type="button">
                    <a className="nav-link" >logout</a>
                </button>
                </form>
            );
        } else {
            return (
                <form className="d-inline-flex justify-content-end ms-auto m-2">
                <button className="btn btn-sm btn-outline-secondary" type="button">
                    <Link className="nav-link" to="/login">Login</Link>
                </button>
                <button className="btn btn-sm btn-outline-secondary ms-3" type="button">
                    <Link className="nav-link" to="/register">Register</Link>
                </button>
                </form>
            )
        }
    }
    render() { 
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container text-center">
                    <Link className="navbar-brand" to="/">OnlineCalculator</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            {this.renderCalculator()}
                        </ul>
                        {this.rendUser()}
                    </div>
                </div>
            </nav>
        );
    }
}
 
export default Navbar;