import React, { Component } from "react";
import Navbar from "./Component/navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Component/home";
import Calculator from "./Component/calculator";
import Register from "./Component/register";
import Login from "./Component/login";
import NotFound from "./Component/notfound";
import $ from "jquery";

class App extends Component {
    state = {
        isLogin: true,
        userName: ""
    };
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <Navbar isLogin={this.state.isLogin} userName={this.state.userName}></Navbar>
                    <Routes>
                        <Route path="/" element={<Home></Home>}></Route>
                        <Route path="/home" element={<Home></Home>}></Route>
                        <Route
                            path="/calculator"
                            element={this.state.isLogin ? <Calculator></Calculator> : <Navigate replace to={"/login"}></Navigate>}
                        ></Route>
                        <Route path="/login" element={this.state.isLogin ? <Navigate replace to={"/"}></Navigate> : <Login></Login>}></Route>
                        <Route
                            path="/register"
                            element={<Register></Register>}
                        ></Route>
                        <Route
                            path="/404"
                            element={<NotFound></NotFound>}
                        ></Route>
                        <Route
                            path="*"
                            element={<Navigate replace to={"/404"}></Navigate>}
                        ></Route>
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
