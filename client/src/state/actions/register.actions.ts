import { registerActionsTypes } from './../actions-types/register.actions-types';

interface RegisterLoading {
    type: registerActionsTypes.REGISTER_LOADING
}

interface RegisterFailed {
    type: registerActionsTypes.REGISTER_FAILED,
    payload: IRegisterRes
}
interface RegisterSuccess {
    type: registerActionsTypes.REGISTER_SUCCESS,
    payload: IRegisterRes
}

export type ACTION = RegisterLoading | RegisterFailed | RegisterSuccess