import React, { Component } from 'react'
import './App.css'
import SideBar from './components/SideBar/SideBar'
import MainContent from './components/MainContent/MainContent'

export default class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <SideBar />
        <MainContent />
      </div>
    )
  }
}
