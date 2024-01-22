import React, { useEffect } from 'react'
import './style.popularQuotes.scss';
import { useAppDispatch, useAppSelector } from 'state/store.state';
import { fetchPopularQuotes } from 'state/actions-creators/quotes.actions-creators';
import Loader from 'shared/loader/loader';
import CarouselPopQuotes from './CarouselPopQuotes';

export default function RenderPopularQuotes() {

  const dispatch = useAppDispatch();
  const { popularQuotesReq, popularQuotesRes, popularQuotesErr } = useAppSelector(state => state.quotes);

  useEffect(() => {
    dispatch(fetchPopularQuotes());
  }, [dispatch])

  if (popularQuotesReq) {
    return <Loader />
  }

  if (popularQuotesErr) {
    return (
      <div className="alert alert-danger my-5 mx-5" role="alert">
        {popularQuotesErr}
      </div>
    )
  }

  if (popularQuotesRes) {
    return (
      <CarouselPopQuotes data={popularQuotesRes?.popularQuotes} />
    )
  }

  return (
    <div className="alert alert-danger my-5 mx-5" role="alert">
      Oops! could not fetch popular quotes
    </div>
  )
}