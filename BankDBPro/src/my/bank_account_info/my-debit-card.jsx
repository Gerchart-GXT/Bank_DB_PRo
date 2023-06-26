import React, { Component } from 'react';
import Table from '../../component/jsx/table/table';
import $ from 'jquery'
import { APIHOST, APIPATH } from '../../component/jsx/APIS';
import { connect } from 'react-redux';
class MyDebitCard extends Component {
    state = {
        receiveTableInfo: false,
        tableHead: "",
        tableTitel: "",
        tableItem:""
    } 

    getTableInfo = () => {
        $.ajax({
            url: `${APIHOST}${APIPATH.debitCardInfo}`,
            type: "post",
            data: JSON.stringify({
                username: this.props.userInfo.userName
            }),
            dataType: "json",
            success: response => {
                this.setState({
                    receiveTableInfo: true
                });
                if(response.status === "success") {
                    this.setState({
                        tableHead: response.head,
                        tableItem: response.item,
                        tableTitel: response.title,
                    })
                }
            }
        });
    }

    render() { 
        console.log(this.state);
        if(this.state.receiveTableInfo === false){
            this.getTableInfo();
            return null;
        } else {
            return (
                <React.Fragment>
                    <Table title={this.state.tableTitel} item={this.state.tableItem} head={this.state.tableHead} canDelete={true} handleDelete={
                        (creditCardId) => {
                            console.log(creditCardId);
                            $.ajax({
                                url: `${APIHOST}${APIPATH.cardDelete}`,
                                type: "post",
                                data: JSON.stringify({
                                    card_id: creditCardId
                                }),
                                dataType: "json",
                                success: response => {
                                    if(response.status === "success") {
                                        alert("success");
                                        window.location.reload(false);
                                        this.getTableInfo();
                                    } else {
                                        alert(response.message);
                                    }
                                }
                            })
                        }
                    }></Table>
                </React.Fragment>
            )
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
 
export default connect(mapStateToProps)(MyDebitCard);;
 