import React from 'react'
import IonIcon from '@reacticons/ionicons';
import './user.css';
import './user.js';
import { useAppDispatch } from '../../../state/store.state';
import { handleLogout } from '../../../state/actions-creators/login.actions-creators';

function AvatarCmp({ cu }: ILoginRes | any) {
    const dispatch = useAppDispatch();

    return (
        <div className="navigation">
            <div className="user-box">
                <div className="image-box">
                    <img src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg" alt="avatar" />
                </div>
                <p className="username"> {`${cu.firstName} ${cu.lastName}`} </p>
            </div>
            <div className="menu-toggle"></div>
            <ul className="menu">
                <li><a href="/#"><IonIcon name="person-outline" className='menu-icons' />Profile</a></li>
                <li><a href="/#"><IonIcon name="chatbox-outline" className='menu-icons' />Messages</a></li>
                <li><a href="/#"><IonIcon name="notifications-outline" className='menu-icons' />Notification</a></li>
                <li><a href="/#"><IonIcon name="cog-outline" className='menu-icons' />Settings</a></li>
                {/* eslint-disable-next-line */}
                <li><a href="#logout" onClick={() => dispatch(handleLogout)}><IonIcon name="log-out-outline" className='menu-icons' />Logout</a></li>
            </ul>
        </div>
    )
}

export default AvatarCmp