import React, { Component } from 'react'
import { Modal, Form, Card, ListGroup, Button } from 'react-bootstrap'
import SublistItem from './SublistItem'
import '../../../../css/MainContent/Home/List/EditModal.css'

export default class EditItemModal extends Component {
    state = {
        item: this.props.item,
        subtask: ''
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
        copy.title = e.target.value;
        this.setState({
            item: copy
        });
    }
    handleSubtaskChange = (e) => {
        this.setState({
            subtask: e.target.value
        });
    }
    delete = (e) => {
        e.preventDefault();
        this.props.delete(this.state.item);
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
                            <Card id='edit-add-subtask-btn'>
                                <span>Add a Sub-Task +</span>
                            </Card>
                        </div>
                        <ListGroup id='edit-subtask-list'>
                            {this.state.item.subtasks.map((item) => {
                                return <SublistItem item={item} key={item.id}/>
                            })}
                        </ListGroup>
                        <div id='edit-item-actions'>
                            <Button variant='primary' type='submit'>Submit</Button>
                            <Button variant='danger' type='submit' onClick={this.delete}>Delete</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}
