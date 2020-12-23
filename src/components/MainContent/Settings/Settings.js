import React from 'react'
import { Form, Button } from 'react-bootstrap'
import '../../../css/MainContent/Settings/Settings.css'

export default function Settings() {
    return (
        <div>
            <h1 className='content-title'>Settings</h1>
            <div id='settings-container'>
                <div className='settings-section'>
                    <h3>User</h3>
                    <div className='settings-content'>
                        <h4>Change Avatar</h4>
                        <div className='settings-subcontent'>
                            <Form.Control as='select'>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Form.Control>
                        </div>
                        <h4>Change Display Name</h4>
                        <div className='settings-subcontent'>
                            <Form.Control />
                        </div>
                    </div>
                </div>
                <div className='settings-section'>
                    <h3>Account</h3>
                    <div className='settings-content'>
                        <h4>Change Password</h4>
                        <div className='settings-subcontent'>
                            <h5>New Password</h5>
                            <Form.Control />
                            <h5 style={{marginTop: '1em'}}>Confirm New Password</h5>
                            <Form.Control />
                        </div>
                        <h4>Delete Account</h4>
                        <div className='settings-subcontent'>
                            <Button variant='danger'>Delete Account</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Button>Save Changes</Button>
        </div>
    )
}
