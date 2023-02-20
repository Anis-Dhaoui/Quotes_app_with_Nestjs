import React from 'react'
import './login-register.css'
import './login-register.js'

function EntryCmp() {

    return (
        <div className="entry-container">
            <div className="forms-container">
                <div className="signin-signup">
                    {/* LOGIN FORM */}
                    <form action="" className="sign-in-form">
                        <h2 className="title">Login</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" name="usuario" autoComplete="username" placeholder="Username" required />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" name="contraseña" autoComplete="current-password" placeholder="Password" id="id_password" required />
                            <i className="far fa-eye" id="togglePassword" style={{ cursor: 'pointer' }}></i>
                        </div>
                        <a href="#" className="key use-keyboard-input">Virtual keyboard</a>
                        <a className="pass" href="#">Forgot your password?</a>
                        <input type="submit" value="Sign in" className="entry-btn solid" />
                        <p className="social-text">You can login with:</p>
                        <div className="social-media">
                            <a href="#" className="social-icon" aria-label="Register with Google">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#" className="social-icon" aria-label="Register with Discord">
                                <i className="fab fa-discord"></i>
                            </a>
                            <a href="#" className="social-icon" aria-label="Register with Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f" aria-label="Register with Facebook"></i>
                            </a>
                        </div>
                    </form>

                    {/* SIGN UP FORM */}
                    <form action="" className="sign-up-form">
                        <h2 className="title">Register</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" name="usuario" autoComplete="username" placeholder="Username" required />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" name="correo" autoComplete="email" placeholder="Email" required />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" name="contraseña" autoComplete='current-password' placeholder="Password" id="id_reg" required />
                            <i className="far fa-eye" id="toggleReg" style={{ cursor: 'pointer' }}></i>
                        </div>
                        <label className="check">
                            <input type="checkbox" />
                            <span className="checkmark">I accept the <a href="terms.html">terms and services</a></span>
                        </label>
                        <input type="submit" style={{ width: '180px' }} value="Create account" className="entry-btn solid" />
                        <p className="social-text">You can register with:</p>
                        <div className="social-media">
                            <a href="#" className="social-icon" aria-label="Register with Google">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#" className="social-icon" aria-label="Register with Discord">
                                <i className="fab fa-discord"></i>
                            </a>
                            <a href="#" className="social-icon" aria-label="Register with Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f" aria-label="Register with Facebook"></i>
                            </a>
                        </div>
                    </form>
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