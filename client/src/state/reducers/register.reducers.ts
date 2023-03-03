import { ACTION } from '../actions/register.actions';
import { registerActionsTypes } from './../actions-types/register.actions-types';

interface STATE {
    loading: boolean,
    res?: IRegisterRes
}

const initialState = {
    loading: false,
    res: undefined
}

export const registerRed = (state: STATE = initialState, action: ACTION): STATE => {
    switch (action.type) {
        case registerActionsTypes.REGISTER_LOADING:
            return {
                loading: true
            }

        case registerActionsTypes.REGISTER_SUCCESS:
            return {
                loading: false,
                res: action.payload
            }

        case registerActionsTypes.REGISTER_FAILED:
            return {
                loading: false,
                res: action.payload
            }

        default:
            return state;
    }
}