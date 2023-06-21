import React, { Component } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Linux from './Linux';
import Django from './Django';
import Web from './Web';
import NotFound from './NotFound';
import { Navigate, Route, Routes } from 'react-router-dom';
import WebPage from './WebPage';
class Router extends Component {
    render() { 
        return (
            <React.Fragment>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/linux" element={<Linux></Linux>}>
                        <Route path="homework" element={<p>homework</p>}></Route>
                        <Route path="terminal" element={<p>terminal</p>}></Route>
                    </Route>
                    <Route path="/django" element={<Django></Django>}></Route>
                    <Route path="/web" element={<Web></Web>}></Route>
                    <Route path="/web/page" element={<WebPage></WebPage>}></Route>
                    <Route path="/404" element={<NotFound></NotFound>}></Route>
                    <Route path="*" element={<Navigate replace to="/404"></Navigate>}></Route>
                </Routes>
            </React.Fragment>
        );
    }
}
 
export default Router;