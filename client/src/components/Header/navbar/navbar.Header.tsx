import React from 'react'
import './navbar.css';
import './navbar.js';
import SliderCmp from '../slider/slider.Header';


function HeaderCmp() {

    return (
        <section contextMenu='return false' className='snippet-body, mt-0'>
            <nav className="navbar navbar-light navbar-expand-lg container-fluid fixed-top">
                <a className="navbar-brand">Brand</a>
                <button id='toggler-id' className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span id='toggler-icon-id' className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ml-auto" id="myNavbar">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Signup</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="slider-container">
                <h3>Best Quotes</h3>
                <SliderCmp />
            </div>
        </section>
    )
}

export default HeaderCmp;