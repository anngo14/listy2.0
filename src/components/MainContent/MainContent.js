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
    state = {
        selected: []
    }
    componentDidMount(){
        if(this.props.loggedIn){
            this.getSelected();
        }
    }
    getSelected(){
        axios.post('http://localhost:5000/api/getSelected', {
            email: localStorage.getItem("email")
        })
        .then((res) => {
            this.setState({
                selected: res.data.result.selected
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }
    getListIndex(id){
        for(let i = 0; i < this.props.lists.length; i++){
            if(this.props.lists[i].id === id) return i;
        }
        return -1;
    }
    switchList = (list) => {
        axios.post('http://localhost:5000/api/updateSelected', {
            email: localStorage.getItem("email"),
            list: list
        })
        .then((res) => {
            if(res.data.status === 200){
                this.setState({
                    selected: list
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
    updateList = (list) => {
        let index = this.getListIndex(list.id);
        let copy = this.props.lists;
        copy[index] = list;
        this.props.updateList(copy);
    }
    addToList = (list) => {
        let copy = this.props.lists;
        copy.push(list);
        this.props.updateList(copy);
    }
    deleteFromList = (list) => {
        let copy = this.props.lists;
        let index = this.getListIndex(list.id);
        let next = index + 1;
        if(next === this.props.lists.length) next = 0;
        if(index === -1) return;
        this.switchList(copy[next]);
        copy.splice(index, 1);
        if(this.props.lists.length === 0){
            this.switchList(null);
            this.setState({
                selected: null
            });
        }
        this.props.updateList(copy);
    }
    updateName = (name) => {
        this.props.updateName(name);
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
                        <Home list={this.state.selected} update={this.updateList} loggedIn={this.props.loggedIn} />
                    </Route>
                    <Route path='/lists' exact>
                        <Lists switch={this.switchList} selected={this.state.selected} lists={this.props.lists} add={this.addToList} delete={this.deleteFromList} />
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
