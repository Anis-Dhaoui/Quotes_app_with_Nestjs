import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/store.state';
import { fetchQuotes } from 'state/actions-creators/quotes.actions-creators';
import RenderQuote from './card/quote.card.home';
import Loader from 'shared/loader/loader';
import InfiniteScroll from 'react-infinite-scroll-component';


function HomeCmp() {
    const dispatch = useAppDispatch();
    const { loading, quotes, error } = useAppSelector(state => state.quotes);
    useEffect(() => {
        dispatch(fetchQuotes(0, 9, ""));
    }, [])

    const [hasMore, setHasMore] = useState(true)
    const fetchMoreData = () => {
        if(quotes.quotesData.length > 17){
            setHasMore(false)
        }
        dispatch(fetchQuotes(0, quotes.quotesData.length + 9, ""));
    };

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
    console.log(quotes?.quotesData.length)
    return (
        <InfiniteScroll
            dataLength={18}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
        >
            <RenderQuote loading={loading} quotes={quotes} error={error} />
            {/* <div>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div> */}
        </InfiniteScroll>
        
    )
}

export default HomeCmp