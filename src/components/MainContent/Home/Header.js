import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import '../../../css/MainContent/Home/Header.css'
import Cloud from './assets/Morning/Cloud.png'
import MCloud from './assets/Morning/Multiple Clouds.png'
import Sun from './assets/Morning/Sun.png'
import Moon from './assets/Night/Moon.png'
import WStar from './assets/Night/White star.png'
import YStar from './assets/Night/Yellow star.png'

export default class Header extends Component {
    months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    state = {
        date: new Date(),
        planModal: false,
        headerContent: null,
        headerStyle: {}
    }

    componentDidMount(){
        this.clockInterval = setInterval(() => {
            this.tick();
            if(this.state.date.getHours() >= 5 && this.state.date.getHours() <= 19){
                this.setState({
                    headerStyle: {
                        backgroundColor: '#87CEEB'
                    },
                    headerContent: (
                        <div className='header-content'>
                            <img alt='cloud' src={Cloud} className='clouds' id='cloud1' />
                            <img alt='cloud' src={Cloud} className='clouds' id='cloud2' />
                            <img alt='clouds' src={MCloud} id='mclouds' className='clouds' />
                            <img alt='sun' src={Sun} id='sun' />
                        </div>
                    )
                })
            } else{
                this.setState({
                    headerStyle: {
                        backgroundColor: '#0C1445'
                    },
                    headerContent: (
                        <div className='header-content'>
                            <img alt='moon' src={Moon} id='moon' />
                            <img alt='white-star' src={WStar} className='star' id='star1' />
                            <img alt='yellow-star' src={YStar} className='star' id='star2' />
                            <img alt='white-star' src={WStar} className='star' id='star3' />
                            <img alt='yellow-star' src={YStar} className='star' id='star4' />
                            <img alt='white-star' src={WStar} className='star' id='star5' />
                            <img alt='yellow-star' src={YStar} className='star' id='star6' />
                        </div>
                    )
                })
            }
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
                <div className='home-header-content' style={this.state.headerStyle}>
                    <span id='home-header-time'>{this.state.date.toLocaleTimeString()}</span>
                    {this.state.headerContent}
                </div>
            </Card>
        )
    }
}
