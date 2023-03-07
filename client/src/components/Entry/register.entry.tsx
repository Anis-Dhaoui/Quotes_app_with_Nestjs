import React, { useState } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import { interestsList, INTERESTS } from './interestsList.entry';
import { useForm, SubmitHandler } from "react-hook-form";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../state/store.state';
import { handleRegister } from '../../state/actions-creators/register.actions-creators';

/* eslint-disable @typescript-eslint/no-unused-vars */
function RegisterCmp() {
    const dispatch = useAppDispatch();
    const { loading, res, errMsg } = useAppSelector(state => state.register);
    let { register, handleSubmit, watch, formState: { errors } } = useForm<IRegisterReq>({ mode: 'all' });
    const onSubmit: SubmitHandler<IRegisterReq> = (data) => {
        data.interests = selectedItems;
        dispatch(handleRegister(data));
    }

    const [selectedItems, setSelectedItems] = useState<INTERESTS[]>([]);
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
        <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
            <h2 className="title">Register</h2>
            <div className="row">
                <OverlayTrigger show={true} overlay={tooltipErrMsg(errors.firstName?.message)} >
                    <div className={errors.firstName ? 'input-field col-md-5 offset-md-1 mr-1 col fail' : 'input-field col-md-5 offset-md-1 mr-1 col success'}>
                        <i className="fas fa-user"></i>
                        <input type="text" autoComplete="given-name" placeholder="First name"
                            {...register("firstName",
                                {
                                    required: "Required field",
                                    minLength: {
                                        value: 3,
                                        message: "First name should have at least 3 caracters"
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "First name should have at most 10 caracters"
                                    }
                                })
                            }
                            name='firstName'
                        />
                    </div>
                </OverlayTrigger>

                <OverlayTrigger show={true} overlay={tooltipErrMsg(errors.lastName?.message)}>
                    <div className={errors.lastName ? 'input-field col-md-5 col fail' : 'input-field col-md-5 col success'}>
                        <i className="fas fa-user"></i>
                        <input type="text" autoComplete="given-name" placeholder="First name"
                            {...register("lastName",
                                {
                                    required: "Required field",
                                    minLength: {
                                        value: 3,
                                        message: "Last name should have at least 3 caracters"
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Last name should have at most 10 caracters"
                                    }
                                })
                            }
                            name='lastName'
                        />
                    </div>
                </OverlayTrigger>
            </div>

            <OverlayTrigger show={true} placement='right' overlay={tooltipErrMsg(errors.email?.message)}>
                <div className={errors.email ? 'input-field fail' : 'input-field success'}>
                    <i className="fas fa-envelope"></i>
                    <input type="email" autoComplete="email" placeholder="Email"
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

            <OverlayTrigger show={true} placement='right' overlay={tooltipErrMsg(errors.password?.message)}>
                <div className={errors.password ? 'input-field fail' : 'input-field success'}>
                    <i className="fas fa-lock"></i>
                    <input type="password" autoComplete='current-password' placeholder="Password" id="id_reg"
                        {...register("password",
                            {
                                required: "Required field",
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                                    message: 'Password should be combination of [a-z, A-Z, 0-9] with at least 8 characters'
                                }
                            })
                        }
                        name="password"
                    />
                    <i className="far fa-eye" id="toggleReg" style={{ cursor: 'pointer' }}></i>
                </div>
            </OverlayTrigger>

            <OverlayTrigger show={true} placement='right' overlay={tooltipErrMsg(errors.interests?.message)}>
                <div className={errors.interests ? 'interests-list fail' : 'interests-list success'}>
                    <i className="fas fa-list-check"></i>
                    <Multiselect
                        onRemove={(items: INTERESTS[]) => { setSelectedItems([...items]) }}
                        onSelect={(items: INTERESTS[]) => { setSelectedItems([...items]) }}
                        isObject={false}
                        options={interestsList}
                        showArrow
                        showCheckbox
                        hidePlaceholder
                        placeholder='Choose your interests'
                        avoidHighlightFirstOption={true}
                        {...register('interests',
                            {
                                required: selectedItems.length < 3 ? 'Select at least 3 categories' : '',
                            }
                        )}
                    />
                </div>
            </OverlayTrigger>

            <label className="check">
                <input type="checkbox" />
                <span className="checkmark"> I accept the <a href="terms.html">terms and services</a></span>
            </label>
            <button disabled={loading} type="submit" style={{ width: '180px' }} className="entry-btn solid">
                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Create account'}
            </button>

            <p className="social-text">You can register with:</p>
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

export default RegisterCmp