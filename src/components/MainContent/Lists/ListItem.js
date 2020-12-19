import React from 'react'
import { Card } from 'react-bootstrap'

export default function ListItem(props) {
    return (
        <Card className='list-item-container'>
            <div className='list-header'>
                <h2>{props.item.title}</h2>
            </div>
            <div className='list-actions'>
                <span>Info</span>
                <div className='small-spacer'></div>
                <div className='small-spacer'></div>
                <div className='small-spacer'></div>
                <div className='small-spacer'></div>
                <span>Select</span>
            </div>
        </Card>
    )
}
