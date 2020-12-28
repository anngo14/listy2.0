import React, { Component } from 'react'
import { Card, Accordion, Button } from 'react-bootstrap';
import '../../../../css/MainContent/Home/Complete/Complete.css'
import CompleteItem from './CompleteItem';

export default class Complete extends Component {
    complete = (item) => {
        this.props.switch(item, 1);
    }
    getAnimationState(){
        const toggleState = this.props.card;
        if(toggleState === true){
            return 1;
        } else if(toggleState === false){
            return 0;
        } else{
            return 2;
        }
    }
    clearComplete = () => {
        this.props.clearComplete();
    }
    render() {
        let listContent;
        if(this.props.list.length > 0){
            listContent = (
                this.props.list.map((item) => {
                    return <CompleteItem item={item} key={item.id} complete={this.complete} delete={this.props.delete} />
                })
            )
        } else{
            listContent = (
                <div className='empty-container'>
                    No Items Found!
                </div>
            )
        }
        return (
            <Card className='complete-container' new={this.getAnimationState()}>
                <div id='complete-header-container'>
                    <h1 id='complete-header'>Completed Tasks</h1>
                </div>
                <div>
                    {this.props.title !== undefined && 
                        <Button variant='light' className='complete-clear-btn' onClick={this.clearComplete} >Clear All Tasks</Button>
                    }
                </div>
                <Accordion className='complete-list-container'>
                    {listContent}
                </Accordion>
            </Card>
        )
    }
}
