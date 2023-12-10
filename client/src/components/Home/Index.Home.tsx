import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'state/store.state';
import { fetchQuotes } from 'state/actions-creators/quotes.actions-creators';
import RenderQuotes from './RenderQuotes/RenderQuotes';
import Loader from 'shared/loader/loader';
import LoadMoreButton from './LoadMoreButton';

function Index() {
    const dispatch = useAppDispatch();
    const { loading, quotes, error } = useAppSelector(state => state.quotes);
    const { isAuthenticated } = useAppSelector(state => state.login);

    useEffect(() => {
        dispatch(fetchQuotes(0, 3, "", isAuthenticated));
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
            <RenderQuotes loading={loading} quotes={quotes} error={error} />
            <LoadMoreButton />
        </>
    )
}

export default Index