import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom';
class Web extends Component {
    state = {
        web: [
            {id: 1, title: 1},
            {id: 2, title: 2},
            {id: 3, title: 3},
            {id: 4, title: 4},
            {id: 5, title: 5},
        ]
    } 
    render() { 
        return (
            <React.Fragment>
                <h1>Web</h1>
                <hr></hr>
                <div>
                    {
                        this.state.web.map(page => (
                            <div key={page.id}>
                                <Link to={`/web/page?chapter=${page.id}`}>{page.id + ". " + page.title}</Link>
                            </div>
                        ))
                    }
                </div>
            </React.Fragment>
        );
    }
}
 
export default Web;