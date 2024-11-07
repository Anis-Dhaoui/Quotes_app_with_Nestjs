import React from 'react'
import { Routes, Route, Navigate } from 'react-router';
import EntryCmp from './Entry/login-register.entry';
import Index from './Home/Index.Home';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import HeaderCmp from './Header/HeaderCmp';
import Profile from './Profile/Profile.Profile';
import RouteProtector from './RouteProtector';
import { useAppSelector } from 'state/store.state';
import NavbarCmp from './Header/navbar/NavbarCmp';

export default function Main() {

    const { isAuthenticated } = useAppSelector(state => state.login)

    return (
        <>
        <ToastContainer autoClose={3000} theme="colored" />
            {/* eslint-disable-next-line no-lone-blocks */}
            <Routes>
                <Route path='/home' element={[<HeaderCmp key={1} />, <Index key={2} />]} />
                <Route path='/entry' element={<EntryCmp />} />
                <Route path='/profile'
                    element={
                        <RouteProtector isLoggedIn={isAuthenticated}>
                            <NavbarCmp key={1} /> <Profile key={2} />
                        </RouteProtector>
                    }
                />

                <Route path='*' element={<div>NOT FOUND</div>} />
                <Route path='/' element={<Navigate to="/home" />} />
            </Routes>
        </>
    )
}