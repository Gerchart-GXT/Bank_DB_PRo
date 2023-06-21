import React, { Component } from 'react';
import Base from './base';
import "../../css/calculator.css"
import 'bootstrap/dist/css/bootstrap.css'
import CalButton from './cal-button';
import { connect } from 'react-redux';
class Calculator extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Base>
                    <h3 className='mb-0'>Calculator</h3>
                    <Base className="calculator">
                        <div className="output">
                            <div className="last-output">{this.props.lastOperand} {this.props.operator}</div>
                            <div className="now-output">{this.props.currentOperand}</div>
                        </div>
                        <div className="keyboard">
                            <div className="button-line">
                                <CalButton val={"AC"} className={"AC-key"}></CalButton>
                                <CalButton val={"BackSpace"}></CalButton>
                                <CalButton val={"*"}></CalButton>
                            </div>
                            <div className="button-line">
                                <CalButton val={"7"}></CalButton>
                                <CalButton val={"8"}></CalButton>
                                <CalButton val={"9"}></CalButton>
                                <CalButton val={"/"}></CalButton>
                            </div>
                            <div className="button-line">
                                <CalButton val={"4"}></CalButton>
                                <CalButton val={"5"}></CalButton>
                                <CalButton val={"6"}></CalButton>
                                <CalButton val={"-"}></CalButton>
                            </div>
                            <div className="button-line">
                                <CalButton val={"1"}></CalButton>
                                <CalButton val={"2"}></CalButton>
                                <CalButton val={"3"}></CalButton>
                                <CalButton val={"+"}></CalButton>
                            </div>
                            <div className="button-line">
                                <CalButton val={"0"}></CalButton>
                                <CalButton val={"."}></CalButton>
                                <CalButton val={"="} className={"button-key equal-key"}></CalButton>
                            </div>
                        </div>
                    </Base>
                </Base>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        currentOperand: state.currentOperand,
        lastOperand: state.lastOperand,
        operator: state.operator
    }
};
 
export default connect(mapStateToProps)(Calculator);