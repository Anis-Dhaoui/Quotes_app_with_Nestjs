import { ACTION } from 'state/actions/login.actions';
import { loginActionsTypes } from 'state/actions-types/login.actions-types';

interface STATE {
    loading: boolean,
    isAuthenticated?: boolean,
    user?: ILoginRes,
    errMsg?: string
}

const initialState = {
    loading: false,
    user: localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser')!) : null,
    isAuthenticated: localStorage.getItem('loggedUser') ? true : false,
    errMsg: undefined
}

export const loginRed = (state: STATE = initialState, action: ACTION): STATE => {
    switch (action.type) {
        case loginActionsTypes.LOGIN_LOADING:
            return {
                loading: true
            }

        case loginActionsTypes.LOGIN_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                isAuthenticated: true
            }

        case loginActionsTypes.LOGIN_FAILED:
            return {
                loading: false,
                errMsg: action.payload
            }

        default:
            return state;
    }
}