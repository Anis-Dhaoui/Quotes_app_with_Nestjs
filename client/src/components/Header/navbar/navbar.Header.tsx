import React from 'react'
import './navbar.css';
import './navbar.js';
import SliderCmp from '../slider/slider.Header';


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
            <div className="slider-container">
                <h3>Best Quotes</h3>
                <SliderCmp />
            </div>

        </section>
    )
}

export default HeaderCmp;