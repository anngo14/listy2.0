import React, { Component } from 'react'
import uuid from 'react-uuid'
import '../../../css/MainContent/Home/Home.css'
import Complete from './Complete/Complete'
import Header from './Header'
import List from './List/List'

export default class Home extends Component {
    state = {
        list: [
            {
                id: 5,
                title: 'Task 1', 
                subtasks: [],
                dateCreated: '12/19/2020',
                timeCreated: '14:32:02',
                priority: 1,
                status: 0
            }
        ],
        complete: [
            {
                id: 1,
                title: 'Task 1',
                subtasks: [],
                dateCreated: '12/17/2020',
                timeCreated: '00:23:45', 
                dateCompleted: '12/17/2020',
                timeCompleted: '00:26:45', 
                priority: 0,
                status: 1
            },
            {
                id: 2,
                title: 'Task 2',
                subtasks: [
                    {
                        id: uuid(),
                        title: 'Subtask 1',
                        status: 1
                    }
                ],
                dateCreated: '12/10/2020',
                timeCreated: '23:10:05', 
                dateCompleted: '12/12/2020',
                timeCompleted: '00:26:45', 
                priority: 1,
                status: 1
            },
            {
                id: 3,
                title: 'Task 3',
                subtasks: [],
                dateCreated: '12/05/2020',
                timeCreated: '05:13:58', 
                dateCompleted: '12/06/2020',
                timeCompleted: '00:26:45', 
                priority: 2,
                status: 1
            }
        ]
    }
    getIndex(item, array){
        for(let i = 0; i < array.length; i++){
            if(array[i].id === item.id) return i;
        }
        return -1;
    }
    switchToList = (item, type) => {
        let index = -1;
        let dest = -1;
        if(type === 0){
            index = this.getIndex(item, this.state.list);
            dest = 1;
        } else if(type === 1){
            index = this.getIndex(item, this.state.complete);
            dest = 0;
        }
        if(index === -1) return;
        this.addToList(item, dest);
        this.deleteFromList(item, type);
    }
    addToList = (item, type) => {
        let copy = [];
        if(type === 0){
            copy = this.state.list;
        } else if(type === 1){
            copy = this.state.complete;
        }
        copy.push(item);
        this.setList(copy, type);
    }
    updateFromList = (item, type) => {
        let index = -1;
        let copy = [];
        if(type === 0){
            index = this.getIndex(item, this.state.list);
            copy = this.state.list;
        } else if(type === 1){
            index = this.getIndex(item, this.state.complete);
            copy = this.state.complete;
        }
        if(index === -1) return;
        copy[index] = item;
        this.setList(copy, type);
    }
    deleteFromList = (item, type) => {
        let index = -1;
        let copy = [];
        if(type === 0){
            index = this.getIndex(item, this.state.list);
            copy = this.state.list;
        } else if(type === 1){
            index = this.getIndex(item, this.state.complete);
            copy = this.state.complete;
        }
        if(index === -1) return;
        copy.splice(index, 1);
        this.setList(copy, type);
    }
    setList(list, type){
        if(type === 0){
            this.setState({
                list: list
            });
        } else if(type === 1){
            this.setState({
                complete: list
            });
        }
    }
    render() {
        return (
            <div className='home-container'>
                <Header />
                <div className='home-content'>
                    <List list={this.state.list} add={this.addToList} update={this.updateFromList} delete={this.deleteFromList} switch={this.switchToList} />
                    <Complete list={this.state.complete} switch={this.switchToList} />
                </div>
            </div>
        )
    }
}
