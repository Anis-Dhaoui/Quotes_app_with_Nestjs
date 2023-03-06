import { toast } from 'react-toastify';
import { loginActionsTypes } from './../actions-types/login.actions-types';
import { baseUrl } from '../../shared/baseURL';
import { ACTION } from '../actions/login.actions';
import axios from 'axios';
import { Dispatch } from 'redux';

//Test purpose
// const loginForm = {
//     email: 'anis.dhaoui@gmyail.com',
//     password: 'AAAbbb123',
// };
export const handleLogin = (inputs: ILoginReq) => {

    return async (dispatch: Dispatch<ACTION>) => {
        dispatch({
            type: loginActionsTypes.LOGIN_LOADING
        });
        const toastId = toast.loading('Please wait...')
        try {
            const { data } = await axios.post<ILoginRes>(`${baseUrl}/auth/login`, inputs);
            dispatch({
                type: loginActionsTypes.LOGIN_SUCCESS,
                payload: data
            });
            localStorage.setItem('loggedUser', JSON.stringify(data));
            toast.update(toastId, { render: "Let's get in", type: "success", isLoading: false, autoClose: 2000, closeButton: true, closeOnClick: true });

        } catch (err: any) {
            dispatch({
                type: loginActionsTypes.LOGIN_FAILED,
                payload: err.response.data
            });
            toast.update(toastId, { render: err.response.data, type: "error", isLoading: false, autoClose: 2000, closeButton: true, closeOnClick: true });
        }
    }
} 