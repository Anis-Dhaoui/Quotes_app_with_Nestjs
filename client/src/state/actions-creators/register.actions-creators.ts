import { registerActionsTypes } from './../actions-types/register.actions-types';
import { baseUrl } from '../../shared/baseURL';
import { ACTION } from './../actions/register.actions';
import axios from 'axios';
import { Dispatch } from 'redux';

export const register = (inputs: IRegisterReqBody) => {

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
                payload: err.message
            });
        }
    }
} 