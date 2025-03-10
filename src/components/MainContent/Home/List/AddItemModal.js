import React from 'react'
import { Component } from 'react';
import { Form, Modal, Button, ListGroup } from 'react-bootstrap'
import uuid from 'react-uuid'
import '../../../../css/MainContent/Home/List/AddModal.css'
import SublistItem from './SublistItem'

export default class AddItemModal extends Component {
    state = {
        title: '',
        subtasks: [],
        subtask: '',
        priority: 1,
        errorRender: null
    }

    getIndex(task){
        for(let i = 0; i < this.state.subtasks.length; i++){
            if(this.state.subtasks[i].id === task.id) return i;
        }
        return -1;
    }
    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleSubtaskChange = (e) => {
        this.setState({
            subtask: e.target.value
        });
    }
    handleSubTaskItemChange = (task) => {
        let index = this.getIndex(task.id);
        if(index === -1) return;
        let copy = this.state.subtasks;
        copy[index] = task;
        this.setState({
            subtasks: copy
        });
    }
    handlePriorityChange = (e) => {
        this.setState({
            priority: parseInt(e.target.value)
        });
    }
    handleTitleKeyPress = (e) => {
        if(e.key === 'Enter'){
            this.addItem();
        }
    }
    handleSubtaskKeyPress = (e) => {
        if(e.key === 'Enter'){
            this.addSubTask();
        }
    }
    addSubTask = () => {
        if(this.validateSubitem()){
            this.setState({
                subtasks: [...this.state.subtasks, { id: uuid(), title: this.state.subtask, status: 0 }],
                subtask: ''
            });
        }
    };
    deleteSubTask = (task) => {
        let index = this.getIndex(task);
        if(index === -1) return;
        let copy = this.state.subtasks;
        copy.splice(index, 1);
        this.setState({
            subtasks: copy
        });
    }
    validateSubitem(){
        if(this.state.subtask.length === 0) return false;
        return true;
    }
    validateItem(){
        if(this.state.title.length === 0) return false;
        return true;
    }
    addItem = () => {
        if(this.validateItem()){
            let d = new Date();
            let month = d.getMonth() + 1;
            let date = d.getDate();
            let year = d.getFullYear();
    
            this.props.add({
                id: uuid(),
                title: this.state.title, 
                subtasks: this.state.subtasks,
                priority: this.state.priority,
                dateCreated: month + '/' + date + '/' + year,
                timeCreated: d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
                status: 0
            });
            this.setState({
                title: '',
                subtasks: [],
                subtask: '',
                priority: 1,
                errorRender: null
            });
        } else{
            this.setState({
                errorRender: (
                    <div>
                        <span>Empty Title!</span>
                        <div className='vertical-spacer'></div>
                    </div>
                )
            })
        }
    }

    render(){
        return (
            <Modal centered show={this.props.show} onHide={this.props.onHide} style={{cursor:'default'}}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.errorRender}
                    <Form>
                        <Form.Control size='lg' placeholder='Title' id='add-title-input' value={this.state.title} onChange={this.handleTitleChange} onKeyPress={this.handleTitleKeyPress} />
                        <div className='add-item-subheader'>
                            <h4>Priority</h4>
                        </div>
                        <Form.Group>
                            <Form.Control as='select' size='lg' value={this.state.priority} onChange={this.handlePriorityChange}>
                                <option value='2'>High</option>
                                <option value='1'>Normal</option>
                                <option value='0'>Low</option>
                            </Form.Control>
                        </Form.Group>
                        <div className='add-item-subheader'>
                            <h4>Sub-Tasks</h4>
                        </div>
                        <div id='add-subtasks-row'>
                            <Form.Control placeholder='Sub-Task' id='add-subtasks-input' value={this.state.subtask} onChange={this.handleSubtaskChange} onKeyPress={this.handleSubtaskKeyPress} />
                            <div className='small-spacer'></div>
                            <Button variant='outline-secondary' id='add-subtasks-btn' onClick={this.addSubTask}>Add a Sub-Task +</Button>
                        </div>
                        <ListGroup id='add-subtasks-list'>
                            {this.state.subtasks.map((item) => {
                                return <SublistItem item={item} key={item.id} delete={this.deleteSubTask} change={this.handleSubTaskItemChange} />
                            })}
                        </ListGroup>
                        <Button variant='primary' onClick={this.addItem}>Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}
