import React from 'react';

import hnLogo from '../../assets/images/hackernews-logo.png';

import '../../assets/styles/header.scss';


export default function Header () {
    return (
        <div className='header'>
            <img className='logo' src={hnLogo} alt='Hacker New Logo'/>
        </div>
    )
}
