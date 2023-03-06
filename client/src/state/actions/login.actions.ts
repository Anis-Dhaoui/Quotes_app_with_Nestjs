import { loginActionsTypes } from "../actions-types/login.actions-types"

interface LoginLoading {
    type: loginActionsTypes.LOGIN_LOADING
}

interface LoginFailed {
    type: loginActionsTypes.LOGIN_FAILED,
    payload: string
}

interface LoginSuccess {
    type: loginActionsTypes.LOGIN_SUCCESS,
    payload: ILoginRes
}

export type ACTION = LoginLoading | LoginFailed | LoginSuccess