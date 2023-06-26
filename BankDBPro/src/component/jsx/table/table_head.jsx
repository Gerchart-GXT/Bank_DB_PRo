import React, { Component } from 'react';
class TableHead extends Component {
    state = {  } 
    headInc = 1;
    render() { 
        this.headInc = 1;
        return (
            <React.Fragment>
                <thead>
                    <tr>
                        <th key={this.headInc++} scope="col">序号</th>
                            {this.props.head.map(item => {
                                return (
                                    <th key={this.headInc++} scope="col">{Object.values(item)}</th>
                                )
                            })}
                            {this.props.canDelete ? <th key={this.headInc++} scope="col">操作</th> : null}
                        </tr>
                </thead>
            </React.Fragment>
        );
    }
}
 
export default TableHead;