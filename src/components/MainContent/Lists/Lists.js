import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import '../../../css/MainContent/Lists/Lists.css'
import ListItem from './ListItem';

export default class Lists extends Component {
    lists = [
        {
            id: 1,
            title: 'List 1'
        },
        {
            id: 2,
            title: 'List 2'
        },
        {
            id: 3,
            title: 'List 3'
        },
        {
            id: 4,
            title: 'List 4'
        },
        {
            id: 5,
            title: 'List 5'
        }
    ];

    render() {
        return (
            <div>
                <h1 className='content-title'>Lists</h1>
                <div id='list-header-row'>
                    <Card id='add-list-btn'>
                        <span>Add a New List +</span>
                    </Card>
                    <Card id='selected-list'>
                        <div id='selected-list-header'>
                            <span>Currently Selected</span>
                            <h2>List Title</h2>
                        </div>
                        <div className='list-actions'>
                            <span>More Info</span>
                        </div>
                    </Card>
                </div>
                <div id='list-grid'>
                    {this.lists.map((item) => {
                        return <ListItem item={item} key={item.id} />
                    })}
                </div>
                <div style={{height: '5em'}}></div>
            </div>
        )
    }
}
