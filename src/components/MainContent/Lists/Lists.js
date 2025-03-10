import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../../../css/MainContent/Lists/Lists.css'
import AddListModal from './AddListModal';
import ListItem from './ListItem';

export default class Lists extends Component {
    state = {
        addModal: false
    };
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
    switchList = (list) => {
        this.props.switch(list);
    }
    deleteList = (list) => {
        this.props.delete(list);
    }
    addToList = (list) => {
        this.props.add(list);
    }

    render() {
        return (
            <div>
                <h1 className='content-title'>Lists</h1>
                <div id='list-header-row'>
                    <Card id='add-list-btn' onClick={this.showAddModal}>
                        <span >Add a New List +</span>
                    </Card>
                    <Card id='selected-list'>
                        <div id='selected-list-header'>
                            <span>Currently Selected</span>
                            <h2>{this.props.selected.title !== undefined ? this.props.selected.title: "Empty!"}</h2>
                        </div>
                        <div className='list-actions'>
                            <Link to='/home'>More Info</Link>
                        </div>
                    </Card>
                </div>
                <div id='list-grid'>
                    {this.props.lists.map((item) => {
                        return <ListItem item={item} key={item.id} switch={this.switchList} delete={this.deleteList} />
                    })}
                </div>
                <div style={{height: '5em'}}></div>
                <AddListModal show={this.state.addModal} onHide={this.hideAddModal} add={this.addToList} />
            </div>
        )
    }
}
