import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import '../../css/MainContent/MainContent.css'
import About from './About/About'
import Home from './Home/Home'
import Lists from './Lists/Lists'
import Settings from './Settings/Settings'
import Error from './Error/Error'

export default class MainContent extends Component {
    state = {
        selected: {
            id: 1,
            title: 'Test List',
            complete: [],
            list: []
        },
        lists: this.props.user.lists
    }
    getListIndex(id){
        for(let i = 0; i < this.state.lists.length; i++){
            if(this.state.lists[i].id === id) return i;
        }
        return -1;
    }
    switchList = (list) => {
        this.setState({
            selected: list
        });
    }
    updateList = (list) => {
        let index = this.getListIndex(list.id);
        let copy = this.state.lists;
        copy[index] = list;
        this.setState({
            lists: copy
        });
        this.props.updateList(copy);
    }
    addToList = (list) => {
        let copy = this.state.lists;
        copy.push(list);
        this.setState({
            lists: copy
        });
        this.props.updateList(copy);
    }
    deleteFromList = (list) => {
        let copy = this.state.lists;
        let index = this.getListIndex(list.id);
        let next = index + 1;
        if(next === this.state.lists.length) next = 0;
        if(index === -1) return;
        this.switchList(copy[next]);
        copy.splice(index, 1);
        this.setState({
            lists: copy
        });
        if(this.state.lists.length === 0){
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
                    <Route path='/home' exact>
                        <Home list={this.state.selected} update={this.updateList} />
                    </Route>
                    <Route path='/lists' exact>
                        <Lists switch={this.switchList} selected={this.state.selected} lists={this.state.lists} add={this.addToList} delete={this.deleteFromList} />
                    </Route>
                    <Route path='/settings' exact>
                        <Settings user={this.props.user} updateName={this.updateName}/>
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
