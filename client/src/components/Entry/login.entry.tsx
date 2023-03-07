import React from 'react'
import { useAppDispatch, useAppSelector } from '../../state/store.state';
import { handleLogin } from '../../state/actions-creators/login.actions-creators';
import { useForm, SubmitHandler } from "react-hook-form";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

/* eslint-disable @typescript-eslint/no-unused-vars */
function LoginCmp() {
    const dispatch = useAppDispatch();
    const { loading, user, errMsg } = useAppSelector(state => state.login);
    let { register, handleSubmit, watch, formState: { errors } } = useForm<ILoginReq>({ mode: 'all' });
    const onSubmit: SubmitHandler<ILoginReq> = (data) => {
        dispatch(handleLogin(data));
    }
    // Reusable function to handle Error messages of all input fields
    const tooltipErrMsg = (errMsg: string | undefined) => {
        if (errMsg) {
            return (
                <Tooltip> {errMsg} </Tooltip>
            )
        }
        return <></>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
            <h2 className="title">Login</h2>
            <OverlayTrigger overlay={tooltipErrMsg(errors.email?.message)}>
                <div className={errors.email ? 'input-field fail' : 'input-field success'}>
                    <i className="fas fa-user"></i>
                    <input type="email" autoComplete="email" placeholder="Email address"
                        {...register("email",
                            {
                                required: "Required field",
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: 'Email is not valid.'
                                }
                            })
                        }
                        name="email"
                    />
                </div>
            </OverlayTrigger>

            <OverlayTrigger overlay={tooltipErrMsg(errors.password?.message)}>
                <div className={errors.password ? 'input-field fail' : 'input-field success'}>
                    <i className="fas fa-lock"></i>
                    <input type="password" autoComplete="current-password" placeholder="Password" id="id_password"
                        {...register("password",
                            {
                                required: "Required field"
                            })
                        }
                        name="password"
                    />
                    <i className="far fa-eye" id="togglePassword" style={{ cursor: 'pointer' }}></i>
                </div>
            </OverlayTrigger>

            <a className="pass" href="/#">Forgot your password?</a>
            <button disabled={loading} type="submit" style={{ width: '180px' }} className="entry-btn solid">
                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Sign in'}
            </button>

            <p className="social-text">You can login with:</p>
            <div className="social-media">
                <a href="/#" className="social-icon" aria-label="Register with Google">
                    <i className="fab fa-google"></i>
                </a>
                <a href="/#" className="social-icon" aria-label="Register with Discord">
                    <i className="fab fa-discord"></i>
                </a>
                <a href="/#" className="social-icon" aria-label="Register with Twitter">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="/#" className="social-icon">
                    <i className="fab fa-facebook-f" aria-label="Register with Facebook"></i>
                </a>
            </div>
        </form>
    )
}

export default LoginCmp