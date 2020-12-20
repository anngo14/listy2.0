import React, { Component } from 'react'
import { Card, Accordion } from 'react-bootstrap';
import '../../../../css/MainContent/Home/List/List.css'
import ListItem from './ListItem';
import AddItemModal from './AddItemModal'

export default class List extends Component {
    state = {
        addModal: false,
        list: []
    }
    getIndex(item){
        for(let i = 0; i < this.state.list.length; i++){
            if(this.state.list[i].id === item.id) return i;
        }
        return -1;
    }
    showAddModal = () => {
        this.setState({
            addModal: true
        });
    }
    hideAddModal = () => {
        this.setState({
            addModal: false
        });
    }
    addToList = (item) => {
        this.setState({
            list: [...this.state.list, item]
        });
        this.hideAddModal();
    }
    deleteFromList = (item) => {
        let copy = this.state.list;
        let index = this.getIndex(item);
        if(index === -1) return;
        copy.splice(index, 1);
        this.setState({
            list: copy
        });
    }
    render() {
        return (
            <Card className='list-container'>
                <Card.Header id='list-header'>
                    <h1>List Title</h1>
                    <span id='list-add-btn' onClick={this.showAddModal} >Add +</span>
                </Card.Header>
                <Accordion className='list-content-container'>
                    {this.state.list.map((item) => {
                        return <ListItem key={item.id} item={item} delete={this.deleteFromList}/>
                    })}
                </Accordion>
                <AddItemModal show={this.state.addModal} onHide={this.hideAddModal} add={this.addToList}/>
            </Card>
        )
    }
}
