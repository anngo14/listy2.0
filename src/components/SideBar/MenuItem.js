import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/SideBar/SideBar.css'

export default function menuItem(props) {
    return (
        <Link to={props.item.link} className='menu-item'>
            <img alt='menu-icon' />
            <span className='menu-item-title'>{props.item.name}</span>
        </Link>
    )
}
