import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/clean_link.css'
class CleanLink extends Component {
    state = {  } 
    render() { 
        return (
            <Link className={`clean-link ${this.props.className}`} to={this.props.to}>
                {this.props.children}
            </Link>
        );
    }
}
 
export default CleanLink;