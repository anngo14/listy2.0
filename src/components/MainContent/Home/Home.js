import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import '../../../css/MainContent/Home/Home.css'
import Complete from './Complete/Complete'
import Header from './Header'
import List from './List/List'

export default class Home extends Component {
    state = {
        card: false
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
            index = this.getIndex(item, this.props.list.list);
            dest = 1;
        } else if(type === 1){
            index = this.getIndex(item, this.props.list.complete);
            dest = 0;
        }
        if(index === -1) return;
        this.addToList(item, dest);
        this.deleteFromList(item, type);
    }
    addToList = (item, type) => {
        let list = [];
        if(type === 0){
            let listCopy = this.props.list.list;
            listCopy.push(item);
            list = this.countingSort(listCopy);
        } else if(type === 1){
            list = this.props.list.complete;
            list.push(item);
        }
        this.setList(list, type);
    }
    updateFromList = (item, type) => {
        let index = -1;
        let copy = [];
        if(type === 0){
            index = this.getIndex(item, this.props.list.list);
            copy = this.props.list.list;
        } else if(type === 1){
            index = this.getIndex(item, this.props.list.complete);
            copy = this.props.list.complete;
        }
        if(index === -1) return;
        copy[index] = item;
        this.setList(copy, type);
    }
    deleteFromList = (item, type) => {
        let index = -1;
        let list = [];
        if(type === 0){
            index = this.getIndex(item, this.props.list.list);
            list = this.props.list.list;
        } else if(type === 1){
            index = this.getIndex(item, this.props.list.complete);
            list = this.props.list.complete;
        }
        if(index === -1) return;
        list.splice(index, 1);
        this.setList(list, type);
    }
    setList(list, type){
        let selected = this.props.list;
        if(type === 0){
            selected.list = list;
        } else if(type === 1){
            selected.complete = list;
        }
        axios.post('http://localhost:5000/api/updateSelected', {
            email: localStorage.getItem("email"),
            list: selected
        })
        .then((res) => {
            if(res.data.status === 200){
                this.props.update(selected);
            }
        })
        .catch((err) => {
            if(err) console.log(err);
        });
    }
    clearComplete = () => {
        let copy = this.props.list;
        copy.complete = [];
        axios.post('http://localhost:5000/api/updateSelected', {
            email: localStorage.getItem("email"),
            list: copy
        })
        .then((res) => {
            if(res.data.status === 200){
                this.props.update(copy);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    toggleCard = () => {
        this.setState({
            card: true
        });
        setTimeout(() => {
            this.setState({
                card: false
            })
        }, 400);
    }
    countingSort(list){
        let h = [];
        let n = [];
        let l = [];
        for(let i = 0; i < list.length; i++){
          if(list[i].priority === 2){
            h.push(list[i]);
          } else if(list[i].priority === 1){
            n.push(list[i]);
          } else if(list[i].priority === 0){
            l.push(list[i]);
          }
        }
        return h.concat(n.concat(l));
      }
    render() {
        let redirectLogin;
        if(this.props.loggedIn === undefined || this.props.loggedIn === null || this.props.loggedIn === false){
            redirectLogin = <Redirect to='/login' />
        }
        return (
            <div className='home-container'>
                {redirectLogin} 
                <Header />
                <div className='home-content'>
                    <List list={this.props.list.list === undefined ? []: this.props.list.list} add={this.addToList} update={this.updateFromList} delete={this.deleteFromList} switch={this.switchToList} title={this.props.list !== null ? this.props.list.title: null} toggleCard={this.toggleCard} />
                    <Complete list={this.props.list.complete === undefined ? []: this.props.list.complete} switch={this.switchToList} card={this.state.card} delete={this.deleteFromList} title={this.props.list !== null ? this.props.list.title: null} clearComplete={this.clearComplete} />
                </div>
            </div>
        )
    }
}
