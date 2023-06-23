import React, { Component } from 'react';
import ACTIONS from '../redux/action';
import CleanLink from './clean_link';
import { connect } from 'react-redux';
import $ from 'jquery'
class HandleLoginRegister extends Component {
    handleLogOut = () => {
        $.ajax({
            url: "",
            type: "post",
            data: {
                cookie: this.props.cookie,
                userInfo: this.props.userInfo
            },
            dataType: "json",
            success: response => {
                if(response.status === "success") {
                    this.props.logout();
                } else {
                    console.log(response.status);
                }
            }
        })
    }

    rendForLoginRegister = () => {
        if(this.props.loginStatus === true){
            return (
                <React.Fragment>
                    <button className="btn btn-sm btn-outline-success mx-2" type="button">
                        <CleanLink to="/my">{this.props.userInfo.userName}</CleanLink>
                    </button>
                    <button onClick={this.handleLogOut} className="btn btn-sm btn-outline-success mx-2" type="button">
                        <CleanLink to="/">登出</CleanLink>
                    </button>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <button className="btn btn-sm btn-outline-success mx-2" type="button">
                        <CleanLink to="/login">登录</CleanLink>
                    </button>
                    <button className="btn btn-sm btn-outline-success mx-2" type="button">
                        <CleanLink to="/register">注册</CleanLink>
                    </button>
                </React.Fragment>
            )
        }
    };
    checkLoginState = () => {
        $.ajax({
            url: "",
            type: "post",
            data: {
                cookie: this.props.cookie.value
            },
            dataType: "json",
            success: response => {
                if(response.status === "success"){
                    this.props.recoveryLogin({
                        userName: response.userName,
                        passWord: ""
                    });
                } else {
                    this.props.deleCookie();
                }
            }
        })
    }
    render() { 
        if(this.props.hasCookie === false && localStorage.getItem("cookieValue") && localStorage.getItem("cookieExpires")){
            this.props.recoveryCookie({
                value: localStorage.getItem("cookieValue"),
                expires: localStorage.getItem("cookieExpires")
            });
        }
        this.checkLoginState();
        return (
            <React.Fragment>
                {this.rendForLoginRegister()}
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

const mapDispatchToProps = {
    recoveryCookie: (cookie) => {
        return {
            type: ACTIONS.RECOVERYCOOKIE,
            cookie: cookie,
        }
    },
    recoveryLogin: (userInfo) => {
        return {
            type: ACTIONS.RECOVERYLOGIN,
            userInfo: userInfo,
        }
    },
    checkLoginStatus: () => {
        return {
            type: ACTIONS.CHECKLOGINSTATUS
        }
    },
    deleCookie : () => {
        return {
            type: ACTIONS.DELECOOKIE
        }
    },
    logout: () => {
        return {
            type: ACTIONS.LOGOUT
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleLoginRegister);