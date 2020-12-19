import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import '../../../css/MainContent/Home/Header.css'

export default class Header extends Component {
    months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    state = {
        date: new Date()
    }

    componentDidMount(){
        this.clockInterval = setInterval(() => {
            this.tick();
        }, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.clockInterval);
    }

    tick(){
        this.setState({
            date: new Date()
        });
    }
    render() {
        return (
            <Card className='home-header-container'>
                <div className='home-header-calendar'>
                    <span>{this.months[this.state.date.getMonth()]}</span>
                    <h1>{this.state.date.getDate()}</h1>
                    <span>{this.state.date.getFullYear()}</span>
                </div>
                <div className='home-header-content'>
                    <span id='home-header-time'>{this.state.date.toLocaleTimeString()}</span>
                    <span id='home-header-plan'>Plan Your Day</span>
                </div>
            </Card>
        )
    }
}
