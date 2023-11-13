import { quotesActionsTypes } from "../actions-types/quotes.actions-types";

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



interface QuotesLikeReq {
    type: quotesActionsTypes.QUOTES_LIKE_REQ
}

interface QuotesLikeSuccess {
    type: quotesActionsTypes.QUOTES_LIKE_SUCCESS,
    payload: string
}

interface QuotesLikeFailed {
    type: quotesActionsTypes.QUOTES_LIKE_FAILED,
    payload: string
}

export type ACTION = QuotesLoading | GetAllQuotes | QuotesFailed | QuotesLikeReq | QuotesLikeSuccess | QuotesLikeFailed