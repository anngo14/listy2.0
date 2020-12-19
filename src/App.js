import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/SideBar/SideBar'
import MainContent from './components/MainContent/MainContent'
import { BrowserRouter } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <BrowserRouter>
          <SideBar />
          <MainContent />
        </BrowserRouter>
      </div>
    )
  }
}
