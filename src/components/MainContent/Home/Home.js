import React, { Component } from 'react'
import '../../../css/MainContent/Home/Home.css'
import Complete from './Complete/Complete'
import Header from './Header'
import List from './List/List'

export default class Home extends Component {
    render() {
        return (
            <div className='home-container'>
                <Header />
                <div className='home-content'>
                    <List />
                    <Complete />
                </div>
            </div>
        )
    }
}
