import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import ACTIONS from './../../component/redux/action';
import { APIHOST, APIPATH } from '../../component/jsx/APIS';

class MyUserInfo extends Component {
    state = { 
        receiveloginAccountInfo: false,
        loginAccountHead: [],
        loginAccountInfo: [],
        loginAccountTitle: [],
        receivebankAccount: false,
        bankAccountHead: [],
        bankAccountInfo: [],
        bankAccountTitle: [],
        needtoSubmit: false,
        submitMessage: ""
    };
    infoInc = 1;
    getLoginAccontInfo = () => {
        $.ajax({
            url: `${APIHOST}${APIPATH.loginAccountInfo}`,
            type: "post",
            data: JSON.stringify({
                username: this.props.userInfo.userName
            }),
            dataType: "json",
            success: (response) =>{
                console.log(response);
                if(response.status === "success") {
                    this.setState({
                        loginAccountInfo: response.account_info,
                        loginAccountHead: response.head,
                        loginAccountTitle: response.title,
                        receiveloginAccountInfo: true
                    })
                }
            }
        });
    }
    getClientInfo = () => {
        $.ajax({
            url: `${APIHOST}${APIPATH.clientInfo}`,
            type: "post",
            data: JSON.stringify({
                username: this.props.userInfo.userName
            }),
            dataType: "json",
            success: (response) =>{
                if(response.status === "success") {
                    this.setState({
                        bankAccountInfo: response.client_info,
                        bankAccountHead: response.head,
                        bankAccountTitle: response.title,
                        receivebankAccountInfo: true
                    })
                }
            }
        });
    }

    getManagerInfo = () => {
        $.ajax({
            url: `${APIHOST}${APIPATH.managerInfo}`,
            type: "post",
            data: JSON.stringify({
                username: this.props.userInfo.userName
            }),
            dataType: "json",
            success: (response) =>{
                if(response.status === "success") {
                    this.setState({
                        bankAccountInfo: response.manager_info,
                        bankAccountHead: response.head,
                        bankAccountTitle: response.title,
                        receivebankAccountInfo: true
                    })
                }
            }
        });
    }

    handleSubmit = () => {
        if(this.props.userInfo.userType === "客户"){
            $.ajax({
                url: `${APIHOST}${APIPATH.clientInfoChange}`,
                type: "post",
                data: JSON.stringify({
                    username: this.props.userInfo.userName,
                    client_name: this.state.bankAccountInfo.client_name,
                    client_idnum: this.state.bankAccountInfo.client_idnum,
                    client_phone_number: this.state.bankAccountInfo.client_phone_number,
                    client_email_address: this.state.bankAccountInfo.client_email_address,
                }),
                dataType: "json",
                success: (response) =>{
                    if(response.status === "success") {
                        this.setState({
                            receiveloginAccountInfo: false,
                            receivebankAccountInfo: false
                        });
                        window.location.href="/my";
                    } else {
                        this.setState({
                            submitMessage: response.message
                        });
                    }
                }
            })
        } else if (this.props.userInfo.userType === '经理'){
            $.ajax({
                url: `${APIHOST}${APIPATH.managerInfoChange}`,
                type: "post",
                data: JSON.stringify({
                    username: this.props.userInfo.userName,
                    manager_email_address: this.state.bankAccountInfo.manager_email_address,
                    manager_name: this.state.bankAccountInfo.manager_name,
                    manager_phone_number: this.state.bankAccountInfo.client_phone_number,
                    manager_department_id: this.state.bankAccountInfo.manager_department_id,
                }),
                dataType: "json",
                success: (response) =>{
                    if(response.status === "success") {
                        this.setState({
                            receiveloginAccountInfo: false,
                            receivebankAccountInfo: false
                        });
                        window.location.href="/my";
                    } else {
                        this.setState({
                            submitMessage: response.message
                        });
                    }
                }
            })
        }

    }

    handleDelete = () => {
        $.ajax({
            url: `${APIHOST}${APIPATH.accountDelete}`,
            type: "post",
            data: JSON.stringify({
                username: this.props.userInfo.userName
            }),
            dataType: "json",
            success: (response) =>{
                if(response.status === "success") {
                    alert("Success");
                    window.location.href="/";
                    this.props.logout();
                } else {
                    alert(response.state);
                }
            }
        });
    }

    checkNeedForSubmit = () => {
        if(this.state.needtoSubmit === true) {
            return (
                <button onClick={this.handleSubmit} type="button" class="btn btn-success">保存修改</button>
            )
        }
    }

    rendDepartment = () => {
        //todo
    }
    render() { 
        if(this.state.receiveloginAccountInfo === false || this.state.receivebackAccount === false){
            this.getLoginAccontInfo();
            console.log(this.state);
            if(this.props.userInfo.userType === "客户"){
                this.getClientInfo();
            } else if(this.props.userInfo.userType === "经理") {
                this.getManagerInfo();
            } else { 
                //todo
            }
            return null;
        } else {

            return (
                <React.Fragment>
                    <h1 className="text-center mt-3">
                        {this.state.loginAccountTitle}
                    </h1>
                    <class className="container text-center">
                        <form>
                            <div className="form-group">
                                {this.state.loginAccountHead.map(item =>{
                                    return (
                                        <div key={this.infoInc++} className="form-group">
                                            <div className="container row text-certer m-auto">
                                                <div className='col-md-3 mt-4 text-center m-auto'>
                                                    <label className='my-2' htmlFor={`${Object.keys(item)[0]}`}>{Object.values(item)[0]}</label>
                                                </div>
                                                <div className='col-md-7 mt-4 text-center m-auto'>
                                                    <input type="text" className="form-control disabled" disabled="disabled" id={`${Object.keys(item)[0]}`} placeholder={this.state.loginAccountInfo[Object.keys(item)[0]]}></input>
                                                </div>
                                                <div className='col-md-2 mt-4 text-center m-auto'>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </form>
                    </class>
                    <h1 className="text-center mt-3">
                        {this.state.bankAccountTitle}
                    </h1>
                    <class className="container text-center">
                        <form>
                            <div className="form-group">
                                {this.state.bankAccountHead.map(item =>{
                                    return (
                                        <div key={this.infoInc++} className="form-group">
                                            <div className="container row text-certer m-auto">
                                                <div className='col-md-3 mt-4 text-center m-auto'>
                                                    <label className='my-2' htmlFor={`${Object.keys(item)[0]}`}>{Object.values(item)[0]}</label>
                                                </div>
                                                <div className='col-md-7 mt-4 text-center m-auto'>
                                                    <input onBlur={e => {
                                                        this.setState({
                                                            bankAccountInfo: {
                                                                ...this.state.bankAccountInfo,
                                                                [`${Object.keys(item)[0]}`]: e.target.value
                                                            },
                                                            needtoSubmit: true
                                                        })
                                                    }
                                                    } type="text" className="form-control disabled" disabled="disabled" id={`${Object.keys(item)[0]}`} placeholder={this.state.bankAccountInfo[Object.keys(item)[0]]}></input>
                                                </div>
                                                <div className='col-md-2 mt-4 text-center m-auto'>
                                                    <button onClick={e => {
                                                        let btn = $(`#${Object.keys(item)[0]}-btn`);
                                                        let ipn = $(`#${Object.keys(item)[0]}`);
                                                        if(btn.text() === "修改"){
                                                            ipn.removeAttr("disabled");
                                                            btn.text("保存");
                                                            btn.removeClass("btn-warning");
                                                            btn.addClass("btn-danger")
                                                        } else if (btn.text() === "保存"){
                                                            ipn.attr("disabled", "disabled");
                                                            btn.text("修改");
                                                            btn.removeClass("btn-danger");
                                                            btn.addClass("btn-warning")
                                                        }
                                                    }} type="button" className="btn btn-warning" id={`${Object.keys(item)[0]}-btn`}>
                                                        修改
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            {this.props.userInfo.userType === '经理' ? this.rendDepartment(): null}
                            
                        </form>
                    </class>
                    <h5 className='text-center m-3 text-danger'>{this.state.submitMessage}</h5>
                    <div className='d-flex justify-content-center'>
                        {this.checkNeedForSubmit()}
                        <button onClick={this.handleDelete} type="button" class="btn btn-danger mx-4">注销账号</button>
                    </div>
                </React.Fragment>
            );
        }
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
    logout: () => {
        return {
            type: ACTIONS.LOGOUT
        }
    }
};

export default connect(mapStateToProps, )(MyUserInfo);;