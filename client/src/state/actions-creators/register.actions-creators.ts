import { toast } from 'react-toastify';
import { registerActionsTypes } from 'state/actions-types/register.actions-types';
import { ACTION } from 'state/actions/register.actions';
import axios from 'axios';
import { Dispatch } from 'redux';

//Test purpose
// const registerForm = {
//     firstName: 'Anis',
//     lastName: 'Dhaoui',
//     email: 'anis.dhaoui@gmyail.com',
//     password: 'AAAbbb123',
//     interests: ['Life']
// };
export const handleRegister = (inputs: IRegisterReq) => {

    return async (dispatch: Dispatch<ACTION>) => {
        dispatch({
            type: registerActionsTypes.REGISTER_LOADING
        });
        const toastId = toast.loading('Please wait...')
        try {
            const { data } = await axios.post<IRegisterRes>(`${process.env.REACT_APP_BASE_URL}/auth/register`, inputs);
            dispatch({
                type: registerActionsTypes.REGISTER_SUCCESS,
                payload: data
            });
            toast.update(toastId, { render: data.message, type: "success", isLoading: false, autoClose: 2000, closeButton: true, closeOnClick: true });
        } catch (err: any) {
            dispatch({
                type: registerActionsTypes.REGISTER_FAILED,
                payload: err.response.data
            });
            toast.update(toastId, { render: err.response.data.message, type: "error", isLoading: false, autoClose: 3000, closeButton: true, closeOnClick: true });
        }
    }
} 