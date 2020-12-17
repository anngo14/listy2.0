import React, { Component } from 'react'
import '../../../css/MainContent/List/List.css'
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
            <div className='list-container'>
                <div className='list-header'>
                    <h1>List Title</h1>
                    <span>Add +</span>
                </div>
                {this.list.map((item) => {
                    return <ListItem title={item.title} key={item.id}/>
                })}
            </div>
        )
    }
}
