import React, { Component } from 'react';
import $ from "jquery"

class Register extends Component {
    state = { 
        userName: "",
        passWord: "",
        checkPassWord: "",
        authorizationCode: "",
        erroMessageUserName: "",
        erroMessagePwd: "",
        erroMessageCheckPwd: "",
        erroMessageSubmit: ""
    } 

    checkSubmitBottonDisabled = () => {
        let submitBotton = $("#submitBotton");
        if(this.state.erroMessagePwd !== "" || this.state.erroMessageUserName !== "" || this.state.erroMessageCheckPwd !== ""){
            if(!submitBotton.hasClass("disabled")){
                submitBotton.addClass("disabled");
            }
        } else if(this.state.passWord !== "" && this.state.userName !== "") {
            if(submitBotton.hasClass("disabled")){
                submitBotton.removeClass("disabled");
            }
        }
    };

    async checkUserNameLegal(input){
        await this.setState({
            userName: input
        });
        let firstNotNumReg = /[0-9]/, legalReg = /[0-9a-zA-Z]*/;
        if(input.length < 6 || input.length > 15){
            await this.setState({
                erroMessageUserName: "用户名长度非法"
            })
            this.checkSubmitBottonDisabled();
            return;
        } 
        if(legalReg.test(input) === false){
            await this.setState({
                erroMessageUserName: "用户名字符非法"
            });
        } else if(firstNotNumReg.test(input[0])){
            await this.setState({
                erroMessageUserName: "用户名应以字母开头"
            })
        } else {
            await this.setState({
                erroMessageUserName: ""
            });
        }
        this.checkSubmitBottonDisabled();
    }

    async checkPasswordLegal(input) {
        if(this.state.checkPassWord !== input){
            await this.setState({
                erroMessageCheckPwd: "两次密码不一致"
            })
        } else {
            await this.setState({
                erroMessageCheckPwd: ""
            })
        }
        this.checkSubmitBottonDisabled();
        await this.setState({
            passWord: input
        });
        let legalReg = /[A-Za-z0-9]*[A-Za-z][A-Za-z0-9]*/;
        if(input.length < 6 || input.length > 15){
            await this.setState({
                erroMessagePwd: "密码长度非法"
            })
            this.checkSubmitBottonDisabled();
            return;
        } 
        if(legalReg.test(input) === false){
            await this.setState({
                erroMessagePwd: "密码字符非法"
            });
        } else {
            await this.setState({
                erroMessagePwd: ""
            });
        }
        this.checkSubmitBottonDisabled();
    }
    async checkCheckPasswordLegal(input) {
        await this.setState({
            checkPassWord: input
        })
        if(this.state.passWord !== this.state.checkPassWord){
            await this.setState({
                erroMessageCheckPwd: "两次密码不一致"
            })
        } else {
            await this.setState({
                erroMessageCheckPwd: ""
            })
        }
        this.checkSubmitBottonDisabled();
    }
    registerSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        $.ajax({
            url: "http://127.0.0.1:4523/m2/2915088-0-default/90640514",
            type: "post",
            data: {
                username: this.state.userName,
                password: this.state.passWord,
                invcode: this.state.authorizationCode
            },
            dataType: "json",
            success: response => {
                console.log(response);
                if(response.status === "success") {
                    window.location.href="/";
                } else {
                    this.setState({
                        erroMessageSubmit: response.message
                    })
                }
            }
        })
    }
    render() { 
        return (
            <React.Fragment>
                <div className='container px-5 row m-auto'>
                    <div className="card col-md-4 m-auto text-center rounded-5">
                        <img src="https://file03.16sucai.com/2017/1100/16sucai_v20161112164_338.JPG" className="card-img-top rounded-3" alt="..."></img>
                        <div className="card-body">
                            <h3 className="card-title">
                                <span className='text-primary'>为什么</span>
                                <span className="text-">需要</span>
                                <span className="text-danger">理财？</span>
                            </h3>
                            <h6 className="card-text">理财是为了抵御通货膨胀</h6>
                            <h6 className="card-text">理财可以实现资产的保值和升值</h6>
                            <h6 className="card-text">理财可以让我们实现财务自由</h6>
                            <h6 className="card-text">理财可以满足对理财世界的好奇</h6>
                            <h6 className="card-text">理财是为了规划未来的生活</h6>
                            <div className="btn btn-primary disabled">注册吧，你的<span className='text-warning'>"财富之路"</span></div>
                        </div>
                    </div>
                    <div className='col-md-8 text-center m-auto'>
                        <h1 className='text-center py-4'>注册</h1>
                        <form>
                            <div className="row mb-3">
                                <div className='col-md-2 text-center'>
                                    <label htmlFor="userName" className="form-label my-2">用户名</label>
                                </div>
                                <div className='col-md-5 text-center'>
                                    <input onChange={e => this.checkUserNameLegal(e.target.value)} placeholder="请输入用户名" type="text" className="form-control" id="userName" ></input>
                                </div>
                                <div className='col-md-5 text-center'>
                                    <label htmlFor="userName" className="form-label my-2">仅支持数字、字母，且开头为字母，长度在6-15位</label>
                                </div>
                            </div>
                            <div className='text-center text-danger mb-3'>
                                {this.state.erroMessageUserName}
                            </div>

                            <div className="row mb-3">
                                <div className='col-md-2 text-center'>
                                    <label htmlFor="passWord" className="form-label my-2">密码</label>
                                </div>
                                <div className='col-md-5 text-center'>
                                    <input onChange={e => this.checkPasswordLegal(e.target.value)} placeholder="请输入密码" type="passWord" className="form-control" id="passWord" ></input>
                                </div>
                                <div className='col-md-5 text-center'>
                                    <label htmlFor="passWord" className="form-label my-2">需包含字母、数字，长度在6-15位</label>
                                </div>
                            </div>
                            <div className='text-center text-danger mb-3'>
                                {this.state.erroMessagePwd}
                            </div>

                            <div className="row mb-3">
                                <div className='col-md-2 text-center'>
                                    <label htmlFor="checkPassWord" className="form-label my-2">确认密码</label>
                                </div>
                                <div className='col-md-5 text-center'>
                                    <input onChange={e => this.checkCheckPasswordLegal(e.target.value)} placeholder="请再次输入您的密码" type="passWord" className="form-control" id="checkPassWord" ></input>
                                </div>
                                <div className='col-md-5 text-center'>
                                    <label htmlFor="checkPassWord" placeholder="非必填可省略" className="form-label my-2">请再次输入您的密码</label>
                                </div>
                            </div>
                            <div className='text-center text-danger mb-3'>
                                {this.state.erroMessageCheckPwd}
                            </div>
                            <div className="row mb-3">
                                <div className='col-md-2 text-center'>
                                <label htmlFor="authorizationCode" className="form-label my-2">授权码</label>
                                </div>
                                <div className='col-md-5 text-center'>
                                    <input onChange={e => this.setState({authorizationCode: e.target.value})} type="text" placeholder='非必要项目' className="form-control" id="authorizationCode"></input>
                                </div>
                            </div>
                            <div className='text-center text-danger mb-3'>
                                {this.state.erroMessageSubmit}
                            </div>
                            <div className="text-center">
                                <button onClick={e => this.registerSubmit(e)} type="submit" className="btn btn-primary disabled" id="submitBotton">注册</button>
                            </div>
                        </form>
                    </div>
                </div>
                    
            </React.Fragment>
        );
    }
}
 
export default Register;
