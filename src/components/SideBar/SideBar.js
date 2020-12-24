import React from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import '../../css/SideBar/SideBar.css'
import Login from './Login';
import Menu from './Menu';
import Register from './Register';
import { FiLogOut } from "react-icons/fi";

export default function sidebar(props) {
    let logout;
    if(props.loggedIn){
        logout = (
        <Link to='/login'>
            <FiLogOut />
        </Link>
        )
    } 
    return (
        <div className='sidebar-container'>
            <div className='header-container'>
                <div className='header-logo-container'>
                    <h2 style={{cursor: 'default'}}>Listy</h2>
                </div>
                {logout}
            </div>
            <Switch>
                <Route path='/register' exact>
                    <Register />
                </Route>
                <Route path='/login' exact>
                    <Login />
                </Route>
                <Route path={['/home', '/lists', '/settings', '/about']}>
                    <Menu user={props.user}/>
                </Route>
            </Switch>
        </div>
    )
}
