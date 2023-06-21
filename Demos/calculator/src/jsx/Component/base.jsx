import React, { Component } from 'react';
class Base extends Component {
    state = {  } 
    render() { 
        return (
        <React.Fragment>
            <div className="card my-3">
                <div className="card-body text-center">
                    {this.props.children}
                </div>
            </div>
        </React.Fragment>
        );
    }
}
 
export default Base;