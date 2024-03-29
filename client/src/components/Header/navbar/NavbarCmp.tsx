import React from 'react'
import './navbar.css';
import './script.navbar.js';
import AvatarCmp from '../avatar/user.avatar';
import { useAppSelector } from 'state/store.state';
import { Link } from 'react-router-dom';


/* eslint-disable @typescript-eslint/no-unused-vars */
function NavbarCmp() {
    const { loading, user, errMsg, isAuthenticated } = useAppSelector(state => state.login);

    return (
        <nav className="navbar navbar-light navbar-expand-lg container-fluid fixed-top">
            <a href="/#" className="navbar-brand">Brand</a>
            <button id='toggler-id' className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span id='toggler-icon-id' className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="/#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/#">About</a>
                    </li>
                    {
                        !isAuthenticated ?
                            <li className="nav-item">
                                <Link to={'/entry'} className="nav-link">Login</Link>
                            </li>
                            :
                            null
                    }
                </ul>
                {
                    isAuthenticated ?
                        <ul style={{ marginLeft: '7rem', listStyle: 'none' }}>
                            <li><AvatarCmp cu={user?.user} /></li>
                        </ul>
                        :
                        null
                }
            </div>
        </nav>
    )
}

export default NavbarCmp;