import React from 'react'
import '../../../css/MainContent/About/About.css'

export default function About() {
    return (
        <div>
            <h1 className='content-title'>About</h1>
            <div id='about-content'>
                <p>
                    Listy is a To Do List application that was built using React. As a common starter project for most budding developers, Listy takes the concept of a To-Do List and is reimagined with my own image. 
                </p>
                <p>
                    Most web applications with simple functionality are not going to be visited often or for long periods of time. Taking this into account I wanted to provide the user a really quick glimpses of information that would be useful. For example, the header on the Home page was meant to grab the user's attention quickly to tell the user what general time of day it is by using a duller color for other elements on the page.
                </p>
            </div>
        </div>
    )
}
