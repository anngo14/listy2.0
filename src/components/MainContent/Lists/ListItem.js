import React from 'react'
import { Component } from 'react';
import { Card } from 'react-bootstrap'
import '../../../css/MainContent/Lists/Lists.css'

export default class ListItem extends Component {
    state = {
        slide: null
    }
    switchList = () => {
        this.props.switch(this.props.item);
    }
    toggle = () => {
        let toggleState = this.getAnimationState();
        if(toggleState === 0 || toggleState === 2){
            this.setState({
                slide: true
            });
        } else{
            this.setState({
                slide: false
            });
        }
    }
    getAnimationState = () => {
        const toggleState = this.state.slide;
        if(toggleState === true){
            return 1;
        } else if(toggleState === false){
            return 0;
        } else{
            return 2;
        }
    }
    render(){
        let listContent;
        if(this.props.item.list.length > 0){
            listContent = (
                this.props.item.list.map((item) => {
                    let priority;
                    if(item.priority === 0){
                        priority = <div className='list-info-priority' style={{backgroundColor: '#EBEDEF'}}></div>
                    } else if(item.priority === 1){
                        priority = <div className='list-info-priority' style={{backgroundColor: '#93D8EE'}}></div>
                    } else{
                        priority = <div className='list-info-priority' style={{backgroundColor: '#FE7979'}}></div>
                    }
                    return (
                        <div className='list-info-item' key={item.id}>
                            {priority}
                            <div className='small-spacer'></div>
                            <div className='small-spacer'></div>
                            <h5>{item.title}</h5>
                        </div>
                    )
                })
            )
        } else{
            listContent = (
                <div>
                    No Items Found!
                </div>
            )
        }
        return (
            <Card className='list-item-container'>
                <div className='list-header'>
                    <h2>{this.props.item.title}</h2>
                </div>
                <div className='list-actions'>
                    <span onClick={this.toggle}>Info</span>
                    <div className='small-spacer'></div>
                    <div className='small-spacer'></div>
                    <div className='small-spacer'></div>
                    <div className='small-spacer'></div>
                    <span onClick={this.switchList}>Select</span>
                    <div className='small-spacer'></div>
                    <div className='small-spacer'></div>
                    <div className='small-spacer'></div>
                    <div className='small-spacer'></div>
                    <span>Delete</span>
                </div>
                <div className='list-item-info' slide={this.getAnimationState()}>
                    <div className='list-item-info-header'>
                        <div className='list-item-info-close' onClick={this.toggle}>✕</div>
                    </div>
                    <h2>{this.props.item.title}</h2>
                    <div style={{height: '1em'}}></div>
                    {listContent}
                </div>
            </Card>
        )
    }
}
