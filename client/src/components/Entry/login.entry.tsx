import React from 'react'

function LoginCmp() {
    return (
        <form action="" className="sign-in-form">
            <h2 className="title">Login</h2>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="email" name="usuario" autoComplete="email" placeholder="Email address" required />
            </div>
            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" name="contraseña" autoComplete="current-password" placeholder="Password" id="id_password" required />
                <i className="far fa-eye" id="togglePassword" style={{ cursor: 'pointer' }}></i>
            </div>
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
    )
}

export default LoginCmp