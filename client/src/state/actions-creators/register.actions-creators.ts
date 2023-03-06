import { registerActionsTypes } from './../actions-types/register.actions-types';
import { baseUrl } from '../../shared/baseURL';
import { ACTION } from './../actions/register.actions';
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
export const handleRegister = (inputs: IRegisterReqBody) => {

    return async (dispatch: Dispatch<ACTION>) => {
        dispatch({
            type: registerActionsTypes.REGISTER_LOADING
        });

        try {
            const { data } = await axios.post<IRegisterRes>(`${baseUrl}/auth/register`, inputs);
            dispatch({
                type: registerActionsTypes.REGISTER_SUCCESS,
                payload: data
            });

        } catch (err: any) {
            dispatch({
                type: registerActionsTypes.REGISTER_FAILED,
                payload: err.response.data
            });
        }
    }
} 