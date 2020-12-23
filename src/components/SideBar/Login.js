import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Login() {
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
