import React from 'react'
import { Card } from 'react-bootstrap'

export default function ListItem(props) {
    let switchList = () => {
        props.switch(props.item);
    }
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
                <span onClick={switchList}>Select</span>
                <div className='small-spacer'></div>
                <div className='small-spacer'></div>
                <div className='small-spacer'></div>
                <div className='small-spacer'></div>
                <span>Delete</span>
            </div>
        </Card>
    )
}
