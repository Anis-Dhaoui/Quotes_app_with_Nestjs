import { quotesActionsTypes } from "state/actions-types/quotes.actions-types";

// interface PostQuote {
//     type: quotesActionsTypes.POST_QUOTE,
//     payload: IQuote
// }

interface QuotesLoading {
    type: quotesActionsTypes.QUOTES_LOADING
}

interface GetAllQuotes {
    type: quotesActionsTypes.QUOTES_SUCCESS,
    payload: IQuotesRes
}

interface QuotesFailed {
    type: quotesActionsTypes.QUOTES_FAILED,
    payload: string
}


interface LoadMoreQuotesLoading {
    type: quotesActionsTypes.LOAD_MORE_LOADING
}

interface LoadMoreQuotesSuccess {
    type: quotesActionsTypes.LOAD_MORE_SUCCESS,
    payload: IQuotesRes
}

interface LoadMoreQuotesFailed {
    type: quotesActionsTypes.LOAD_MORE_FAILED,
    payload: string
}


interface LikeQuotesReq {
    type: quotesActionsTypes.LIKE_QUOTE_REQ
}

interface LikeQuotesSuccess {
    type: quotesActionsTypes.LIKE_QUOTES_SUCCESS,
    payload: any
}

interface LikeQuotesFailed {
    type: quotesActionsTypes.LIKE_QUOTES_FAILED,
    payload: string
}



interface UnlikeQuotesReq {
    type: quotesActionsTypes.UNLIKE_QUOTE_REQ
}

interface UnlikeQuotesSuccess {
    type: quotesActionsTypes.UNLIKE_QUOTES_SUCCESS,
    payload: any
}

interface UnlikeQuotesFailed {
    type: quotesActionsTypes.UNLIKE_QUOTES_FAILED,
    payload: string
}



interface FetchPopularQuotesReq {
    type: quotesActionsTypes.POPULAR_QUOTES_REQ
}

interface FetchPopularQuotesRes {
    type: quotesActionsTypes.POPULAR_QUOTES_RES,
    payload: IQuotesRes
}

interface FetchPopularQuotesErr {
    type: quotesActionsTypes.POPULAR_QUOTES_ERR,
    payload: string
}


export type ACTION = QuotesLoading | GetAllQuotes | QuotesFailed |
    LoadMoreQuotesLoading | LoadMoreQuotesSuccess | LoadMoreQuotesFailed |
    LikeQuotesReq | LikeQuotesSuccess | LikeQuotesFailed |
    UnlikeQuotesReq | UnlikeQuotesSuccess | UnlikeQuotesFailed |
    FetchPopularQuotesReq | FetchPopularQuotesRes | FetchPopularQuotesErr