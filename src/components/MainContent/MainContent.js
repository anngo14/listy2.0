import React, { Component } from 'react'
import '../../css/MainContent/MainContent.css'
import Home from './Home/Home'

export default class MainContent extends Component {
    render() {
        return (
            <div className='main-content-container'>
                <Home />
            </div>
        )
    }
}
