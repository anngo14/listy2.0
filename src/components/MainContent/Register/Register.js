import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Register extends Component {
    render() {
        return (
            <div className='register-container'>
                <h2>Register</h2>
                <div className='register-content'>
                    <h4>Email</h4>
                    <Form.Control />
                    <div className='vertical-spacer'></div>
                    <h4>Password</h4>
                    <Form.Control />
                    <div className='vertical-spacer'></div>
                    <h4>Confirm Password</h4>
                    <Form.Control />
                </div>
                <div style={{height: '2em'}}></div>
                <Button>Create Account</Button>
                <div className='login-redirect'>
                    <Link to='/login' className='redirect-link'>Already Have an Account?</Link>
                </div>
            </div>
        )
    }
}
