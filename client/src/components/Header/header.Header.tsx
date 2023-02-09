import React from 'react'
import './header.css';
import './header.js';


function HeaderCmp() {
    return (
        <section contextMenu='return false' className='snippet-body, mt-0'>
            <div className="navbar navbar-fixed-top container-fluid" id="navbar">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle navbar-default" data-toggle="collapse" data-target="#myNavbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="navbar-brand">Brand</a>
                </div>
                <div className="collapse navbar-right navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Login</li>
                        <li>Signup</li>
                    </ul>
                </div>
            </div>
            {/* <div className="para">
                <h3>Scroll down to see the navbar effect..</h3>
            </div> */}
        </section>
    )
}

export default HeaderCmp;