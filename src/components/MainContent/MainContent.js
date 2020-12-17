import React, { Component } from 'react'
import '../../css/MainContent/MainContent.css'
import List from './List.js/List'

export default class MainContent extends Component {
    render() {
        return (
            <div className='main-content-container'>
                <List />
            </div>
        )
    }
}
