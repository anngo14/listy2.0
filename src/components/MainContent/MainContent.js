import React, { Component } from 'react'
import '../../css/MainContent/MainContent.css'
import Home from './Home/Home'
import Lists from './Lists/Lists'
import Settings from './Settings/Settings'

export default class MainContent extends Component {
    render() {
        return (
            <div className='main-content-container'>
                <Home />
                <Lists />
                <Settings />
            </div>
        )
    }
}
