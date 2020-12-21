import React, { Component } from 'react'
import { Card, Accordion, Button, Form } from 'react-bootstrap'
import EditItemModal from './EditItemModal';

export default class ListItem extends Component {
    state = {
        editModal : false
    }
    getIndex(id){
        for(let i = 0; i < this.props.item.subtasks.length; i++){
            if(this.props.item.subtasks[i].id === id) return i;
        }
        return -1;
    }
    showEditModal = () => {
        this.setState({
            editModal: true
        });
    }
    hideEditModal = () => {
        this.setState({
            editModal: false
        });
    }
    deleteItem = (item) => {
        this.props.delete(item);
    }
    updateItem = (item) => {
        this.props.update(item);
        this.hideEditModal();
    }
    updateSublist = (e) => {
        let copy = this.props.item;
        let array = copy.subtasks;
        let index = this.getIndex(e.target.value);
        if(index === -1) return;
        array[index].status = e.target.checked ? 1 : 0;
        this.updateItem(copy);
    }
    completeItem = () => {
        this.props.complete(this.props.item);
    }
    render() {
        let detailed;
        if(this.props.item.subtasks.length === 0 || this.props.item.subtasks === undefined){
            detailed = (
                <div className='list-item-content-header'>
                    <div className='list-item-created'>
                        <h6>Date Created: </h6>
                        <div className='small-spacer'></div>
                        <span>{this.props.item.dateCreated}</span>
                    </div>
                </div>
            );
        } else{
            detailed = (
                <div className='list-item-content-header'>
                    <h6>Sub-Tasks</h6>
                    <div className='list-item-created'>
                        <h6>Date Created: </h6>
                        <div className='small-spacer'></div>
                        <span>{this.props.item.dateCreated}</span>
                    </div>
                </div>
            );
        }
        let priority;
        if(this.props.item.priority === 0){
            priority = <div className='list-item-priority' style={{backgroundColor: '#EBEDEF'}}></div>
        } else if(this.props.item.priority === 1){
            priority = <div className='list-item-priority' style={{backgroundColor: '#93D8EE'}}></div>
        } else{
            priority = <div className='list-item-priority' style={{backgroundColor: '#FE7979'}}></div>
        }
        return (
            <Card>
                <Accordion.Toggle className='list-item-header' as={Card.Body} eventKey={this.props.item.id}>
                    <div className='list-item-header-title'>
                        {priority}
                        <div className='small-spacer'></div>
                        <div className='small-spacer'></div>
                        <h3>{this.props.item.title}</h3>
                    </div>
                    <div className='list-item-actions'>
                        <Button className='list-item-btn' variant='outline-success' onClick={this.completeItem}>Mark Complete</Button>
                    </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={this.props.item.id}>
                    <Card.Body>
                        <div className='list-item-action-row'>
                            <Button variant='info' onClick={this.showEditModal} className='list-item-btn'>Edit</Button>
                        </div>
                        {detailed}
                        {this.props.item.subtasks.map((sub) => {
                            return (
                                <div className='sublist-item' key={sub.id}>
                                    <div className='sublist-header'>
                                        <Form>
                                            <Form.Check type='checkbox' value={sub.id} checked={sub.status === 1 ? true: false} onChange={this.updateSublist} />
                                        </Form>
                                        <div className='small-spacer'></div>
                                        <span>{sub.title}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </Card.Body>
                </Accordion.Collapse>
                <EditItemModal show={this.state.editModal} onHide={this.hideEditModal} item={this.props.item} delete={this.deleteItem} update={this.updateItem}/>
            </Card>
        )
    }
}
