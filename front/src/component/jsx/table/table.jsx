import React, { Component } from 'react';
import TableHead from './table_head';
import TableItem from './table_item';
class Table extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <h1 className='text-center mt-3'>{this.props.title}</h1>
                <table className="table table-hover table-striped text-center mt-4">
                    <TableHead canDelete={this.props.canDelete} head={this.props.head}></TableHead>
                    <TableItem head={this.props.head} item={this.props.item} canDelete={this.props.canDelete} handleDelete={this.props.handleDelete}></TableItem>
                </table>
            </React.Fragment>
        );
    }
}
 
export default Table;