import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
class Box extends Component {
    state = {  
        x: 1
    } 

    rightMove = (step) => {
        this.setState(
            {x: this.state.x + step}
        )
    }

    leftMove = (step) => {
        this.setState(
            {x: this.state.x - step}
        )
    }

    render() {
        return (
            <React.Fragment>
                <div style={this.getStyles()}>
                    {this.toString()}
                </div>
                <button onClick={() => {this.leftMove(10)}} type="button" className="btn btn-primary m-2">
                    left
                 </button>
                 <button onClick={() => {this.rightMove(10)}} type="button" className="btn btn-primary m-2">
                    right
                 </button>
            </React.Fragment>
        );
    }
    getStyles(){
        let styles = {
            width: "50px",
            height: "50px",
            backgroundColor: "lightgreen" ,
            marginLeft: `${this.state.x}px`,
            textAlign: "center",
            lineHeight: "50px"
        };
        if(this.state.x === 0){
            styles.backgroundColor = "pink";
        }
        return styles;
    }
    toString(){
        const {x} = this.state;
        return `x : ${x}`;
    }
}
 
export default Box;