import React, { Component } from 'react';
import {Route, Routes } from 'react-router-dom';
import Home from '../home/home';
import NotFound from '../not_found/not-found';
import { Navigate } from 'react-router-dom';
import Register from '../register/register';
import Login from '../home/login/login';
class Routers extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/404" element={<NotFound></NotFound>}></Route>
                    <Route path='/register' element={<Register></Register>}></Route>
                    <Route path='/login' element={<Login></Login>}></Route>
                    <Route path='*' element={ <Navigate replace to="/404"></Navigate> }></Route>
                </Routes>
            </React.Fragment>
        );
    }
}
 
export default Routers;
