import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../../css/SideBar/SideBar.css'

export default class Login extends Component {
    render() {
        return (
            <div className='login-container'>
                <h2>Login</h2>
                <div className='login-content'>
                    <h4>Email</h4>
                    <Form.Control />
                    <div className='vertical-spacer'></div>
                    <h4>Password</h4>
                    <Form.Control />
                </div>
                <div style={{height: '2em'}}></div>
                <Link to='/home'>
                    <Button>Sign In</Button>
                </Link>
                <div className='login-redirect'>
                    <Link to='/register' className='redirect-link'>New User?</Link>
                </div>
            </div>
        )
    }
}
