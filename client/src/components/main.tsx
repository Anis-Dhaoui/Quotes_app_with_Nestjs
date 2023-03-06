import React, { useEffect } from 'react'
import HeaderCmp from './Header/navbar/navbar.Header'
import { Routes, Route } from 'react-router';
import EntryCmp from './Entry/login-register.entry';
import HomeCmp from './Home/quotes.home';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import { fetchQuotes } from '../state/actions-creators/quotes.actions-creators';
// import { useAppDispatch, useAppSelector } from '../state/store.state';

export default function Main() {
    // const dispatch = useAppDispatch();
    // const { quotes, loading, error } = useAppSelector(state => state.quotes);


    // useEffect(() => {
    //     dispatch(fetchQuotes())

    // }, [dispatch])

    // const renderQuotes = () => {
    //     if (loading) {
    //         return <p>Loading...</p>
    //     }
    //     if (error) {
    //         return <p> {error} </p>
    //     }
    //     if (quotes && quotes.quotesData) {
    //         const allQuotes: IQuote[] = quotes!.quotesData;
    //         console.log(allQuotes)
    //         return (
    //             allQuotes.map(item => {
    //                 return (
    //                     <h3 key={item._id}> {item.author} </h3>
    //                 )
    //             })
    //         )
    //     }
    // }

    return (
        <>
            {/* <HeaderCmp /> */}
            <ToastContainer autoClose={3000} theme="colored" />
            <Routes>
                <Route path='/' element={[<HeaderCmp />, <HomeCmp />]} />
                <Route path='/entry' element={<EntryCmp />} />
            </Routes>

            <div className='mt-5'>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
                <h1>aaaaaaaaaaaaaaaa</h1>
            </div>
        </>
    )
}
