import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../../../../css/MainContent/Home/List/AddModal.css'

export default class SublistItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: this.props.item,
            value: this.props.item.title
        };
    }
    handleChange = (e) => {
        let copy = this.state.item;
        copy.title = e.target.value;
        this.setState({
            item: copy,
            value: this.state.item.title
        });
        this.props.change(this.state.item);
    }
    delete = () => {
        this.props.delete(this.state.item);
    }
    render() {
        return (
            <div className='add-subtasks-item'>
                <Form.Control value={this.state.value} onChange={this.handleChange}/>
                <div className='small-spacer'></div>
                <Button variant='danger' onClick={this.delete}>Delete</Button>
            </div>
        )
    }
}
