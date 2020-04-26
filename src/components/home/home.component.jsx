import React from 'react';
import '../../assets/styles/home.scss';
import Stories from '../stories/stories.component';
import Header from '../header/header.component';

export default function Home () {
    return (
        <div className='home'> 
            <Header />
            <Stories />
        </div>
    )
}
