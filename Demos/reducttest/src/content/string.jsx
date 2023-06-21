import React, { Component } from 'react';
import { connect } from 'react-redux';

class String extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <h1>String:</h1>
                <h1>{this.props.string}</h1>
                <button onClick={() => this.props.add()}>add</button>
                <button onClick={() => this.props.sub()}>sub</button>
            </React.Fragment>
        );
    }
}
 
const mapStateToProps = (state, props) =>{
    return {
        string: state.string
    }
};

const mapDispatchToProps = {
    add: () => {
        return {
            type: "add"
        }
    },
    sub: () => {
        return {
            type: "sub"
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(String);