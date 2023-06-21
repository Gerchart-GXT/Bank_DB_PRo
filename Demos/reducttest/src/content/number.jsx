import React, { Component } from 'react';
import { connect } from 'react-redux';
class Number extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <h1>Number:</h1>
                <h1>{this.props.number}</h1>
                <button onClick={() => this.props.concat('s')}>concat</button>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        number: state.number
    }
}

const mapDispatchToProps = {
    concat: (c) => {
        return {
            type: "concat",
            character: c
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Number);