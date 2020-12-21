import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import uuid from 'react-uuid'
import '../../css/MainContent/MainContent.css'
import About from './About/About'
import Home from './Home/Home'
import Lists from './Lists/Lists'
import Settings from './Settings/Settings'

export default class MainContent extends Component {
    state = {
        selected: {
            id: 1,
            title: 'Test List',
            complete: [],
            list: []
        },
        lists: [
            {
                id: uuid(),
                title: 'List 1',
                list: [
                    {
                        id: uuid(),
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
                        id: uuid(),
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
                        id: uuid(),
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
                        id: uuid(),
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
            },
            {
                id: uuid(),
                title: 'List 2',
                list: [
                    {
                        id: uuid(),
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
                        id: uuid(),
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
                        id: uuid(),
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
                        id: uuid(),
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
            }, 
            {
                id: 1,
                title: 'Test List',
                complete: [],
                list: []
            }
        ]
    }
    getIndex(list){
        for(let i = 0; i < this.state.lists.length; i++){
            if(this.state.lists[i].id === list.id) return i;
        }
        return -1;
    }
    goToList = () => {
        console.log(this.state.selected);
        console.log("go to home");
    }
    switchList = (list) => {
        this.setState({
            selected: list
        });
    }
    render() {
        return (
            <div className='main-content-container'>
                <Switch>
                    <Route path='/' exact><Redirect to='/home' /></Route>
                    <Route path='/home' exact>
                        <Home list={this.state.selected} />
                    </Route>
                    <Route path='/lists' exact>
                        <Lists switch={this.switchList} selected={this.state.selected} lists={this.state.lists} link={this.goToList} />
                    </Route>
                    <Route path='/settings' exact component={Settings} />
                    <Route path='/about' exact component={About} />
                </Switch>
            </div>
        )
    }
}
