import React, { Component } from 'react';
import LeftNav from './left-nav/left_nav';
import { Outlet, Route, Routes } from 'react-router-dom';
class My extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className='container'>
                    <div className="row">
                        <div className="col-md-3 text-center">
                            <LeftNav></LeftNav>
                        </div>
                    <div className="col-md-9">
                        <Outlet></Outlet>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default My;