import { quotesActionsTypes } from 'state/actions-types/quotes.actions-types';
import { ACTION } from 'state/actions/quotes.actions';
import { Dispatch } from 'redux';
import { axiosInstance } from './axiosHeaderInstance';
import { toast } from 'react-toastify';

export const fetchQuotes = (p: number, l: number, c?: string, isAuthenticated?: boolean) => {
    return async (dispatch: Dispatch<ACTION>) => {
        dispatch({
            type: quotesActionsTypes.QUOTES_LOADING
        });
        try {
            let data: any;
            if (!isAuthenticated) {
                data = await axiosInstance.get(`${process.env.REACT_APP_BASE_URL}/quotes?page=${p}&limit=${l}&category=${c}`);
            } else {
                data = await axiosInstance.get(`${process.env.REACT_APP_BASE_URL}/quotes/interests/?page=${p}&limit=${l}&category=${c}`);
            }

            dispatch({
                type: quotesActionsTypes.QUOTES_SUCCESS,
                payload: data.data
            });

        } catch (err: any) {
            dispatch({
                type: quotesActionsTypes.QUOTES_FAILED,
                payload: err.message
            });
        }
    }
}


export const fetchPopularQuotes = () => {
    return async (dispatch: Dispatch<ACTION>) => {
        dispatch({
            type: quotesActionsTypes.POPULAR_QUOTES_REQ
        })

        try {
            const { data } = await axiosInstance.get(`${process.env.REACT_APP_BASE_URL}/quotes/popular-quotes`);
            dispatch({
                type: quotesActionsTypes.POPULAR_QUOTES_RES,
                payload: data
            })
        } catch (err: any) {
            dispatch({
                type: quotesActionsTypes.POPULAR_QUOTES_ERR,
                payload: err.message
            })
        }
    }
}


export const loadMoreQuotes = (p: number, l: number, c?: string, isAuthenticated?: boolean) => {

    return async (dispatch: Dispatch<ACTION>) => {
        dispatch({
            type: quotesActionsTypes.LOAD_MORE_LOADING
        });

        try {
            let data: any;
            if (!isAuthenticated) {
                data = await axiosInstance.get(`${process.env.REACT_APP_BASE_URL}/quotes?page=${p}&limit=${l}&category=${c}`);
            } else {
                data = await axiosInstance.get(`${process.env.REACT_APP_BASE_URL}/quotes/interests/?page=${p}&limit=${l}&category=${c}`);
            }
            dispatch({
                type: quotesActionsTypes.LOAD_MORE_SUCCESS,
                payload: data.data
            });

        } catch (err: any) {
            dispatch({
                type: quotesActionsTypes.LOAD_MORE_FAILED,
                payload: err.message
            });
        }
    }
}


export const likeQuote = (quoteID: string) => {
    return async (dispatch: Dispatch<ACTION>) => {
        dispatch({
            type: quotesActionsTypes.LIKE_QUOTE_REQ
        });

        try {
            const { data } = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/interactions/${quoteID}`);
            dispatch({
                type: quotesActionsTypes.LIKE_QUOTES_SUCCESS,
                payload: data
            });

        } catch (err: any) {
            dispatch({
                type: quotesActionsTypes.LIKE_QUOTES_FAILED,
                payload: err.message
            });

            toast(err.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error"
            });
        }
    }
}


export const UnlikeQuote = (quoteID: string) => {
    return async (dispatch: Dispatch<ACTION>) => {
        dispatch({
            type: quotesActionsTypes.UNLIKE_QUOTE_REQ
        });

        try {
            const { data } = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/interactions/${quoteID}`);
            dispatch({
                type: quotesActionsTypes.UNLIKE_QUOTES_SUCCESS,
                payload: data
            });

        } catch (err: any) {
            dispatch({
                type: quotesActionsTypes.UNLIKE_QUOTES_FAILED,
                payload: err.message
            });

            toast(err.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error"
            });
        }
    }
}