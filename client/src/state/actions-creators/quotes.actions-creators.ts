import { quotesActionsTypes } from './../actions-types/quotes.actions-types';
import { ACTION } from './../actions/quotes.actions';
import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchQuotes = (p: number = 0, l: number = 10, c: string = "") => {

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