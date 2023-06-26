import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/js/bootstrap.esm'
import 'bootstrap/dist/js/bootstrap'
import Routers from './routers/root-router';
import { BrowserRouter, Outlet } from 'react-router-dom';
import PageHead from './component/jsx/page_head';
import { Provider } from 'react-redux';
import store from './component/redux/store';
import PageTail from './tail/page-tail';

class BankDBPro extends Component {
    render() { 
        return (
            <React.Fragment>
                <Provider store={store}>
                    <BrowserRouter>
                        <div className='bg-body-tertiary' style={{width: "auto", minHeight: "100rem"}}>
                            <PageHead></PageHead>
                            <Routers></Routers>
                            <PageTail></PageTail>
                        </div>
                    </BrowserRouter>
                </Provider>
            </React.Fragment>
        );
    }
}
 
export default BankDBPro;