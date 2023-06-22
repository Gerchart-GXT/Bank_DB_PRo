import React, { Component } from 'react';
import NavDropdownMenu from '../../component/jsx/nav_dropdown_menu';
import MENULIST from './menu_list';
import CleanLink from './../../component/jsx/clean_link';

class Navbar extends Component {
    state = {  } 
    listInc = 1;
    render() { 
        return (
            <React.Fragment>
                <nav className="container-fluid rounded-4 navbar bg-danger-subtle navbar-expand-lg my-3">
                    <div className="container text-center">
                        <CleanLink needClean={false} className="navbar-brand" href="#">{MENULIST.fatherTitle}</CleanLink>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navmenu"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navmenu">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {MENULIST.sonTitle.map(list => {
                                    if(list.hasElements === true)
                                        return (
                                            <NavDropdownMenu key={this.listInc++} title={list.title} elements={list.elements}></NavDropdownMenu>
                                        )
                                    else
                                        return (
                                            <li className="nav-item" key={this.listInc++}>
                                                <CleanLink needClean={false} className="nav-link" to={list.link}>{list.title}</CleanLink>
                                            </li>
                                        )
                                })}
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
 
export default Navbar;