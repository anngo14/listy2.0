import React from 'react'
import '../../css/SideBar/SideBar.css'

export default function menuItem(props) {
    return (
        <div className='menu-item'>
            <img alt='menu-icon' />
            <span className='menu-item-title'>{props.name}</span>
        </div>
    )
}
