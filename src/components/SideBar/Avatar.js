import React from 'react'
import '../../css/SideBar/SideBar.css'
import defaultIcon from './Avatar/User Icon.png'

export default function avatar(props) {
    return (
        <div className='avatar'>
            <img alt='avatar-icon' src={defaultIcon} />
            <div className='vertical-spacer'></div>
            <h2 style={{cursor:'default'}}>{props.user}</h2>
        </div>
    )
}
