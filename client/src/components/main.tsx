import React, { useEffect } from 'react'
import { fetchQuotes } from '../state/actions-creators/quotes.actions-creators';
import { useAppDispatch, useAppSelector } from '../state/store.state';

export default function Main() {
    const dispatch = useAppDispatch();
    const { quotes, loading, error } = useAppSelector(state => state.quotes);


    useEffect(() => {
        dispatch(fetchQuotes())

    }, [dispatch])

    const renderQuotes = () => {
        if (loading) {
            return <p>Loading...</p>
        }
        if (error) {
            return <p> {error} </p>
        }
        if (quotes && quotes.quotesData) {
            const allQuotes: IQuote[] = quotes!.quotesData;
            console.log(allQuotes)
            return (
                allQuotes.map(item => {
                    return (
                        <h3 key={item._id}> {item.author} </h3>
                    )
                })
            )
        }
    }

    return (
        <div>
            {renderQuotes()}
        </div>

    )
}
