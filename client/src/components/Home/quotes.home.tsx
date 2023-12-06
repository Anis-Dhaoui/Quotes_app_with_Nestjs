import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'state/store.state';
import { fetchQuotes } from 'state/actions-creators/quotes.actions-creators';
import RenderQuote from './card/renderQuote.card.home';
import Loader from 'shared/loader/loader';
import LoadMoreButton from './LoadMoreButton';

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
            <LoadMoreButton />
        </>
    )
}

export default HomeCmp