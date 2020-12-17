import React, { Component } from 'react'
import '../../../css/MainContent/Home/Home.css'
import Header from './Header'
import List from './List.js/List'

export default class Home extends Component {
    render() {
        return (
            <div className='home-container'>
                <Header />
                <List />
            </div>
        )
    }
}
