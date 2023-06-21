import React, { Component } from 'react';
import Base from './base';

class Home extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Base>
                    <h3 className='mb-0'>Home</h3>
                </Base>
            </React.Fragment>
        );
    }
}
 
export default Home;