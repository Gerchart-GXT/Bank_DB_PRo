import React, { Component } from 'react';
import CLIENTMENULIST from './CLIENTMENULIST';
import MANAGERMENULIST from './MANAGERMENULIST';
import { Link } from 'react-router-dom';
import DropdownMenu from '../../component/jsx/DropdownMenu';
import { connect } from 'react-redux';
class LeftNav extends Component {
    state = {  } 
    listInc = 1;
    render() { 
        let menuList = CLIENTMENULIST;
        if(this.props.userInfo.userType === "经理") 
            menuList = MANAGERMENULIST
        return (
            <React.Fragment>
                <div className="list-group" id="list-tab" role="tablist">
                    <div className="card">
                        <img src={require("./static/userPhoto.png")} className="card-img-begin" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title m-2">欢迎 {this.props.userInfo.userName}</h5>
                            <button type="button" className="btn btn-primary position-relative mt-2">
                                消息与通知
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {menuList.massageCount}
                                </span>
                            </button>
                        </div>
                    </div>
                    {menuList.sonTitle.map(item => {
                        if(item.hasElements === false) {
                            return (
                                <Link className="btn btn-danger mt-1" to={item.link}  key={this.listInc++}>
                                    {item.title}
                                </Link>
                            )
                        } else {
                            return (
                                <DropdownMenu className='mt-1' direct="dropend" buttonColor={"btn-secondary"} key={this.listInc++} title={item.title} elements={item.elements}></DropdownMenu>
                            )
                        }
                    })}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        loginStatus: state.loginStatus,
        hasCookie: state.hasCookie,
        cookie: state.cookie,
        userInfo: state.userInfo
    }
};
export default connect(mapStateToProps)(LeftNav);