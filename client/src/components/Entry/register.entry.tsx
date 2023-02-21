import React from 'react'

function RegisterCmp() {
    return (
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
                <span className="checkmark"> I accept the <a href="terms.html">terms and services</a></span>
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
    )
}

export default RegisterCmp