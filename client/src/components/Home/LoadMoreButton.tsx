import React, { useState } from 'react'
import Loader from 'shared/loader/loader';
import { useAppDispatch, useAppSelector } from 'state/store.state';
import { LoadMoreQuotesSuccess } from 'state/actions-creators/quotes.actions-creators';

function LoadMoreButton() {
    const dispatch = useAppDispatch();
    const { quotes, docCount, LoadMoreQuotesLoading, loadMoreError } = useAppSelector(state => state.quotes);
    const { isAuthenticated } = useAppSelector(state => state.login);

    var [indexLoadMore, setIndexLoadMore] = useState(12);

    const handleLoadMorePage = () => {
        setIndexLoadMore(indexLoadMore + 12);
        dispatch(LoadMoreQuotesSuccess(indexLoadMore, 12, "", isAuthenticated));
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

// {
//     author: "Test Test"
//     authorPic: "images/img.jpg"
//     category: "Happiness"
//     createdAt: "2023-11-02T21:06:13.232Z"
//     likedBy: ['63c446853e6fa1e888823b3d', '63c82cccbe221c116dafd16b']
//     owner: "6484e9c75621bfb240364907"
//     quote: "quotes text."
//     status: "allowed"
//     updatedAt: "2023-12-06T07:14:32.320Z"
//     _id: "65440f45db0ccac073bc76ff"
// }