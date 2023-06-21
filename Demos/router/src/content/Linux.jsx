import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
class Linux extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <h1>Linux</h1>
                <Outlet></Outlet>
            </React.Fragment>
        );
    }
}
 
export default Linux;