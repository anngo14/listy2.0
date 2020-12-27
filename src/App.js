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
        lists: [],
        selected: {},
        loggedIn: localStorage.getItem("token") !== undefined ? true: false
      }
    }
  componentDidMount(){
    if(this.state.loggedIn){
      this.getUsername();
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
    axios.post('http://localhost:5000/api/getUsername', {
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
  getLists(){
      axios.post('http://localhost:5000/api/getLists', {
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
    });
}
  updateName = (name) => {
    this.setState({
      name: name
    });
  }
  updateList = (list) => {
    axios.post('http://localhost:5000/api/updateList', {
      email: localStorage.getItem("email"),
      list: list
    })
    .then((res) => {
      if(res.data.status === 200){
        this.setState({
          lists: list
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  updateAvatar = (avater) => {

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
          <SideBar loggedIn={this.state.loggedIn} name={this.state.name} logout={this.logout} />
          <MainContent lists={this.state.lists} name={this.state.name} updateName={this.updateName} updateList={this.updateList} login={this.login} loggedIn={this.state.loggedIn} selected={this.state.selected} />
        </BrowserRouter>
      </div>
    )
  }
}
