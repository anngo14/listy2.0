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
    updateList = (item) => {
        let copy = this.state.list;
        let index = this.getIndex(item);
        if(index === -1) return;
        copy[index] = item;
        this.setState({
            list: copy
        });
    }
    complete = (item) => {
        let d = new Date();
        let month = d.getMonth() + 1;
        let date = d.getDate();
        let year = d.getFullYear();
        item.dateCompleted = month + '/' + date + '/' + year;
        item.timeCompleted = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        item.status = 1;
        this.deleteFromList(item);
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
                        return <ListItem key={item.id} item={item} delete={this.deleteFromList} update={this.updateList} complete={this.complete}/>
                    })}
                </Accordion>
                <AddItemModal show={this.state.addModal} onHide={this.hideAddModal} add={this.addToList}/>
            </Card>
        )
    }
}
