import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import '../../../css/MainContent/Home/Home.css'
import Complete from './Complete/Complete'
import Header from './Header'
import List from './List/List'

export default class Home extends Component {
    state = {
        card: false,
        selected: this.props.list,
        list: this.props.list === null ? []: this.props.list.list,
        complete: this.props.list === null ? []: this.props.list.complete
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
        let copy = this.state.selected;
        if(type === 0){
            this.setState({
                list: list
            });
            copy.list = this.state.list;
        } else if(type === 1){
            this.setState({
                complete: list
            });
            copy.complete = this.state.complete;
        }
        this.setState({
            selected: copy
        });
        this.props.update(this.state.selected);
    }
    toggleCard = () => {
        this.setState({
            card: true
        });
        setTimeout(() => {
            this.setState({
                card: false
            })
        },400);
    }
    render() {
        let redirectLists;
        if(this.props.list === undefined || this.props.list === null){
            redirectLists = <Redirect to='/lists' />
        }
        let redirectLogin;
        if(this.props.loggedIn === undefined || this.props.loggedIn === null || this.props.loggedIn === false){
            redirectLogin = <Redirect to='/login' />
        }
        return (
            <div className='home-container'>
                {redirectLists}
                {redirectLogin} 
                <Header />
                <div className='home-content'>
                    <List list={this.state.list} add={this.addToList} update={this.updateFromList} delete={this.deleteFromList} switch={this.switchToList} title={this.state.selected !== null ? this.state.selected.title: null} toggleCard={this.toggleCard} />
                    <Complete list={this.state.complete} switch={this.switchToList} card={this.state.card}/>
                </div>
            </div>
        )
    }
}
