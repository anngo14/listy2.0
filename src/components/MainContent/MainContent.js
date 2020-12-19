import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import '../../css/MainContent/MainContent.css'
import About from './About/About'
import Home from './Home/Home'
import Lists from './Lists/Lists'
import Settings from './Settings/Settings'

export default class MainContent extends Component {
    render() {
        return (
            <div className='main-content-container'>
                <Switch>
                    <Route path='/' exact><Redirect to='/home' /></Route>
                    <Route path='/home' exact component={Home} />
                    <Route path='/lists' exact component={Lists} />
                    <Route path='/settings' exact component={Settings} />
                    <Route path='/about' exact component={About} />
                </Switch>
            </div>
        )
    }
}
