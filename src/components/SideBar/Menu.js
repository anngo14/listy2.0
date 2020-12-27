import React from 'react'
import Avatar from './Avatar'
import { FaHome, FaList } from "react-icons/fa";
import { IoSettings, IoInformationCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function Menu(props) {
    return (
        <div className='menu-container'>
            <Avatar user={props.name} avatar={props.avatar} />
            <div className='menu-btn-container'>
                <Link to='/home' className='menu-item'>
                    <FaHome />
                    <span className='menu-item-title'>Home</span>
                </Link>
                <Link to='/lists' className='menu-item'>
                    <FaList />
                    <span className='menu-item-title'>Lists</span>
                </Link>
                <Link to='/settings' className='menu-item'>
                    <IoSettings />
                    <span className='menu-item-title'>Settings</span>
                </Link>
                <Link to='/about' className='menu-item'>
                    <IoInformationCircle />
                    <span className='menu-item-title'>About</span>
                </Link>
            </div>       
        </div>
    )
}
