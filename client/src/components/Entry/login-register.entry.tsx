import React from 'react'
import './login-register.css'
import './login-register.js'
import LoginCmp from './login.entry'
import RegisterCmp from './register.entry'

function EntryCmp() {

    return (
        <div className="entry-container">
            <div className="forms-container">
                <div className="signin-signup">
                    {/* LOGIN FORM */}
                    <LoginCmp />

                    {/* SIGN UP FORM */}
                    <RegisterCmp />
                </div>
            </div>

            <div className="panels-container">
                <div className="entry-panel left-panel">
                    <div className="content">
                        <h3>You don't have an account?</h3>
                        <p>Create your account right now to follow people and like publications</p>
                        <button className="entry-btn transparent" id="sign-up-btn">Register</button>
                    </div>
                    <img src="img/log.svg" className="image" alt="" />
                </div>

                <div className="entry-panel right-panel">
                    <div className="content">
                        <h3>Already have an account?</h3>
                        <p>Login to see your notifications and post your favorite photos</p>
                        <button className="entry-btn transparent" id="sign-in-btn">Sign in</button>
                    </div>
                    <img src="img/register.svg" className="image" alt="" />
                </div>
            </div>
        </div>
    )
}

export default EntryCmp