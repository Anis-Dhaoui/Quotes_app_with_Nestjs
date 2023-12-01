import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/store.state';
import { fetchQuotes } from 'state/actions-creators/quotes.actions-creators';
import RenderQuote from './card/quote.card.home';
import Loader from 'shared/loader/loader';

function HomeCmp() {
    const dispatch = useAppDispatch();
    const { loading, quotes, error } = useAppSelector(state => state.quotes);
    useEffect(() => {
        dispatch(fetchQuotes(0, 9, ""));
    }, [dispatch])

    if (loading) {
        return <Loader />
    }

    if (error) {
        return (
            <div className="alert alert-danger my-5 mx-5" role="alert">
                {error}
            </div>
        )
    }
    return (
        <>
            <RenderQuote loading={loading} quotes={quotes} error={error} />
            <button className="btn btn-primary btn-lg btn-block">Load More</button>
        </>
    )
}

export default HomeCmp