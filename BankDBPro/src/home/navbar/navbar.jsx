import React, { Component, Fragment } from 'react';
import NavDropdownMenu from '../../component/jsx/nav_dropdown_menu';
import MENULIST from './menu_list';

class Navbar extends Component {
    state = {  } 
    listInc = 1;
    render() { 
        return (
            <React.Fragment>
                <nav className="container-fluid rounded-4 navbar bg-danger-subtle navbar-expand-lg my-3">
                    <div className="container text-center">
                        <a className="navbar-brand" href="#">
                        </a>
                        <a className="navbar-brand" href="#">首页</a>
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
                                {MENULIST.map(list => (
                                    <NavDropdownMenu key={this.listInc++} title={list.title} elements={list.elements}></NavDropdownMenu>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
 
export default Navbar;