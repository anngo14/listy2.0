import React from 'react'
import '../../../css/MainContent/Settings/Settings.css'

export default function Settings() {
    return (
        <div>
            <h1 className='content-title'>Settings</h1>
            <div id='settings-container'>
                <div className='settings-section'>
                    <h4>User</h4>
                    <div className='settings-content'>
                        <span>Change Avatar</span>
                        <span>Change Display Name</span>
                    </div>
                </div>
                <div className='settings-section'>
                    <h4>Account</h4>
                    <div className='settings-content'>
                        <span>Change Password</span>
                        <span>Delete Account</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
