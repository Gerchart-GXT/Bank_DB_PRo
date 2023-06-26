import React, { Component } from 'react';
import $ from "jquery"
import { APIHOST, APIPATH } from '../component/jsx/APIS';
import { connect } from 'react-redux';

class BuyFund extends Component {
    state = {
        tableHead: [],
        tableTitle: "",
        tableItem: [],
        receiveTable: false,
        receiveBuyHead: false,
        buyHead: [],
        buyInfo: {}
    } 

    getFundList = () => {
        $.ajax({
            url: `${APIHOST}${APIPATH.fundList}`,
            dataType: "json",
            success: response =>{
                if(response.status === "success"){
                    this.setState({
                        tableHead: response.head,
                        tableItem: response.item,
                        tableTitle: response.title,
                        receiveTable: true
                    })
                }
            }
        })
    }

    getBuyHead = () => {
        $.ajax({
            url: `${APIHOST}${APIPATH.shopFund}`,
            type: "post",
            dataType: "json",
            success: response =>{
                if(response.status === "success"){
                    this.setState({
                        buyHead: response.head,
                        receiveBuyHead: true
                    })
                } else {
                    console.log(response);
                }
            }
        })
    }

    render() { 
        if(this.state.receiveTable === false || this.state.receiveBuyHead === false) {
            this.getFundList();
            this.getBuyHead();
            return null;
        } else {
            return (
                <React.Fragment>
                    <div className='container'>
                        <div className='row'>
                            {this.state.tableItem.map( item => {
                                return (
                                    <React.Fragment>
                                    <div class="card m-3 col-md-4 m-auto">
                                        <img src={require("./static/5.png")} class="card-img-top"/>
                                        <div class="card-body text-center m-2">
                                            {this.state.tableHead.map( nowHead => {
                                                return(
                                                    <h5 class="card-title text-center">{`${Object.values(nowHead)[0]}`}：{item[`${Object.keys(nowHead)[0]}`]}</h5>
                                                )
                                            })}
                                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#buy-window">
                                                购买
                                            </button>
                                        </div>
                                    </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </div>
                    <div class="modal fade" id="buy-window" tabindex="-1"  aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="buy-windowLabel">购买</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                {this.state.buyHead.map(item => {
                                    let nowKey = Object.keys(item)[0];
                                    let nowValue = Object.values(item)[0];
                                    return (
                                        <div class="mb-3">
                                            <label for={nowKey} class="form-label">{nowValue}</label>
                                            <input onChange={e => {
                                                console.log(nowKey);
                                                let newBuyInfo = this.state.buyInfo;
                                                newBuyInfo[nowKey] = e.target.value;
                                                this.setState({
                                                    buyInfo: newBuyInfo
                                                })
                                            }} type="text" class="form-control" id={nowKey}></input>
                                        </div>
                                    )
                                })}
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                            <button onClick={() => {
                                $.ajax({
                                    url: `${APIHOST}${APIPATH.buyFund}`,
                                    type:"post",
                                    data: JSON.stringify({
                                        username: this.props.userInfo.userName,
                                        fund_amount: this.state.buyInfo.fund_amount,
                                        fund_type: this.state.buyInfo.fund_type,
                                        fund_period: this.state.buyInfo.fund_period,
                                        fund_detail_etc: this.state.buyInfo.fund_detail_etc,
                                    }),
                                    dataType: "json",
                                    success: response => {
                                        console.log(response);
                                        if(response.status === 'success') {
                                            alert("success");
                                        } 
                                    }
                                })
                            }} type="button" class="btn btn-primary">购买</button>
                        </div>
                        </div>
                    </div>
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
 
export default connect(mapStateToProps)(BuyFund);