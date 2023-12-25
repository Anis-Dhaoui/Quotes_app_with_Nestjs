import React, { useEffect } from 'react'
import './style.popularQuotes.scss';
import { useAppDispatch, useAppSelector } from 'state/store.state';
import { fetchPopularQuotes } from 'state/actions-creators/quotes.actions-creators';
import Loader from 'shared/loader/loader';
import img from './authorSample.jpg';
import InterractionBtns from 'components/Interraction-btns/InterractionBtns';

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


  const popularQuotesList = popularQuotesRes?.popularQuotes.map((item: any) => {
    return (
      <div key={item._id} className='carousel__item active'>
        <div className='carousel__item-head'>
          <img src={img} alt='img' className='rounded-circle' width={80} height={80} />
        </div>
        <div className='carousel__item-body'>
          <p style={{ fontWeight: "bold" }}>{item.author}</p>
          <blockquote className="truncate-text" cite={item.author}>{item.quote}</blockquote>
          <span style={{ fontSize: "8pt", position: "absolute", bottom: "0", right: "45%", left: "42%", marginBottom: "8px", opacity: "0.6" }}>{item.category}</span>
        </div>
        <div style={{ width: "100%", marginTop: "-2px" }}>
          <InterractionBtns item={item} />
        </div>
      </div>
    )
  })
  return (
    <div className='wrapper'>
      <div className='carousel'>
        {popularQuotesList}
      </div>
    </div>

  )
}
