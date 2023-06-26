import React, { Component } from 'react';
class TableItem extends Component {
    state = {  } 
    keyInc = 1;
    itemInc = 1;
    render() { 
        this.keyInc = 1;
        this.itemInc = 1;
        return (
            <React.Fragment>
                <tbody className="table-group-divider">
                    {this.props.item.map(element => {
                        return (
                            <tr key={this.keyInc++}>
                                <td>{this.itemInc++}</td>
                                {this.props.head.map(nowHwead => {
                                    return(
                                        <td key={this.keyInc++}> {element[Object.keys(nowHwead)[0]]}</td>
                                    )
                                })}
                                {this.props.canDelete ? <button onClick={() => this.props.handleDelete(`${element[Object.keys(this.props.head[0])]}`)} class="btn btn-danger my-1 py-1 ">删除</button> : null}
                            </tr>
                        )
                    })}
                </tbody>
        </React.Fragment>
        );
    }
}
 
export default TableItem;