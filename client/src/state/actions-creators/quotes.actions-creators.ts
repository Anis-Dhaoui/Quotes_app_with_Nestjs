import { baseUrl } from '../../shared/baseURL';
import { quotesActionsTypes } from './../actions-types/quotes.actions-types';
import { ACTION } from './../actions/quotes.actions';
import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchQuotes = (p: number = 1, l: number = 5) => {

    return async (dispatch: Dispatch<ACTION>) => {
        dispatch({
            type: quotesActionsTypes.QUOTES_LOADING
        });

        try {
            const { data } = await axios.get(`${baseUrl}/quotes?page=${p}&limit=${l}`);

            dispatch({
                type: quotesActionsTypes.GET_ALL_QUOTES,
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