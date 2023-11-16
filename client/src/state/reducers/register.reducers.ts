import { ACTION } from 'state/actions/register.actions';
import { registerActionsTypes } from 'state/actions-types/register.actions-types';

interface STATE {
    loading: boolean,
    res?: IRegisterRes,
    errMsg?: string
}

const initialState = {
    loading: false,
    res: undefined,
    errMsg: undefined
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
                errMsg: action.payload
            }

        default:
            return state;
    }
}