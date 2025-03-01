import { quotesActionsTypes } from "state/actions-types/quotes.actions-types"
import { ACTION } from "state/actions/quotes.actions"

interface STATE {
    loading?: any,
    quotes?: IQuotesRes | any,
    error?: string | null,
    docCount: number,

    LoadMoreQuotesLoading?: boolean,
    loadedQuotes?: IQuotesRes,
    loadMoreError?: string | null

    likeReq?: boolean,
    likeSuccess?: string,
    likeError?: string | null,

    unlikeReq?: boolean,
    unlikeSuccess?: string,
    unlikeError?: string | null,

    popularQuotesReq: boolean,
    popularQuotesRes: any,
    popularQuotesErr: string | null
}

const initialState = {
    loading: false,
    quotes: undefined,
    error: null,
    docCount: 0,

    LoadMoreQuotesLoading: false,
    loadedQuotes: undefined,
    loadMoreError: null,

    likeReq: false,
    likeSuccess: undefined,
    likeError: null,

    unlikeReq: false,
    unlikeSuccess: undefined,
    unlikeError: null,

    popularQuotesReq: false,
    popularQuotesRes: undefined,
    popularQuotesErr: null
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
                quotes: action.payload,
                docCount: action.payload.docCount
            }

        case quotesActionsTypes.QUOTES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }



        case quotesActionsTypes.POPULAR_QUOTES_REQ:
            return {
                ...state,
                popularQuotesReq: true
            }

        case quotesActionsTypes.POPULAR_QUOTES_RES:
            return {
                ...state,
                popularQuotesReq: false,
                popularQuotesRes: action.payload
            }

        case quotesActionsTypes.POPULAR_QUOTES_ERR:
            return {
                ...state,
                popularQuotesReq: false,
                popularQuotesErr: action.payload
            }



        case quotesActionsTypes.LOAD_MORE_LOADING:
            return {
                ...state,
                LoadMoreQuotesLoading: true
            }

        case quotesActionsTypes.LOAD_MORE_SUCCESS:
            return {
                ...state,
                LoadMoreQuotesLoading: false,
                quotes: { message: action.payload.message, quotesData: [...state.quotes.quotesData, ...action.payload.quotesData] },
                docCount: action.payload.docCount
            }

        case quotesActionsTypes.LOAD_MORE_FAILED:
            return {
                ...state,
                LoadMoreQuotesLoading: false,
                loadMoreError: action.payload
            }


        case quotesActionsTypes.LIKE_QUOTE_REQ:
            return {
                ...state,
                likeReq: true,
            }
        case quotesActionsTypes.LIKE_QUOTES_SUCCESS:
            var { quoteID, user }: any = action.payload;
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
            // eslint-disable-next-line
            var { quoteID, user }: any = action.payload;
            // Find the index of the quote to be updated
            const qIndex = state.quotes.quotesData.findIndex((item: any) => item._id === quoteID);
            // Create a new array with the updated likedBy property for the specific quote
            const updatedQD = [...state.quotes.quotesData];
            updatedQD[qIndex] = {
                ...updatedQD[qIndex],
                likedBy: [...updatedQD[qIndex].likedBy.filter((item: any) => item !== user)],
            };

            // updatedQuotesData[quoteIndex] = {
            //     ...updatedQuotesData[quoteIndex],
            //     likedBy: [...updatedQuotesData[quoteIndex].likedBy, user],
            // };
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