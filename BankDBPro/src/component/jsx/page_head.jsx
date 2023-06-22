import React, { Component } from 'react';
import CleanLink from './clean_link';
class PageHead extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className="container rounded-4 my-3 p-2 bg-primary-subtle" style={{backgroundColor: "#D0E2FF"}}>
                    <div className="row justify-content-between align-items-center">
                        <div className='col-md-2 text-center'>
                            <CleanLink to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="mx-0 bi bi-piggy-bank" viewBox="0 0 16 16">
                                        <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z"/>
                                        <path fillRule="evenodd" d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z"/>
                                </svg>
                            </CleanLink>
                        </div>
                        <div className='col-md-2 text-center me-auto'>
                            <CleanLink to="/">
                                <h2 className='logo-statement fw-bold mb-0 '>BankDBPro</h2>
                            </CleanLink>
                        </div>
                        <div className='col-md-8 text-center flex-columm g-3 mb-3'>
                            <h4 className='mb-0 fw-lighter'>
                                24小时
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clock-fill mb-1 mx-2" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                </svg>
                                会员专线：400-1234-567
                            </h4>
                        </div>
                        <div className='row'>
                            <form className="col-md-10 d-flex m-auto" role="search">
                                    <input className="form-control mx-1" type="search" placeholder="搜索您需要的服务" aria-label="Search"></input>
                                    <button className="btn btn-sm btn-danger mx-1" type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                    </button>
                            </form>
                            <form className="col-md-2 d-flex justify-content-center g-1">
                                <button className="btn btn-sm btn-outline-success mx-2" type="button">
                                    <CleanLink to="/login">登录</CleanLink>
                                </button>
                                <button className="btn btn-sm btn-outline-success mx-2" type="button">
                                    <CleanLink to="/register">注册</CleanLink>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <hr className="border border-dark border-3 opacity-75"></hr>
            </React.Fragment>
        );
    }
}
 
export default PageHead;