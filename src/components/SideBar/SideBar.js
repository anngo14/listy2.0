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
            name: 'History'
        },
        {
            id: 4,
            image: '',
            name: 'Settings'
        },
        {
            id: 5,
            image: '',
            name: 'About'
        }
    ];
    return (
        <div className='sidebar-container'>
            <div className='header-container'>
                <span>menu</span>
                <h2>Listy</h2>
            </div>
            <Avatar user='John Smith'/>
            {menu.map((item) => {
                return <MenuItem name={item.name} key={item.id} />
            })}
        </div>
    )
}
