import React from 'react'
import '../../css/SideBar/SideBar.css'

export default function avatar(props) {
    return (
        <div className='avatar'>
            <img alt='avatar-icon'/>
            <h2>{props.user}</h2>
        </div>
    )
}
