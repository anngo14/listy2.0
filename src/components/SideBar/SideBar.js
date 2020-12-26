import React from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import '../../css/SideBar/SideBar.css'
import Menu from './Menu';
import { FiLogOut } from "react-icons/fi";

export default function sidebar(props) {
    let signOut = () => {
        props.logout();
    }
    let logoutLink;
    if(props.loggedIn){
        logoutLink = (
        <Link to='/login' onClick={signOut}>
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
                {logoutLink}
            </div>
            <Switch>
                <Route path={['/home', '/lists', '/settings', '/about']}>
                    <Menu name={props.name} />
                </Route>
            </Switch>
        </div>
    )
}
