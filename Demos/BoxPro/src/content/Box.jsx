import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
class Box extends Component {

    clickForDel = (box) => {
        this.props.handleDel(box);
    }

    render() {
        return (
            <React.Fragment>
                {this.props.children}
                <div style={this.getStyles()}>
                    {this.toString()}
                </div>
                <button onClick={() => {this.props.clickForLeftMove(this.props.box, 1)}} type="button" className="btn btn-primary m-2">
                    left
                 </button>
                 <button onClick={() => {this.props.clickForRightMove(this.props.box, 1)}} type="button" className="btn btn-primary m-2">
                    right
                 </button>
                 <button onClick={() => {this.clickForDel(this.props.box)}} type="button" className="btn btn-danger m-2">
                    del
                 </button>
            </React.Fragment>
        );
    }
    getStyles(){
        let styles = {
            width: "50px",
            height: "50px",
            backgroundColor: "lightgreen" ,
            marginLeft: `${this.props.box.x}px`,
            textAlign: "center",
            lineHeight: "50px"
        };
        if(this.props.box.x === 0){
            styles.backgroundColor = "pink";
        }
        return styles;
    }
    toString(){
        return `x : ${this.props.box.x}`;
    }
}
 
export default Box;