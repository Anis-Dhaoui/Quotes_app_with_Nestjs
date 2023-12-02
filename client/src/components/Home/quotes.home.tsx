import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/store.state';
import { fetchQuotes } from 'state/actions-creators/quotes.actions-creators';
import RenderQuote from './card/quote.card.home';
import Loader from 'shared/loader/loader';

function HomeCmp() {
    const dispatch = useAppDispatch();
    const { loading, quotes, error } = useAppSelector(state => state.quotes);
    var [indexLoadMore, setIndexLoadMore] = useState(0);
    console.log(quotes)
    const handleLoadMorePage = () => {
        setIndexLoadMore(indexLoadMore + 3);
        dispatch(fetchQuotes(indexLoadMore, 3, ""));
    }
    useEffect(() => {
        console.log("HHHHHHHHHHHHHHHHHHHHhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        dispatch(fetchQuotes(indexLoadMore, 3, ""));
        setIndexLoadMore(3);
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
            <button onClick={handleLoadMorePage} className="btn btn-primary btn-lg btn-block">Load More</button>
        </>
    )
}

export default HomeCmp