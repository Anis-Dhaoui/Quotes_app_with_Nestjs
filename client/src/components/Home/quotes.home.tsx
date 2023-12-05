import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/store.state';
import { fetchQuotes, loadMoreQuotes } from 'state/actions-creators/quotes.actions-creators';
import RenderQuote from './card/renderQuote.card.home';
import Loader from 'shared/loader/loader';

function HomeCmp() {
    const dispatch = useAppDispatch();
    const { loading, quotes, error } = useAppSelector(state => state.quotes);
    var [indexLoadMore, setIndexLoadMore] = useState(0);
    const [quotesList, setQuotesList] = useState<any>([]);


    const handleLoadMorePage = () => {
        setIndexLoadMore(indexLoadMore + 3);
        // dispatch(loadMoreQuotes(indexLoadMore, 3, ""));

        // if (quotes) {
        //     setQuotesList((prevData: any) => [...prevData, ...quotes?.quotesData])
        // }
    }
    useEffect(() => {
        dispatch(fetchQuotes());
        setIndexLoadMore(indexLoadMore + 3)
    }, [dispatch])

    console.log(quotes)
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