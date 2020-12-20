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
    addtoList = (item) => {
        this.setState({
            list: [...this.state.list, item]
        });
        this.hideAddModal();
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
                        return <ListItem key={item.id} item={item} />
                    })}
                </Accordion>
                <AddItemModal show={this.state.addModal} onHide={this.hideAddModal} add={this.addtoList}/>
            </Card>
        )
    }
}
