import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class CleanLink extends Component {
    state = {  } 
    render() { 
        return (
            <Link to={this.props.to} className="dropdown-item">
                {this.props.children}
            </Link>
        );
    }
}
 
export default CleanLink;