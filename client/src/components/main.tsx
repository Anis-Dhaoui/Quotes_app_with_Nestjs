import React from 'react'
import HeaderCmp from './Header/navbar/navbar.Header'
import { Routes, Route } from 'react-router';
import EntryCmp from './Entry/login-register.entry';
import Index from './Home/Index.Home';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Main() {

    return (
        <>
            <ToastContainer autoClose={3000} theme="colored" />
            <Routes>
                <Route path='/' element={[<HeaderCmp key={1} />, <Index key={2} />]} />
                <Route path='/entry' element={<EntryCmp />} />
            </Routes>
        </>
    )
}



{/* <Routes>
    <Route path='/login' element={<LoginPage />} />

    <Route path='/home'
        element={
            <RouteProtector isLoggedIn={isAuthenticated}>
                <RenderComputers />
            </RouteProtector>
        }
    />

    <Route path='/profile'
        element={
            <RouteProtector isLoggedIn={isAuthenticated}>
                <Profile />
            </RouteProtector>
        }
    />

    <Route path='/users_management'
        element={
            <RouteProtector isLoggedIn={isAuthenticated}>
                <UsersManagement />
            </RouteProtector>
        }
    />

    <Route path='*' element={<div>NOT FOUND</div>} />
    <Route path='/' element={<Navigate to="/home" />} />
</Routes> */}