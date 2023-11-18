import { quotesActionsTypes } from "state/actions-types/quotes.actions-types"
import { ACTION } from "state/actions/quotes.actions"

interface STATE {
    loading?: any,
    quotes?: IQuotesRes | any,
    error?: string | null,

    likeReq?: boolean,
    likeSuccess?: string,
    likeError?: string | null,

    unlikeReq?: boolean,
    unlikeSuccess?: string,
    unlikeError?: string | null
}

const initialState = {
    loading: false,
    quotes: undefined,
    error: null,

    likeReq: false,
    likeSuccess: undefined,
    likeError: null,

    unlikeReq: false,
    unlikeSuccess: undefined,
    unlikeError: null
}

export const quoteRed = (state: STATE = initialState, action: ACTION): STATE => {
    switch (action.type) {
        case quotesActionsTypes.QUOTES_LOADING:
            return {
                ...state,
                loading: true
            }
        case quotesActionsTypes.QUOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                quotes: action.payload
            }
        case quotesActionsTypes.QUOTES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }



        case quotesActionsTypes.LIKE_QUOTE_REQ:
            return {
                ...state,
                likeReq: true,
            }
        case quotesActionsTypes.LIKE_QUOTES_SUCCESS:
            var { quoteID, user } = action.payload;
            // Find the index of the quote to be updated
            var quoteIndex = state.quotes.quotesData.findIndex((item: any) => item._id === quoteID);
            // Create a new array with the updated likedBy property for the specific quote
            var updatedQuotesData = [...state.quotes.quotesData];
            updatedQuotesData[quoteIndex] = {
                ...updatedQuotesData[quoteIndex],
                likedBy: [...updatedQuotesData[quoteIndex].likedBy, user],
            };
            return {
                ...state,
                likeReq: false,
                likeSuccess: action.payload,
                quotes: {
                    ...state.quotes,
                    quotesData: updatedQuotesData,
                },
            };
        case quotesActionsTypes.LIKE_QUOTES_FAILED:
            return {
                ...state,
                likeReq: false,
                likeError: action.payload
            }




        case quotesActionsTypes.UNLIKE_QUOTE_REQ:
            return {
                ...state,
                unlikeReq: true,
            }
        case quotesActionsTypes.UNLIKE_QUOTES_SUCCESS:
            var { qID, us } = action.payload;
            // Find the index of the quote to be updated
            var qIndex = state.quotes.quotesData.findIndex((item: any) => item._id === qID);
            // Create a new array with the updated likedBy property for the specific quote
            var updatedQD = [...state.quotes.quotesData];
            updatedQD[qIndex] = {
                ...updatedQD[qIndex],
                likedBy: [...updatedQD[qIndex].likedBy.filter((item: any) => item !== us)],
            };
            return {
                ...state,
                unlikeReq: false,
                unlikeSuccess: action.payload,
                quotes: {
                    ...state.quotes,
                    quotesData: updatedQD,
                },
            };
        case quotesActionsTypes.UNLIKE_QUOTES_FAILED:
            return {
                ...state,
                unlikeReq: false,
                unlikeError: action.payload
            }

        default:
            return state;
    }
}