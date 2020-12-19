import React from 'react'
import '../../css/SideBar/SideBar.css'
import Avatar from './Avatar'
import MenuItem from './MenuItem'

export default function sidebar() {
    let menu = [
        {
            id: 1,
            image: '',
            name: 'Home',
            link: '/home'
        },
        {
            id: 2,
            image: '',
            name: 'Lists',
            link: '/lists'
        },
        {
            id: 3,
            image: '',
            name: 'Settings',
            link: '/settings'
        },
        {
            id: 4,
            image: '',
            name: 'About',
            link: '/about'
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
                return <MenuItem item={item} key={item.id} />
            })}
        </div>
    )
}
