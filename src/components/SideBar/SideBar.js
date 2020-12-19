import React from 'react'
import '../../css/SideBar/SideBar.css'
import Avatar from './Avatar'
import MenuItem from './MenuItem'

export default function sidebar() {
    let menu = [
        {
            id: 1,
            image: '',
            name: 'Home'
        },
        {
            id: 2,
            image: '',
            name: 'Lists'
        },
        {
            id: 3,
            image: '',
            name: 'Settings'
        },
        {
            id: 4,
            image: '',
            name: 'About'
        }
    ];
    return (
        <div className='sidebar-container'>
            <div className='header-container'>
                <div className='header-logo-container'>
                    <span>menu</span>
                    <div className='small-spacer'></div>
                    <h2>Listy</h2>
                </div>
                <span>logout</span>
            </div>
            <Avatar user='John Smith'/>
            {menu.map((item) => {
                return <MenuItem name={item.name} key={item.id} />
            })}
        </div>
    )
}
