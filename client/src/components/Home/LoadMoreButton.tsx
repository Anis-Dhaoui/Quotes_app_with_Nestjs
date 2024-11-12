import React, { useState } from 'react'
import Loader from 'shared/loader/loader';
import { useAppDispatch, useAppSelector } from 'state/store.state';
import { LoadMoreQuotes } from 'state/actions-creators/quotes.actions-creators';

function LoadMoreButton(props: any) {
    const dispatch = useAppDispatch();
    const { quotes, docCount, LoadMoreQuotesLoading, loadMoreError } = useAppSelector(state => state.quotes);
    const { isAuthenticated } = useAppSelector(state => state.login);

    var [indexLoadMore, setIndexLoadMore] = useState(0);

    const handleLoadMorePage = () => {
        setIndexLoadMore(props.index);
        dispatch(LoadMoreQuotes(indexLoadMore, props.index, "", isAuthenticated, props.myquotes));
    }

    if (LoadMoreQuotesLoading) {
        return <Loader />
    }

    if (loadMoreError) {
        return (
            <div className="alert alert-danger my-5 mx-5 text-center" role="alert">
                {loadMoreError}
            </div>
        )
    }

    return (
        <button
            disabled={quotes?.quotesData.length >= docCount}
            onClick={handleLoadMorePage}
            className="btn btn-primary btn-lg btn-block"
        >
            Load More
        </button>
    )
}

export default LoadMoreButton