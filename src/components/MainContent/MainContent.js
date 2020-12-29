import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import '../../css/MainContent/MainContent.css'
import About from './About/About'
import Home from './Home/Home'
import Lists from './Lists/Lists'
import Settings from './Settings/Settings'
import Error from './Error/Error'
import Login from './Login/Login'
import Register from './Register/Register'
import axios from 'axios'

export default class MainContent extends Component {   
    getListIndex(id){
        for(let i = 0; i < this.props.lists.length; i++){
            if(this.props.lists[i].id === id) return i;
        }
        return -1;
    }
    switchList = (list) => {
        this.props.switch(list);
    }
    updateList = (list) => {
        let index = this.getListIndex(list.id);
        let masterList = this.props.lists;
        masterList[index] = list;
        this.props.updateList(masterList);
    }
    addToList = (list) => {
        let masterList = this.props.lists;
        list.list = this.countingSort(list.list);
        masterList.push(list);
        this.props.updateList(masterList);
    }
    deleteFromList = (list) => {
        axios.post('http://localhost:5000/api/deleteList', {
            email: localStorage.getItem("email"),
            id: list.id
        })
        .then((res) => {
            if(res.data.status === 200){
                let copy = this.props.lists;
                let index = this.getListIndex(list.id);
                let next = index + 1;
                if(next === this.props.lists.length) next = 0;
                if(index === -1) return;
                this.switchList(copy[next]);
                copy.splice(index, 1);
                if(this.props.lists.length === 0){
                    this.switchList({});
                }
                this.props.updateList(copy);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
    updateName = (name) => {
        this.props.updateName(name);
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
        return (
            <div className='main-content-container'>
                <Switch>
                    <Route path='/' exact><Redirect to='/home' /></Route>
                    <Route path='/login'>
                        <Login login={this.props.login} />
                    </Route>
                    <Route path='/register' component={Register} />
                    <Route path='/home' exact>
                        <Home list={this.props.selected} update={this.updateList} loggedIn={this.props.loggedIn} />
                    </Route>
                    <Route path='/lists' exact>
                        <Lists switch={this.switchList} selected={this.props.selected} lists={this.props.lists} add={this.addToList} delete={this.deleteFromList} />
                    </Route>
                    <Route path='/settings' exact>
                        <Settings name={this.props.name} updateName={this.updateName}/>
                    </Route>
                    <Route path='/about' exact component={About} />
                    <Route path='/login' />
                    <Route path='/register' />
                    <Route component={Error} />
                </Switch>
            </div>
        )
    }
}
