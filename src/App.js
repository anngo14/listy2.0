import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/SideBar/SideBar'
import MainContent from './components/MainContent/MainContent'
import { BrowserRouter } from 'react-router-dom';
import uuid from 'react-uuid';
global.jQuery = require('jquery');

export default class App extends Component {
  state = {
    user: {
        name: 'John Smith',
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
    },
    loggedIn: localStorage.getItem("token") !== null ? true: false,
  }
  updateName = (name) => {
    let copy = this.state.user;
    copy.name = name;
    this.updateUser(copy);
  }
  updateList = (list) => {
    let copy = this.state.user;
    copy.lists = list;
    this.updateUser(copy);
  }
  updateAvatar = (avater) => {

  }
  updateUser(user){
      this.setState({
          user: user
      });
  }
  logout = () => {
      this.setState({
          loggedIn: false
      });
      localStorage.clear();
  }
  login = () => {
      this.setState({
          loggedIn: true
      });
  }
  render() {
    return (
      <div className='app-container'>
        <BrowserRouter>
          <SideBar loggedIn={this.state.loggedIn} user={this.state.user} logout={this.logout} />
          <MainContent user={this.state.user} updateName={this.updateName} updateList={this.updateList} login={this.login} loggedIn={this.state.loggedIn} />
        </BrowserRouter>
      </div>
    )
  }
}
