import React, { Component } from 'react'
import { Card, Accordion } from 'react-bootstrap';
import '../../../../css/MainContent/Home/List/List.css'
import ListItem from './ListItem';

export default class List extends Component {
    list = [
        {
            id: 1,
            title: 'Task 1',
            subtasks: [],
            dateCreated: '12/17/2020',
            timeCreated: '00:23:45', 
            priority: 0,
            status: 0
        },
        {
            id: 2,
            title: 'Task 2',
            subtasks: [
                {
                    id: 7,
                    title: 'Subtask 1',
                    subtasks: [],
                    dateCreated: '12/10/2020',
                    timeCreated: '23:10:05', 
                    priority: 1,
                    status: 1
                }
            ],
            dateCreated: '12/10/2020',
            timeCreated: '23:10:05', 
            priority: 1,
            status: 0
        },
        {
            id: 3,
            title: 'Task 3',
            subtasks: [],
            dateCreated: '12/05/2020',
            timeCreated: '05:13:58', 
            priority: 2,
            status: 0
        },
        {
            id: 4,
            title: 'Task 4',
            subtasks: [],
            dateCreated: '12/16/2020',
            timeCreated: '16:24:01', 
            priority: 3,
            status: 0
        },
        {
            id: 5,
            title: 'Task 5',
            subtasks: [
                {
                    id: 8,
                    title: 'Subtask 1',
                    subtasks: [],
                    dateCreated: '12/10/2020',
                    timeCreated: '23:10:05', 
                    priority: 1,
                    status: 0
                },
                {
                    id: 9,
                    title: 'Subtask 2',
                    subtasks: [],
                    dateCreated: '12/10/2020',
                    timeCreated: '23:10:05', 
                    priority: 2,
                    status: 1
                },
                {
                    id: 10,
                    title: 'Subtask 3',
                    subtasks: [],
                    dateCreated: '12/10/2020',
                    timeCreated: '23:10:05', 
                    priority: 3,
                    status: 0
                }
            ],
            dateCreated: '12/14/2020',
            timeCreated: '09:10:45', 
            priority: 0,
            status: 0
        },
        {
            id: 6,
            title: 'Task 6',
            subtasks: [],
            dateCreated: '12/05/2020',
            timeCreated: '03:00:15', 
            priority: 0,
            status: 0
        },
    ];

    render() {
        return (
            <Card className='list-container'>
                <Card.Header id='list-header'>
                    <h1>List Title</h1>
                    <span>Add +</span>
                </Card.Header>
                <Accordion className='list-content-container'>
                    {this.list.map((item) => {
                        return <ListItem key={item.id} item={item} />
                    })}
                </Accordion>
            </Card>
        )
    }
}
