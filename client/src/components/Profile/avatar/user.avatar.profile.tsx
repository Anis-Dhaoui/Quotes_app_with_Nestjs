import React from 'react'
import IonIcon from '@reacticons/ionicons';
import './user.css';
import './user.js';

function AvatarCmp() {
    return (
        <div className="navigation">
            <div className="user-box">
                <div className="image-box">
                    <img src="https://i.pravatar.cc/150?img=49" alt="avatar" />
                </div>
                <p className="username">Jenifer Lopez</p>
            </div>
            <div className="menu-toggle"></div>
            <ul className="menu">
                <li><a href="#"><IonIcon name="person-outline" className='menu-icons' />Profile</a></li>
                <li><a href="#"><IonIcon name="chatbox-outline" className='menu-icons' />Messages</a></li>
                <li><a href="#"><IonIcon name="notifications-outline" className='menu-icons' />Notification</a></li>
                <li><a href="#"><IonIcon name="cog-outline" className='menu-icons' />Settings</a></li>
                <li><a href="#"><IonIcon name="log-out-outline" className='menu-icons' />Logout</a></li>
            </ul>
        </div>
    )
}

export default AvatarCmp