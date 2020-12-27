import axios from 'axios';
import React from 'react'
import { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import '../../../css/MainContent/Settings/Settings.css'
import ConfirmModal from './ConfirmModal';

export default class Settings extends Component {
    state = {
        original: this.props.name,
        name: this.props.name,
        avatar: 0,
        newPassword: '',
        confirmPassword: '',
        confirmModal: false,
        confirmModalMsg: '',
        confirmModalType: null,
        redirect: null,
        errorRender: null
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
    handleAvatar = (e) => {
        this.setState({
            avatar: parseInt(e.target.value)
        });
    }
    validateName(){
        if(this.state.name.length === 0) return false;
        return true;
    }
    updateName = () => {
        if(this.validateName()){
            let name = this.state.name;
            axios.post('http://localhost:5000/api/updateUser', {
                email: localStorage.getItem("email"),
                name: name
            })
            .then((res) => {
                if(res.data.status === 200){
                    this.props.updateName(name);
                    this.setState({
                        original: name
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        } else{
            this.setState({
                name: this.state.original
            });
        }
    }
    deleteAccount = () => {
        this.setState({
            confirmModal: true,
            confirmModalMsg: 'Are you sure you want to delete your account? This action cannot be undone.',
            confirmModalType: 'delete'
        });
    }
    updatePassword = () => {
        axios.post('http://localhost:5000/api/changePassword', {
            email: localStorage.getItem("email"),
            pass: this.state.newPassword
        })
        .then((res) => {
            console.log(res);
            if(res.data.status === 200){
                this.setState({
                    newPassword: '',
                    confirmPassword: ''
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
    validatePassword(){
        if(this.state.newPassword.length < 8 || this.state.newPassword !== this.state.confirmPassword) return false;
        return true;
    }
    changePassword = () => {
        if(this.validatePassword()){
            this.setState({
                confirmModal: true, 
                confirmModalMsg: 'Are you sure you want to change your password?',
                confirmModalType: 'password'
            });
        } else{
            this.setState({
                errorRender: (
                    <div>
                        <span>Error Detected! Passwords must match and be at least 8 characters long</span>
                        <div className='vertical-spacer'></div>
                    </div>
                )
            })
        }
    }
    delete = () => {
        axios.post('http://localhost:5000/api/deleteAccount', {
            email: localStorage.getItem("email")
        })
        .then((res) => {
            if(res.data.status === 200){
                this.setState({
                    redirect: (
                        <Redirect to='/login' />
                    )
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
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
                this.delete();
            } else if(this.state.confirmModalType === 'password'){
                this.updatePassword();
            }
        } else{
            if(this.state.confirmModalType === 'save'){
                this.setState({
                    name: this.state.original
                });
            } else if(this.state.confirmModalType === 'password'){
                this.setState({
                    newPassword: '',
                    confirmPassword: ''
                });
            }
        }
    }
    render(){
        return (
            <div>
                {this.state.redirect} 
                <h1 className='content-title'>Settings</h1>
                <div id='settings-container'>
                    <div className='settings-section'>
                        <h3>User</h3>
                        <div className='settings-content'>
                            <h4>Change Avatar</h4>
                            <div className='settings-subcontent'>
                                <Form.Control as='select' value={this.state.avatar} onChange={this.handleAvatar}>
                                    <option value='0'>Default</option>
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
                                {this.state.errorRender} 
                                <h5>New Password</h5>
                                <Form.Control type='password' value={this.state.newPassword} onChange={this.handleNewPassword} />
                                <h5 style={{marginTop: '1em'}}>Confirm New Password</h5>
                                <Form.Control type='password' value={this.state.confirmPassword} onChange={this.handleConfirm} />
                                <div className='vertical-spacer'></div>
                                <Button onClick={this.changePassword}>Change Password</Button>
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
