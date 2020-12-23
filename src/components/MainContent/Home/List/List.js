import React, { Component } from 'react'
import { Card, Accordion } from 'react-bootstrap';
import '../../../../css/MainContent/Home/List/List.css'
import ListItem from './ListItem';
import AddItemModal from './AddItemModal'

export default class List extends Component {
    state = {
        addModal: false,
        list: this.props.list
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
    addItem = (item) => {
        this.props.add(item, 0);
        this.hideAddModal();
    }
    updateItem = (item) => {
        this.props.update(item, 0);
    }
    deleteItem = (item) => {
        this.props.delete(item, 0);
    }
    markComplete = (item) => {
        let d = new Date();
        let month = d.getMonth() + 1;
        let date = d.getDate();
        let year = d.getFullYear();
        item.dateCompleted = month + '/' + date + '/' + year;
        item.timeCompleted = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        item.status = 1;
        this.props.switch(item, 0);
    }
    render() {
        let listContent;
        if(this.state.list.length > 0){
            listContent = (this.state.list.map((item) => {
                return <ListItem key={item.id} item={item} delete={this.deleteItem} update={this.updateItem} complete={this.markComplete}/>
            }))
        } else{
            listContent = (
                <div className='empty-container'>
                    No Items Found!
                </div>
            )
        }
        return (
            <Card className='list-container'>
                <Card.Header id='list-header'>
                    <h1>{this.props.title}</h1>
                    <span id='list-add-btn' onClick={this.showAddModal} >Add +</span>
                </Card.Header>
                <Accordion className='list-content-container'>
                    {listContent}
                </Accordion>
                <AddItemModal show={this.state.addModal} onHide={this.hideAddModal} add={this.addItem} />
            </Card>
        )
    }
}
