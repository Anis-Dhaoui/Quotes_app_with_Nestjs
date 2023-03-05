import { loginActionsTypes } from "../actions-types/login.actions-types"

interface LoginLoading {
    type: loginActionsTypes.LOGIN_LOADING
}

interface LoginFailed {
    type: loginActionsTypes.LOGIN_FAILED,
    payload: {}
}

interface LoginSuccess {
    type: loginActionsTypes.LOGIN_SUCCESS,
    payload: {}
}

export type ACTION = LoginLoading | LoginFailed | LoginSuccess