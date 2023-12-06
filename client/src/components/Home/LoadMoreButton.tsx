import React, { useState } from 'react'
import Loader from 'shared/loader/loader';
import { useAppDispatch, useAppSelector } from 'state/store.state';
import { loadMoreQuotes } from 'state/actions-creators/quotes.actions-creators';

function LoadMoreButton() {
    const dispatch = useAppDispatch();
    const { quotes, docCount, loadMoreLoading, loadMoreError } = useAppSelector(state => state.quotes);
    var [indexLoadMore, setIndexLoadMore] = useState(9);

    const handleLoadMorePage = () => {
        setIndexLoadMore(indexLoadMore + 9);
        dispatch(loadMoreQuotes(indexLoadMore, 9, ""));
    }

    if (loadMoreLoading) {
        return <Loader />
    }
    console.log(quotes)

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