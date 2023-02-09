import { quotesActionsTypes } from "../actions-types/quotes.actions-types"
import { ACTION } from "../actions/quotes.actions"

interface STATE {
    loading: boolean,
    quotes?: IQuote[],
    error?: string | null
}

const initialState = {
    loading: false,
    quotes: [],
    error: null
}

export const quoteRed = (state: STATE = initialState, action: ACTION): STATE => {
    switch (action.type) {
        case quotesActionsTypes.QUOTES_LOADING:
            return {
                loading: true
            }

        case quotesActionsTypes.GET_ALL_QUOTES:
            return {
                loading: false,
                quotes: action.payload
            }

        case quotesActionsTypes.QUOTES_FAILED:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}