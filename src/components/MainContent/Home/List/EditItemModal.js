import React, { Component } from 'react'
import { Modal, Form, ListGroup, Button } from 'react-bootstrap'
import SublistItem from './SublistItem'
import uuid from 'react-uuid'
import '../../../../css/MainContent/Home/List/EditModal.css'

export default class EditItemModal extends Component {
    state = {
        item: this.props.item,
        subtask: ''
    }
    getId(task){
        for(let i = 0; i < this.state.item.subtasks.length; i++){
            if(this.state.item.subtasks[i].id === task.id) return i;
        }
        return -1;
    }
    handleTitleChange = (e) => {
        let copy = this.state.item;
        copy.title = e.target.value;
        this.setState({
            item: copy
        });
    }
    handlePriorityChange = (e) => {
        let copy = this.state.item;
        copy.priority = parseInt(e.target.value);
        this.setState({
            item: copy
        });
    }
    handleSubtaskChange = (e) => {
        this.setState({
            subtask: e.target.value
        });
    }
    addSubtask = () => {
        let copy = this.state.item;
        copy.subtasks.push({ id: uuid(), title: this.state.subtask, status: 0 });
        this.setState({
            item: copy,
            subtask: ''
        });
    }
    deleteSubtask = (subtask) => {
        let copy = this.state.item;
        let array = copy.subtasks;
        let index = this.getId(subtask);
        if(index === -1) return;
        array.splice(index, 1);
        copy.subtasks = array;
        this.setState({
            item: copy
        });
    }
    updateSubtask = (subtask) => {
        let copy = this.state.item;
        let array = copy.subtasks;
        let index = this.getId(subtask);
        if(index === -1) return;
        array[index] = subtask;
        copy.subtasks = array;
        this.setState({
            item: copy
        });
    }
    delete = (e) => {
        e.preventDefault();
        this.props.delete(this.state.item);
    }
    save = (e) => {
        e.preventDefault();
        this.props.update(this.state.item);
    }
    render() {
        return (
            <Modal centered show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control size='lg' placeholder='Title' id='edit-item-title' value={this.state.item.title} onChange={this.handleTitleChange}/>
                        <div className='edit-subheader'>
                            <h4>Priority</h4>
                        </div>
                        <Form.Group>
                            <Form.Control as='select' size='lg' value={this.state.item.priority} onChange={this.handlePriorityChange}>
                                <option value='2'>High</option>
                                <option value='1'>Normal</option>
                                <option value='0'>Low</option>
                            </Form.Control>
                        </Form.Group>
                        <div className='edit-subheader'>
                            <h4>Sub-Tasks</h4>
                        </div>
                        <div className='edit-add-subtask'>
                            <Form.Control placeholder='Sub-Task' id='edit-subtask-input' value={this.state.subtask} onChange={this.handleSubtaskChange}/>
                            <div className='small-spacer'></div>
                            <Button variant='outline-secondary' id='edit-add-subtask-btn' onClick={this.addSubtask}>Add a Sub-Task +</Button>
                        </div>
                        <ListGroup id='edit-subtask-list'>
                            {this.state.item.subtasks.map((item) => {
                                return <SublistItem item={item} key={item.id} delete={this.deleteSubtask} change={this.updateSubtask}/>
                            })}
                        </ListGroup>
                        <div id='edit-item-actions'>
                            <Button variant='primary' type='submit' onClick={this.save}>Submit</Button>
                            <Button variant='danger' type='submit' onClick={this.delete}>Delete</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}
