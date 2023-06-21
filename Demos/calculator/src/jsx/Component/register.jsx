import React, { Component } from 'react';
import $ from "jquery"
class Register extends Component {
    state = { 
        errorMessage: "",
        userName: "",
        passWord: "",
        checkPassWord: ""
    } 
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        if(this.state.userName === ""){
            this.setState({
                errorMessage: "Username can't be empty!"
            });
        } else if(this.state.passWord === ""){
            this.setState({
                errorMessage: "Password can't be empty!"
            })
        } else if(this.state.passWord !== this.state.checkPassWord){
            this.setState({
                errorMessage: "Passwords are different!"
            })
        } else {
            // $.ajax({
            //     url: "https://app165.acapp.acwing.com.cn/calculator/register/",
            //     type: "get",
            //     data: {
            //         username: this.state.userName,
            //         password: this.state.passWord,
            //         password_confirm: this.state.checkPassWord
            //     },
            //     dataType: "json",
            //     success: resp => {
            //         console.log(resp);
            //         if(resp.result === "success") {
            //             window.location.href="/"
            //         } else {
            //             this.setState({
            //                 errorMessage: resp.result
            //             })
            //         }
            //     }
            // })
        }
        
    }
    render() { 
        return (
            <React.Fragment>
                <form>
                <div className="mb-3">
                    <label htmlFor="Username" className="form-label">Username</label>
                    <input onChange={(e) => {this.setState({userName: e.target.value})}} type="text" className="form-control" id="Username" aria-describedby="emailHelp"></input>
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={(e) => {this.setState({passWord: e.target.value})}} type="password" className="form-control" id="exampleInputPassword1"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={(e) => {this.setState({checkPassWord: e.target.value})}} type="password" className="form-control" id="exampleInputPassword1"></input>
                </div>
                <div style={{height:"2rem", color:"red"}}>
                    {this.state.errorMessage}
                </div>
                <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}
 
export default Register;