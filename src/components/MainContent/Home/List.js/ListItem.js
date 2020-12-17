import React, { Component } from 'react'

export default class ListItem extends Component {
    render() {
        return (
            <div className='list-item-container'>
                <input type='checkbox' />
                <h3>{this.props.title}</h3>
            </div>
        )
    }
}
