import React from 'react'
import { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import '../../../css/MainContent/Settings/Settings.css'
import ConfirmModal from './ConfirmModal';

export default class Settings extends Component {
    state = {
        original: this.props.name,
        name: this.props.name,
        newPassword: '',
        confirmPassword: '',
        confirmModal: false,
        confirmModalMsg: '',
        confirmModalType: null
    }
    showConfirmModal = () => {
        this.setState({
            confirmModal: true
        });
    }
    hideConfirmModal = () => {
        this.setState({
            confirmModal: false
        });
    }
    handleName = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    handleNewPassword = (e) => {
        this.setState({
            newPassword: e.target.value
        });
    }
    handleConfirm = (e) => {
        this.setState({
            confirmPassword: e.target.value
        });
    }
    updateName = () => {
        let name = this.state.name;
        this.props.updateName(name);
        this.setState({
            original: name
        });
    }
    deleteAccount = () => {
        this.setState({
            confirmModal: true,
            confirmModalMsg: 'Are you sure you want to delete your account? This action cannot be undone.',
            confirmModalType: 'delete'
        });
    }
    saveSettings = () => {
        this.setState({
            confirmModal: true,
            confirmModalMsg: 'Do you want to save these settings?',
            confirmModalType: 'save'
        });
    }
    confirm = (state) => {
        if(state){
            if(this.state.confirmModalType === 'save'){
                this.updateName();
            } else if(this.state.confirmModalType === 'delete'){
                
            }
        } else{
            if(this.state.confirmModalType === 'save'){
                this.setState({
                    name: this.state.original
                });
            }
        }
    }
    render(){
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
                                    <option>Default</option>
                                    <option>Robot</option>
                                </Form.Control>
                            </div>
                            <h4>Change Display Name</h4>
                            <div className='settings-subcontent'>
                                <Form.Control value={this.state.name} onChange={this.handleName}/>
                            </div>
                        </div>
                    </div>
                    <div className='settings-section'>
                        <h3>Account</h3>
                        <div className='settings-content'>
                            <h4>Change Password</h4>
                            <div className='settings-subcontent'>
                                <h5>New Password</h5>
                                <Form.Control value={this.state.newPassword} onChange={this.handleNewPassword} />
                                <h5 style={{marginTop: '1em'}}>Confirm New Password</h5>
                                <Form.Control value={this.state.confirmPassword} onChange={this.handleConfirm} />
                            </div>
                            <h4>Delete Account</h4>
                            <div className='settings-subcontent'>
                                <Button variant='danger' onClick={this.deleteAccount}>Delete Account</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Button onClick={this.saveSettings}>Save Changes</Button>
                <ConfirmModal show={this.state.confirmModal} onHide={this.hideConfirmModal} msg={this.state.confirmModalMsg} confirm={this.confirm} />
            </div>
        )
    }
    
}
