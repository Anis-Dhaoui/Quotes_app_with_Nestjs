import React from 'react'
import HeaderCmp from './Header/navbar/navbar.Header'
import { Routes, Route } from 'react-router';
import EntryCmp from './Entry/login-register.entry';
import HomeCmp from './Home/quotes.home';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Main() {

    return (
        <>
            <ToastContainer autoClose={3000} theme="colored" />
            <Routes>
                <Route path='/' element={[<HeaderCmp key={1} />, <HomeCmp key={2} />]} />
                <Route path='/entry' element={<EntryCmp />} />
            </Routes>
        </>
    )
}
