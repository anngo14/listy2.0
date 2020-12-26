import axios from 'axios'
import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import '../../../css/SideBar/SideBar.css'

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        errorMsg: null
    }
    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }
    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    login = () => {
        axios.post('http://localhost:5000/api/login', {
            email: this.state.email,
            pass: this.state.password
        })
        .then((res) => {
            if(res.data.status === "Invalid Password"){
                this.setState({
                    errorMsg: (
                        <span>Invalid Password! Please Try Again</span>
                    )
                });
            } else if(res.data.status === "Invalid Email"){
                this.setState({
                    errorMsg: (
                        <span>No Account Found with this Email! Please Try Again</span>
                    )
                });
            } else{
                window.localStorage.setItem("token", res.data.token);
                window.localStorage.setItem("email", this.state.email);
                this.props.login();
                this.setState({
                    errorMsg: (
                        <Redirect to='/home' />
                    )
                });
            }
        });
    }
    render() {
        return (
            <div className='login-container'>
                <h2>Login</h2>
                {this.state.errorMsg}
                <div className='login-content'>
                    <h4>Email</h4>
                    <Form.Control value={this.state.email} onChange={this.handleEmail} />
                    <div className='vertical-spacer'></div>
                    <h4>Password</h4>
                    <Form.Control type='password' value={this.state.password} onChange={this.handlePassword} />
                </div>
                <div style={{height: '2em'}}></div>
                <Button onClick={this.login}>Sign In</Button>
                <div className='login-redirect'>
                    <Link to='/register' className='redirect-link'>New User?</Link>
                </div>
            </div>
        )
    }
}
