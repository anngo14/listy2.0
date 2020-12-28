import axios from 'axios'
import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Register extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        errorRender: null
    }
    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            this.register();
        }
    }
    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }
    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    }
    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    handleConfirm = (e) => {
        this.setState({
            confirmPassword: e.target.value
        });
    }
    validate(){
        if(!this.state.email.match(/.+@.+\..+/)) return false;
        if(this.state.username.length === 0) return false;
        if(this.state.password !== this.state.confirmPassword || this.state.password.length < 8) return false;
        return true;
    }
    register = () => {
        if(this.validate()){
            axios.post('http://localhost:5000/api/checkExistingUser', {
                email: this.state.email
            })
            .then((res) => {
                if(res.data.status === 404){
                    axios.post('http://localhost:5000/api/register', {
                        email: this.state.email,
                        pass: this.state.password,
                        username: this.state.username
                    })
                    .then((res) => {
                        this.props.history.push('/login');
                    });       
                } else{
                    this.setState({
                        errorRender: (
                            <span>Existing Account Found with this Email!</span>
                        )
                    })
                }
            });
        } else{
            this.setState({
                errorRender: (
                    <span>Invalid Format! Must be a valid email address and password must be at least 8 characters long. Please Try Again</span>
                )
            })
        }
    }
    render() {
        return (
            <div className='register-container'>
                <h2>Register</h2>
                {this.state.errorRender} 
                <div className='register-content'>
                    <h4>Email</h4>
                    <Form.Control value={this.state.email} onChange={this.handleEmail} onKeyDown={this.handleKeyDown} />
                    <div className='vertical-spacer'></div>
                    <h4>Username</h4>
                    <Form.Control value={this.state.username} onChange={this.handleUsername} onKeyDown={this.handleKeyDown} /> 
                    <div className='vertical-spacer'></div>
                    <h4>Password</h4>
                    <Form.Control type='password' value={this.state.password} onChange={this.handlePassword} onKeyDown={this.handleKeyDown} />
                    <div className='vertical-spacer'></div>
                    <h4>Confirm Password</h4>
                    <Form.Control type='password' value={this.state.confirmPassword} onChange={this.handleConfirm} onKeyDown={this.handleKeyDown} />
                </div>
                <div style={{height: '2em'}}></div>
                <Button onClick={this.register}>Create Account</Button>
                <div className='login-redirect'>
                    <Link to='/login' className='redirect-link'>Already Have an Account?</Link>
                </div>
            </div>
        )
    }
}
