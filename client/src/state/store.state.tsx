import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook } from 'react-redux'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { registerRed } from './reducers/register.reducers'
import { quoteRed } from './reducers/quotes.reducers'
import { loginRed } from './reducers/login.reducers'


export const store = configureStore({
    reducer: {
        quotes: quoteRed,
        register: registerRed,
        login: loginRed
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector