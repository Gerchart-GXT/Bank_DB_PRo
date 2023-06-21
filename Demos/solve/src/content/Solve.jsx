import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
class Solve extends Component {
    static id = 0
    state = {
        solutions: [
            {number: 1, title: "tmp", views: 1},
            {number: 2, title: "tmp", views: 2},
            {number: 3, title: "tmp", views: 3},
            {number: 4, title: "tmp", views: 4},
            {number: 5, title: "tmp", views: 5},
            {number: 6, title: "tmp", views: 6},
            {number: 7, title: "tmp", views: 7},
            {number: 8, title: "tmp", views: 8},
            {number: 9, title: "tmp", views: 9},
            {number: 10, title: "tmp", views: 10},
        ]
    } 

    handleDel = (solution) =>{
        const solutions = [...this.state.solutions, 
            {number: this.state.solutions[this.state.solutions.length - 1].number + 1, title: "tmp", views: 10}
        ];
        console.log(this.state.solutions[this.state.solutions.length - 1].number);
        this.setState({
            solutions
        });
    }

    render() { 
        if(this.state.solutions.length === 0){
            return(
                <React.Fragment>
                    <div>None</div>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">首页</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" aria-current="page" href="#">个人</a>
                            <a className="nav-link" href="#">理财</a>
                            <a className="nav-link" href="#">保险</a>
                            <a className="nav-link disabled">基金</a>
                        </div>
                        </div>
                    </div>
                </nav>
                <table className="table">
                    <thead>
                        <tr>
                            <th>number</th>
                            <th>title</th>
                            <th>views</th>
                            <th>ops</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.solutions.map(solve => (
                                <tr key={solve.number}>
                                    <td>{solve.number}</td>
                                    <td>{solve.title}</td>
                                    <td>{solve.views}</td>
                                    <td>
                                        <button onClick={() => this.handleDel(solve)} className="btn btn-danger">Del</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
 
export default Solve;