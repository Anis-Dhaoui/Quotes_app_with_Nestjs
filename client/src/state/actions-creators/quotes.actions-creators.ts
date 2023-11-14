import { quotesActionsTypes } from './../actions-types/quotes.actions-types';
import { ACTION } from './../actions/quotes.actions';
import axios from 'axios';
import { Dispatch } from 'redux';
import { axiosInstance } from './axiosHeaderInstance';
import { toast } from 'react-toastify';

export const fetchQuotes = (p: number = 0, l: number = 25, c: string = "") => {

    return async (dispatch: Dispatch<ACTION>) => {
        dispatch({
            type: quotesActionsTypes.QUOTES_LOADING
        });

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/quotes?page=${p}&limit=${l}&category=${c}`);

            dispatch({
                type: quotesActionsTypes.QUOTES_SUCCESS,
                payload: data
            });

        } catch (err: any) {
            dispatch({
                type: quotesActionsTypes.QUOTES_FAILED,
                payload: err.message
            });
        }
    }
}


export const likeQuote = (quoteID: string) => {
    return async (dispatch: Dispatch<ACTION>) => {
        dispatch({
            type: quotesActionsTypes.QUOTES_LIKE_REQ
        });
        const toastId = toast.loading('Please wait...')
        try {
            const { data } = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/interactions/${quoteID}`);
            dispatch({
                type: quotesActionsTypes.QUOTES_LIKE_SUCCESS,
                payload: data
            });

        } catch (err: any) {
            dispatch({
                type: quotesActionsTypes.QUOTES_LIKE_FAILED,
                payload: err.message
            });
            // toast.update(toastId, { render: err.message, type: "error", isLoading: false, autoClose: 3000, closeButton: true, closeOnClick: true });

        }
    }
}