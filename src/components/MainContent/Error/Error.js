import React from 'react'
import { Link } from 'react-router-dom';
import image from './warning.png';
import '../../../css/MainContent/Error/Error.css'

export default function Error() {
    return (
        <div className='error-container'>
            <div className='warning-container'>
                <img src={image} alt='warning'></img>
                <h1>404 Error! Page Not Found</h1>
                <Link to='/' className='link'>Back to Home</Link>
            </div>
        </div>
    )
}
