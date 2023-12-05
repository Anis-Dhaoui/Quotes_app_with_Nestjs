import React, { useState } from 'react'
import Loader from 'shared/loader/loader';
import { useAppDispatch, useAppSelector } from 'state/store.state';
import { loadMoreQuotes } from 'state/actions-creators/quotes.actions-creators';

function LoadMoreButton() {
    const dispatch = useAppDispatch();
    const { quotes, docCount, loadMoreLoading, loadMoreError } = useAppSelector(state => state.quotes);
    var [indexLoadMore, setIndexLoadMore] = useState(3);

    const handleLoadMorePage = () => {
        setIndexLoadMore(indexLoadMore + 3);
        dispatch(loadMoreQuotes(indexLoadMore, 3, ""));
    }

    if (loadMoreLoading) {
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