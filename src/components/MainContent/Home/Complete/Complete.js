import React, { Component } from 'react'
import { Card, Accordion } from 'react-bootstrap';
import '../../../../css/MainContent/Home/Complete/Complete.css'
import CompleteItem from './CompleteItem';

export default class Complete extends Component {
    complete = [
        {
            id: 1,
            title: 'Task 1',
            subtasks: [],
            dateCreated: '12/17/2020',
            timeCreated: '00:23:45', 
            dateCompleted: '12/17/2020',
            timeCompleted: '00:26:45', 
            priority: 0,
            status: 1
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
                    dateCompleted: '12/11/2020',
                    timeCompleted: '00:26:45', 
                    priority: 1,
                    status: 1
                }
            ],
            dateCreated: '12/10/2020',
            timeCreated: '23:10:05', 
            dateCompleted: '12/12/2020',
            timeCompleted: '00:26:45', 
            priority: 1,
            status: 1
        },
        {
            id: 3,
            title: 'Task 3',
            subtasks: [],
            dateCreated: '12/05/2020',
            timeCreated: '05:13:58', 
            dateCompleted: '12/06/2020',
            timeCompleted: '00:26:45', 
            priority: 2,
            status: 1
        },
    ];
    render() {
        return (
            <Card className='complete-container'>
                <h1 id='complete-header'>Completed Tasks</h1>
                <Accordion className='complete-list-container'>
                    {this.complete.map((item) => {
                        return <CompleteItem item={item} key={item.id}/>
                    })}
                </Accordion>
            </Card>
        )
    }
}
