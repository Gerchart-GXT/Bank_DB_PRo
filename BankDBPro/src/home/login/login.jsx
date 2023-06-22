import React, { Component } from 'react';
import $ from 'jquery';
class Login extends Component {
    state = { 
        userName: "",
        passWord: "",
        erroMessageSubmit: ""
    } 

    checkSubmitBottonDisabled = () => {
        let submitBotton = $("#submitBotton");
        if(this.state.passWord !== "" && this.state.userName !== "") {
            if(submitBotton.hasClass("disabled")){
                submitBotton.removeClass("disabled");
            }
        } else {
            if(!submitBotton.hasClass("disabled")){
                submitBotton.addClass("disabled");
            }
        }
    };
    registerSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        $.ajax({
            url: "http://127.0.0.1:4523/m2/2915088-0-default/90640682",
            type: "post",
            data: {
                username: this.state.userName,
                password: this.state.passWord,
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
                            <a className="btn btn-primary disabled">注册吧，你的<span className='text-warning'>"财富之路"</span></a>
                        </div>
                    </div>
                    <div className='col-md-8 text-center m-auto'>
                        <h1 className='text-center py-4'>登录</h1>
                        <form>
                            <div className="row mb-3">
                                <div className='col-md-2 text-center'>
                                    <label htmlFor="userName" className="form-label my-2">用户名</label>
                                </div>
                                <div className='col-md-8 text-center'>
                                    <input onChange={e => {this.setState({userName: e.target.value}); this.checkSubmitBottonDisabled()}} placeholder="请输入用户名" type="text" className="form-control" id="userName" ></input>
                                </div>
                                <div className='col-md-2 text-center'></div>
                            </div>
                            <div className='text-center text-danger mb-3'>
                                {this.state.erroMessageUserName}
                            </div>

                            <div className="row mb-3">
                                <div className='col-md-2 text-center'>
                                    <label htmlFor="passWord" className="form-label my-2">密码</label>
                                </div>
                                <div className='col-md-8 text-center'>
                                    <input onChange={e => {this.setState({passWord: e.target.value}); this.checkSubmitBottonDisabled()}} placeholder="请输入密码" type="passWord" className="form-control" id="passWord" ></input>
                                </div>
                                <div className='col-md-2 text-center'>
                                </div>
                            </div>
                            <div className='text-center text-danger mb-3'>
                                {this.state.erroMessagePwd}
                            </div>
                            <div className='text-center text-danger mb-3'>
                                {this.state.erroMessageSubmit}
                            </div>
                            <div className="text-center">
                                <button onClick={e => this.registerSubmit(e)} className="btn btn-primary disabled mx-2" id="submitBotton">登录</button>
                                <button className="btn btn-warning mx-2 disabled" >忘记密码</button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Login;