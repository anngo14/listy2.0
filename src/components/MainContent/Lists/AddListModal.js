import axios from 'axios';
import React from 'react'
import { Component } from 'react'
import { Modal, Button, Form, ListGroup } from 'react-bootstrap'
import uuid from 'react-uuid'

export default class AddListModal extends Component {
    state = {
        title: '',
        priority: 1,
        task: '',
        list: [],
        errorRender: null
    };
    validate(){
        if(this.state.title.length === 0) return false;
        return true;
    }
    addToList = () => {
        if(this.validate()){
            this.setState({
                title: '',
                priority: 1,
                task: '',
                list: []
            });
            let list = {
                id: uuid(),
                title: this.state.title,
                list: this.state.list,
                complete: []
            };
            axios.post('http://localhost:5000/api/addList', {
                email: localStorage.getItem("email"),
                list: list
            })
            .then((res) => {
                this.props.add(list);
                this.props.onHide();
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
    handleTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }
    handlePriority = (e) => {
        this.setState({
            priority: e.target.value
        });
    }
    handleTask = (e) => {
        this.setState({
            task: e.target.value
        });
    }
    handleTaskKeyPress = (e) => {
        if(e.key === 'Enter'){
            this.addTask();
        }
    }
    handleTitleKeyPress = (e) => {
        if(e.key === 'Enter'){
            this.addToList();
        }
    }
    addTask = () => {
        let d = new Date();
        let copy = this.state.list;
        let task = {
            id: uuid(),
            priority: this.state.priority,
            title: this.state.task,
            subtasks: [],
            dateCreated: (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear(),
            timeCreated: d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
            status: 0
        };
        copy.push(task);
        this.setState({
            task: '',
            priority: 1,
            list: copy
        });
    }
    deleteTask = (task) => {
        let copy = this.state.list;
        let index = this.getIndex(task.id);
        if(index === -1) return;
        copy.splice(index, 1);
        this.setState({
            list: copy
        });
    }
    updateTask = (task) => {
        let copy = this.state.list;
        let index = this.getIndex(task.id);
        if(index === -1) return;
        copy[index] = task;
        this.setState({
            list: copy
        });
    }
    getIndex(id){
        for(let i = 0; i < this.state.list.length; i++){
            if(this.state.list[i].id === id) return i;
        }
        return -1;
    }
    render(){
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add a New List
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.errorRender}
                    <Form.Control placeholder='Title' size='lg' value={this.state.title} onChange={this.handleTitle} onKeyPress={this.handleTitleKeyPress} />
                    <div className='add-list-subheader'>
                        <h4>Tasks</h4>
                    </div>
                    <div className='add-list-row'>
                        <Form.Control as='select' value={this.state.priority} onChange={this.handlePriority} className='add-list-priority'>
                            <option value='2'>High</option>
                            <option value='1'>Normal</option>
                            <option value='0'>Low</option>
                        </Form.Control>
                        <div className='small-spacer'></div>
                        <Form.Control placeholder='Task' value={this.state.task} onChange={this.handleTask} className='add-list-input' onKeyPress={this.handleTaskKeyPress} />
                        <div className='small-spacer'></div>
                        <Button variant='outline-secondary' onClick={this.addTask} className='add-list-btn'>Add a List Task +</Button>
                    </div>
                    <ListGroup className='add-list-task-container'>
                        {this.state.list.map((item) => {
                            let deleteItem = (e) => {
                                e.preventDefault();
                                this.deleteTask(item);
                            };
                            let update = (e) => {
                                let copy = item;
                                copy.title = e.target.value;
                                this.updateTask(copy);
                            };
                            return (
                                <div key={item.id} className='add-list-row add-list-task'>
                                    <Form.Control value={item.title} onChange={update} />
                                    <div className='small-spacer'></div>
                                    <Button onClick={deleteItem} variant='danger' className='delete-list-btn'>Delete</Button>
                                </div>
                            )
                        })}
                    </ListGroup>
                    <Button onClick={this.addToList}>Submit</Button>
                </Modal.Body>
            </Modal>
        )
    }
    
}
