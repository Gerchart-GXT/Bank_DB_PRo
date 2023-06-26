import React, { Component } from 'react';

class PageTail extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <section className="p-5">
                    <div className="container">
                        <h2 className="text-center mb-4">联系我们</h2>

                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">电话：120XXXXXX</li>
                            <li className="list-group-item">邮箱： xxxxxxx@xxx.com</li>
                            <li className="list-group-item">地址：江苏省南京市江宁区佛城西路8号</li>
                        </ul>
                    </div>
                </section>

                <footer className="p-5 bg-dark text-white text-center">
                    <div className="container">
                        <p className="lead">Copyright &copy; 2023 BankDBPro</p>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}
 
export default PageTail;