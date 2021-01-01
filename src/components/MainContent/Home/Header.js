import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import '../../../css/MainContent/Home/Header.css'

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
            if(this.state.date.getHours() >= 5 && this.state.date.getHours() < 18){
                this.setState({
                    headerStyle: {
                        backgroundColor: '#87CEEB'
                    },
                    headerContent: (
                        <div className='header-content'>
                            <img alt='cloud' src={process.env.PUBLIC_URL + '/resource/Morning/Cloud.png'} className='clouds' id='cloud1' />
                            <img alt='cloud' src={process.env.PUBLIC_URL + '/resource/Morning/Cloud.png'} className='clouds' id='cloud2' />
                            <img alt='clouds' src={process.env.PUBLIC_URL + '/resource/Morning/Multiple Clouds.png'} id='mclouds' className='clouds' />
                            <img alt='sun' src={process.env.PUBLIC_URL + '/resource/Morning/Sun.png'} id='sun' />
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
                            <img alt='moon' src={process.env.PUBLIC_URL + '/resource/Night/Moon.png'} id='moon' />
                            <img alt='white-star' src={process.env.PUBLIC_URL + '/resource/Night/White star.png'} className='star' id='star1' />
                            <img alt='yellow-star' src={process.env.PUBLIC_URL + '/resource/Night/Yellow star.png'} className='star' id='star2' />
                            <img alt='white-star' src={process.env.PUBLIC_URL + '/resource/Night/White star.png'} className='star' id='star3' />
                            <img alt='yellow-star' src={process.env.PUBLIC_URL + '/resource/Night/Yellow star.png'} className='star' id='star4' />
                            <img alt='white-star' src={process.env.PUBLIC_URL + '/resource/Night/White star.png'} className='star' id='star5' />
                            <img alt='yellow-star' src={process.env.PUBLIC_URL + '/resource/Night/Yellow star.png'} className='star' id='star6' />
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
