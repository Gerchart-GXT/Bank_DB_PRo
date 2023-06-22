import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/js/bootstrap.esm'
import 'bootstrap/dist/js/bootstrap'
import Routers from './routers/router';
import { BrowserRouter } from 'react-router-dom';
import PageHead from './component/jsx/page_head';

class BankDBPro extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <BrowserRouter>
                    <div className='bg-body-tertiary' style={{width: "auto", minHeight: "100rem"}}>
                        <PageHead></PageHead>
                        <Routers></Routers>
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
 
export default BankDBPro;