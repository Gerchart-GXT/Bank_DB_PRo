import React, { Component } from 'react';
import CleanLink from './clean_link';

class DropdownMenu extends Component {
    state = {  } ;
    keyInc = 1;
    fillItems = (item) => {
        if(item.type === "divider")
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
                <div className={`btn-group round-1 ${this.props.direct} ${this.props.className}`}>
                    <button className={`btn dropdown-toggle ${this.props.buttonColor}`}  data-bs-toggle="dropdown" aria-expanded="true">
                        {this.props.title}
                    </button>
                    <ul className="dropdown-menu">
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
 
export default DropdownMenu;