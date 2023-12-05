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


interface LoadMoreLoading {
    type: quotesActionsTypes.LOAD_MORE_LOADING
}

interface LoadMoreQuotes {
    type: quotesActionsTypes.LOAD_MORE_SUCCESS,
    payload: IQuotesRes
}

interface LoadMoreFailed {
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

export type ACTION = QuotesLoading | GetAllQuotes | QuotesFailed | LoadMoreLoading | LoadMoreQuotes | LoadMoreFailed | LikeQuotesReq | LikeQuotesSuccess | LikeQuotesFailed | UnlikeQuotesReq | UnlikeQuotesSuccess | UnlikeQuotesFailed