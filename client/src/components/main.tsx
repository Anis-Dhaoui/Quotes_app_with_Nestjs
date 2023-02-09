import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { fetchQuotes } from '../state/actions-creators/quotes.actions-creators';
import { useAppDispatch } from '../state/store.state';

export default function Main() {
    const dispatch = useAppDispatch();
    const state = useSelector(state => state);
    //    const { quotes, loading, error } = useTypedSelector((state) => state.quotes);
    console.log(state)

    useEffect(() => {
        dispatch(fetchQuotes())

    }, [dispatch])

    return (
        <div>Main Component</div>
    )
}
