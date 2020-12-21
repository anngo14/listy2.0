import React, { Component } from 'react'
import { Card, Accordion } from 'react-bootstrap';
import '../../../../css/MainContent/Home/Complete/Complete.css'
import CompleteItem from './CompleteItem';

export default class Complete extends Component {
    state = {
        complete: this.props.list
    }
    complete = (item) => {
        this.props.switch(item, 1);
    }
    render() {
        let listContent;
        if(this.state.complete.length > 0){
            listContent = (
                this.state.complete.map((item) => {
                    return <CompleteItem item={item} key={item.id} complete={this.complete}/>
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
            <Card className='complete-container'>
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
