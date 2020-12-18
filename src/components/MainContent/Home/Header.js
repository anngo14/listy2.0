import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import '../../../css/MainContent/Home/Header.css'

export default class Header extends Component {
    render() {
        return (
            <Card className='home-header-container'>
                <div className='home-header-calendar'>
                    <span>DEC</span>
                    <h1>17</h1>
                    <span>2020</span>
                </div>
                <div className='home-header-content'>
                    <span id='home-header-time'>21:16:23</span>
                    <span id='home-header-plan'>Plan Your Day</span>
                </div>
            </Card>
        )
    }
}
