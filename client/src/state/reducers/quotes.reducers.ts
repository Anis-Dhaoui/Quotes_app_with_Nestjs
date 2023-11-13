import { quotesActionsTypes } from "../actions-types/quotes.actions-types"
import { ACTION } from "../actions/quotes.actions"

interface STATE {
    loading?: any,
    quotes?: IQuotesRes,
    error?: string | null,

    likeReq?: boolean,
    likeSuccess?: string,
    likeError?: string | null
}

const initialState = {
    loading: false,
    quotes: undefined,
    error: null,

    likeReq: false,
    likeSuccess: undefined,
    likeError: null
}

export const quoteRed = (state: STATE = initialState, action: ACTION): STATE => {
    switch (action.type) {
        case quotesActionsTypes.QUOTES_LOADING:
            return {...state,
                loading: true
            }
        case quotesActionsTypes.QUOTES_SUCCESS:
            return {...state,
                loading: false,
                quotes: action.payload
            }
        case quotesActionsTypes.QUOTES_FAILED:
            return {...state,
                loading: false,
                error: action.payload
            }



        case quotesActionsTypes.QUOTES_LIKE_REQ:
            return {...state,
                likeReq: true,
            }
        case quotesActionsTypes.QUOTES_LIKE_SUCCESS:
            return {...state,
                likeReq: false,
                likeSuccess: action.payload
            }
        case quotesActionsTypes.QUOTES_LIKE_FAILED:
            return {...state,
                likeReq: false,
                likeError: action.payload
            }

        default:
            return state;
    }
}