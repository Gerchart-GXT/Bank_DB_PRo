import React, { Component } from 'react';
import Table from '../../component/jsx/table/table';
import $ from 'jquery'
import { connect } from 'react-redux';
import { APIHOST, APIPATH} from '../../component/jsx/APIS';
class MyFinanicialInfo extends Component {
    state = {
        receiveTableInfo: false,
        tableHead: "",
        tableTitel: "",
        tableItem:""
    } 

    getTableInfo = () => {
        $.ajax({
            url: `${APIHOST}${APIPATH.finanicialInfo}`,
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
                } else {
                    console.log(123);
                }
            }
        });
    }

    render() { 
        if(this.state.receiveTableInfo === false){
            this.getTableInfo();
            return null;
        } else {
            return (
                <Table title={this.state.tableTitel} item={this.state.tableItem} head={this.state.tableHead} canDelete={true} handleDelete={
                    (itemId) => {
                        console.log(itemId);
                        $.ajax({
                            url: `${APIHOST}${APIPATH.projectDelete}`,
                            type: "post",
                            data: JSON.stringify({
                                project_id: itemId
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
 
export default connect(mapStateToProps)(MyFinanicialInfo);;
 