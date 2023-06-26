import React, { Component } from 'react';
import $ from 'jquery';
import ACTIONS from '../component/redux/action';
import { connect } from 'react-redux';
import { APIHOST, APIPATH } from '../component/jsx/APIS';
class DebitCardApply extends Component {
    state = { 
        passWord: "",
    } 
    applySubmit = (e) => {
        e.preventDefault();
        $.ajax({
            url: `${APIHOST}${APIPATH.debitApply}`,
            type: "post",
            data: JSON.stringify({
                username: this.props.userInfo.userName,
                password: this.state.passWord
            }),
            dataType: "json",
            success: response => {
                console.log(response);
                if(response.status === "success") {
                    alert("学生卡！")
                    window.location.href="/my/user-info";
                }
            },
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
                                <span className='text-primary'>开卡吧</span>
                                <span className="text-">需要</span>
                                <span className="text-danger">更大额度?</span>
                            </h3>
                            <h6 className="card-text">理财是为了抵御通货膨胀</h6>
                            <h6 className="card-text">理财可以实现资产的保值和升值</h6>
                            <h6 className="card-text">理财可以让我们实现财务自由</h6>
                            <h6 className="card-text">理财可以满足对理财世界的好奇</h6>
                            <h6 className="card-text">理财是为了规划未来的生活</h6>
                            <div className="btn btn-primary disabled">开卡吧，你的<span className='text-warning'>"借贷生活"</span></div>
                        </div>
                    </div>
                    <div className='col-md-8 text-center m-auto'>
                        <h1 className='text-center py-4'>开卡！您密码</h1>
                        <form>
                            <div className="row mb-3">
                                <div className='col-md-2 text-center'>
                                    <label htmlFor="passWord" className="form-label my-2">您的卡密</label>
                                </div>
                                <div className='col-md-8 text-center'>
                                    <input onChange={e => {this.setState({passWord: e.target.value})}} placeholder="请输入密码" type="passWord" className="form-control" id="passWord" ></input>
                                </div>
                                <div className='col-md-2 text-center'>
                                </div>
                            </div>

                            <div className="text-center">
                                <button onClick={e => this.applySubmit(e)} className="btn btn-primary mx-2" id="submitBotton">开卡！</button>
                            </div>
                        </form>
                    </div>
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
 
export default connect(mapStateToProps)(DebitCardApply);