import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/store.state';
import { fetchQuotes } from '../../state/actions-creators/quotes.actions-creators';
import RenderQuote from './card/quote.card.home';


function HomeCmp() {
    const dispatch = useAppDispatch();
    const { loading, quotes, error } = useAppSelector(state => state.quotes);
    useEffect(() => {
        dispatch(fetchQuotes());
    }, [])
    console.log(loading);
    console.log(quotes);
    console.log(error);

    return (
        <RenderQuote />
    )
}

export default HomeCmp