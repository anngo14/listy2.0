import React, { Component } from 'react'
import {Card, Accordion } from 'react-bootstrap'

export default class ListItem extends Component {
    render() {
        return (
            <Card>
                <Accordion.Toggle className='list-item-header' as={Card.Body} eventKey={this.props.item.id}>
                    <h3>{this.props.item.title}</h3>
                    <div className='list-item-actions'>
                        <span>Edit</span>
                        <div className='small-spacer'></div>
                        <span>Mark Complete</span>
                    </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={this.props.item.id}>
                    <Card.Body>
                        <div className='list-item-content-header'>
                            <h6>Sub-Tasks</h6>
                            <div className='list-item-created'>
                                <h6>Date Created: </h6>
                                <div className='small-spacer'></div>
                                <span>{this.props.item.dateCreated}</span>
                            </div>
                        </div>
                        {this.props.item.subtasks.length === 0 && 
                            <span className='sublist-item'>N/A</span>
                        }
                        {this.props.item.subtasks.map((sub) => {
                            return (
                                <div className='sublist-item'>
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
            </Card>
        )
    }
}
