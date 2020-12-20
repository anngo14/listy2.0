import React, { Component } from 'react'
import { Card, Accordion } from 'react-bootstrap';
import '../../../../css/MainContent/Home/Complete/Complete.css'
import CompleteItem from './CompleteItem';

export default class Complete extends Component {
    constructor(props){
        super(props);
        this.state = {
            complete: this.items
        };
    }
    items = [
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
        }
    ];
    
    
    getIndex(item){
        for(let i = 0; i < this.state.complete.length; i++){
            if(this.state.complete[i].id === item.id) return i;
        }
        return -1;
    }
    deleteItem = (item) => {
        let index = this.getIndex(item);
        if(index === -1) return;
        let copy = this.state.complete;
        copy.splice(index, 1);
        this.setState({
            complete: copy
        });
    }
    render() {
        return (
            <Card className='complete-container'>
                <div id='complete-header-container'>
                    <h1 id='complete-header'>Completed Tasks</h1>
                </div>
                <Accordion className='complete-list-container'>
                    {this.items.map((item) => {
                        return <CompleteItem item={item} key={item.id} delete={this.deleteItem} />
                    })}
                </Accordion>
            </Card>
        )
    }
}
