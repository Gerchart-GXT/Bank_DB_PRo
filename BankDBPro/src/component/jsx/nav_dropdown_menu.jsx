import React, { Component } from 'react';
import CleanLink from '../../component/jsx/clean_link'

class NavDropdownMenu extends Component {
    state = {  } ;
    keyInc = 1;
    fillItems(item) {
        if(item.type === "header")
            return (
                <li key={this.keyInc++}><h6 className="dropdown-header">{item.content}</h6></li>
            )
        else if(item.type === "divider")
            return (
                <li key={this.keyInc++}><hr className="dropdown-divider"></hr></li>
            )
        else 
            return (
                <li key={this.keyInc++}><CleanLink className="dropdown-item" to={item.link}>{item.content}</CleanLink></li>
            )
    };
    render() { 
        return (
            <React.Fragment>
                <div className="nav-item dropdown text-center">
                    <button className="nav-link dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">
                        {this.props.title}
                    </button>
                    
                    <ul className="dropdown-menu text-center bg-info-subtle rounded-4">
                        {this.props.elements.map(item => {
                            return (
                                this.fillItems(item)
                            )
                        })}
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}
 
export default NavDropdownMenu;