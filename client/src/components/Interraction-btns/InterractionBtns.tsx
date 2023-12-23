import React from 'react'
import './style.interraction-btns.css';
import { useAppDispatch, useAppSelector } from 'state/store.state';
import LikeUnlikeBtns from './LikeUnlikeBtns';

export default function InterractionBtns({ item }: any) {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(state => state.login);

  return (
    <div id='interractions-btns' className="row mx-0 pl-0">
      <LikeUnlikeBtns item={item} user={user} isAuthenticated={isAuthenticated} dispatch={dispatch} />
      <div className="col-3 d-flex justify-content-center"><i className="fa-light fa-comment fa-flip-horizontal fa-2x"></i></div>
      <div className="col-3 d-flex justify-content-center"><i className="fa-light fa-paper-plane-top fa-flip-vertical fa-2x"></i></div>
      <div className="col-3 d-flex justify-content-center"><i className="fa-light fa-bookmark fa-2x"></i></div>
    </div>
  )
}
