import React, { Component } from 'react';
import Boxes from './Boxes';
class Navbar extends Component {
    state = { 
        boxes: [
            {id: 1, x: 1},
            {id: 2, x: 2},
            {id: 3, x: 3},
            {id: 4, x: 4},
        ],
    } 

    clickForRightMove = (box, step) => {
        const boxes = [...this.state.boxes];
        let indexOfBox = this.state.boxes.indexOf(box);
        boxes[indexOfBox].x++;
        this.setState({
            boxes
        })
    }

    clickForLeftMove = (box, tep) => {
        const boxes = [...this.state.boxes];
        let indexOfBox = this.state.boxes.indexOf(box);
        boxes[indexOfBox].x--;
        this.setState({
            boxes
        })
    }

    handleDel = (box) => {
        const boxes = this.state.boxes.filter(nowbox => (nowbox !== box));
        this.setState({
            boxes
        })
    }
    clickForReset = () => {
        const boxes = this.state.boxes.map(
            box => {
                return {
                    id: box.id,
                    x: 0
                };
            }
        )
        this.setState({
            boxes
        })
    }
    render() { 
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">{this.state.boxes.filter(box => box.x !== 0).length}</a>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>
                <Boxes
                    boxes={this.state.boxes}
                    handleDel={this.handleDel}
                    clickForRightMove={this.clickForRightMove}
                    clickForLeftMove={this.clickForLeftMove}
                    clickForReset={this.clickForReset}
                >
                </Boxes>
            </React.Fragment>
        );
    }
}
 
export default Navbar;