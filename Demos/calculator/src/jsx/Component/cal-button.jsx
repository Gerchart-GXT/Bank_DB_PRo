import React, { Component } from 'react';
import "../../css/calculator.css"
import { connect } from 'react-redux';
import ACTION from "../Redux/action"
class CalButton extends Component {
    render() { 
        return (
            <React.Fragment>
                <button onClick={() => {
                    switch(this.props.val) {
                        case "BackSpace": 
                            return this.props.delete_digit();
                        case "AC":
                            return this.props.clear();
                        case "+":
                            return this.props.evluate(this.props.val);
                        case "-":
                            return this.props.evluate(this.props.val);
                        case "*":
                            return this.props.evluate(this.props.val);
                        case "/":
                            return this.props.evluate(this.props.val);
                        case "=":
                            return this.props.evluate(this.props.val);
                        default:
                            return this.props.add_digit(this.props.val);
                    }
                }} className={`button-key ${this.props.className}`}>{this.props.val}</button>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = {
    add_digit: digit => {
        return {
            type: ACTION.ADD_DIGIT,
            digit: digit
        }
    },
    delete_digit: () => {
        return {
            type: ACTION.DELETE_DIGIT
        }
    },
    clear: () => {
        return {
            type: ACTION.CLEAR
        }
    },
    evluate: (digit) => {
        return {
            type: ACTION.EVALUATE,
            digit: digit
        }
    }
}
 
export default connect(null, mapDispatchToProps)(CalButton);