import { quotesActionsTypes } from "../actions-types/quotes.actions-types";

// interface PostQuote {
//     type: quotesActionsTypes.POST_QUOTE,
//     payload: IQuote
// }

interface QuotesLoading {
    type: quotesActionsTypes.QUOTES_LOADING
}

interface GetAllQuotes {
    type: quotesActionsTypes.GET_ALL_QUOTES,
    payload: IResponse
}

interface QuotesFailed {
    type: quotesActionsTypes.QUOTES_FAILED,
    payload: string
}

export type ACTION = QuotesLoading | GetAllQuotes | QuotesFailed