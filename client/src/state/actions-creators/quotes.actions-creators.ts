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

        try {
            const { data } = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/interactions/${quoteID}`);
            dispatch({
                type: quotesActionsTypes.QUOTES_LIKE_SUCCESS,
                payload: data
            });

        } catch (err: any) {
            console.log(err)
            dispatch({
                type: quotesActionsTypes.QUOTES_LIKE_FAILED,
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