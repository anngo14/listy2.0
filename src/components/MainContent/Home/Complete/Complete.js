import React, { Component } from 'react'
import { Card, Accordion } from 'react-bootstrap';
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
    render() {
        let listContent;
        if(this.props.list.length > 0){
            listContent = (
                this.props.list.map((item) => {
                    return <CompleteItem item={item} key={item.id} complete={this.complete}/>
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
                <Accordion className='complete-list-container'>
                    {listContent}
                </Accordion>
            </Card>
        )
    }
}
