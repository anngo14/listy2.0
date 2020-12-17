import React, { Component } from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import '../../../../css/MainContent/Home/List/List.css'
import ListItem from './ListItem';

export default class List extends Component {
    list = [
        {
            id: 1,
            title: 'task 1',
            state: 0
        },
        {
            id: 2,
            title: 'task 2',
            state: 1
        },
        {
            id: 3,
            title: 'task 3',
            state: 0
        },
        {
            id: 4,
            title: 'task 4',
            state: 2
        },
        {
            id: 5,
            title: 'task 5',
            state: 1
        },
        {
            id: 6,
            title: 'task 6',
            state: 2
        },
    ];

    render() {
        return (
            <Card className='list-container'>
                <Card.Header className='list-header'>
                    <h1>List Title</h1>
                    <span>Add +</span>
                </Card.Header>
                <ListGroup variant='flush' className='list-content-container'>
                    {this.list.map((item) => {
                        return (
                            <ListGroup.Item>
                                <ListItem title={item.title} key={item.id} />
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Card>
        )
    }
}
