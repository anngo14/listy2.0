import React, { Component } from 'react'
import { Card, Accordion } from 'react-bootstrap'
import EditItemModal from './EditItemModal';

export default class ListItem extends Component {
    state = {
        editModal : false
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
        return (
            <Card>
                <Accordion.Toggle className='list-item-header' as={Card.Body} eventKey={this.props.item.id}>
                    <h3>{this.props.item.title}</h3>
                    <div className='list-item-actions'>
                        <span onClick={this.showEditModal}>Edit</span>
                        <div className='small-spacer'></div>
                        <span>Mark Complete</span>
                    </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={this.props.item.id}>
                    <Card.Body>
                        {detailed}
                        {this.props.item.subtasks.map((sub) => {
                            return (
                                <div className='sublist-item' key={sub.id}>
                                    <div className='sublist-header'>
                                        <input type='checkbox'/>
                                        <div className='small-spacer'></div>
                                        <span>{sub.title}</span>
                                    </div>
                                    <div className='sublist-actions'>
                                        <span>Edit</span>
                                        <div className='small-spacer'></div>
                                        <span>Delete</span>
                                    </div>
                                </div>
                            )
                        })}
                    </Card.Body>
                </Accordion.Collapse>
                <EditItemModal show={this.state.editModal} onHide={this.hideEditModal} item={this.props.item} delete={this.deleteItem}/>
            </Card>
        )
    }
}
