import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/SideBar/SideBar'
import MainContent from './components/MainContent/MainContent'
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
global.jQuery = require('jquery');

export default class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        name: '',
        avatar: '',
        lists: [],
        selected: {},
        loggedIn: localStorage.getItem("token") !== null ? true: false
      }
    }
  componentDidMount(){
    if(this.state.loggedIn){
      this.getUsername();
      this.getAvatar();
      this.getLists();
      this.getSelected();
    }
  }
  componentWillUnmount(){
    this.logout();
    this.setState({
      name: '',
      lists: [],
      loggedIn: false,
      selected: {}
    });
  }
  getUsername(){
    axios.post('https://listy2.herokuapp.com/api/getUsername', {
      email: localStorage.getItem("email")
    })
    .then((res) => {
        this.setState({
          name: res.data.result.username
        });
    })
    .catch((err) => {
      console.log(err);
    });
  }
  getAvatar(){
    axios.post('https://listy2.herokuapp.com/api/getAvatar', {
      email: localStorage.getItem("email")
    })
    .then((res) => {
      this.setState({
        avatar: res.data.result.avatar
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
  getLists(){
      axios.post('https://listy2.herokuapp.com/api/getLists', {
          email: localStorage.getItem("email")
      })
      .then((res) => {
        this.setState({
            lists: res.data.result.lists
        });
      })
      .catch((err) => {
          console.log(err);
      })
  }
  getSelected(){
    axios.post('https://listy2.herokuapp.com/api/getSelected', {
        email: localStorage.getItem("email")
    })
    .then((res) => {
        this.setState({
            selected: res.data.result.selected
        });
    })
    .catch((err) => {
        console.log(err);
    });
}
  updateName = (name) => {
    this.setState({
      name: name
    });
  }
  updateList = (masterList) => {
    axios.post('https://listy2.herokuapp.com/api/updateList', {
      email: localStorage.getItem("email"),
      list: masterList
    })
    .then((res) => {
      if(res.data.status === 200){
        this.setState({
          lists: masterList
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  updateAvatar = (a) => {
    this.setState({
      avatar: a
    });
  }
  switchList = (list) => {
    axios.post('https://listy2.herokuapp.com/api/updateSelected', {
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
  logout = () => {
      this.setState({
          loggedIn: false,
          name: '',
          lists: [],
          selected: {}
      });
      localStorage.clear();
  }
  login = () => {
      this.setState({
          loggedIn: true
      });
      this.getUsername();
      this.getLists();
      this.getSelected();
  }
  render() {
    return (
      <div className='app-container'>
        <BrowserRouter>
          <SideBar loggedIn={this.state.loggedIn} name={this.state.name} logout={this.logout} avatar={this.state.avatar} />
          <MainContent lists={this.state.lists} name={this.state.name} updateName={this.updateName} updateList={this.updateList} login={this.login} loggedIn={this.state.loggedIn} selected={this.state.selected} switch={this.switchList} />
        </BrowserRouter>
      </div>
    )
  }
}
