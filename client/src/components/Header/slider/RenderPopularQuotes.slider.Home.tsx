import React, { useEffect } from 'react'
import './style.slider.css';
import { useAppDispatch, useAppSelector } from 'state/store.state';
import { fetchPopularQuotes } from 'state/actions-creators/quotes.actions-creators';

export default function RenderPopularQuotes() {

  const dispatch = useAppDispatch();
  const { popularQuotesReq, popularQuotesRes, popularQuotesErr } = useAppSelector(state => state.quotes);

  useEffect(() => {
    dispatch(fetchPopularQuotes());
  }, [dispatch])

  console.log(popularQuotesRes?.popularQuotes)

  return (
    <div className='wrapper'>
      <div className='carousel'>
        <div className='carousel__item'>
          <div className='carousel__item-head'>
            1
          </div>
          <div className='carousel__item-body'>
            <p>Carousel item 1</p>
            <p>Eiusmod tempor incididunt ut labore et dolore</p>
          </div>
        </div>
        <div className='carousel__item'>
          <div className='carousel__item-head'>
            2
          </div>
          <div className='carousel__item-body'>
            <p>Carousel item 2</p>
            <p>Eiusmod tempor incididunt ut labore et dolore</p>
          </div>
        </div>
        <div className='carousel__item'>
          <div className='carousel__item-head'>
            3
          </div>
          <div className='carousel__item-body'>
            <p>Carousel item 3</p>
            <p>Eiusmod tempor incididunt ut labore et dolore</p>
          </div>
        </div>
        <div className='carousel__item'>
          <div className='carousel__item-head'>
            4
          </div>
          <div className='carousel__item-body'>
            <p>Carousel item 4</p>
            <p>Eiusmod tempor incididunt ut labore et dolore</p>
          </div>
        </div>
        <div className='carousel__item'>
          <div className='carousel__item-head'>
            5
          </div>
          <div className='carousel__item-body'>
            <p>Carousel item 5</p>
            <p>Eiusmod tempor incididunt ut labore et dolore</p>
          </div>
        </div>
        <div className='carousel__item'>
          <div className='carousel__item-head'>
            6
          </div>
          <div className='carousel__item-body'>
            <p>Carousel item 6</p>
            <p>Eiusmod tempor incididunt ut labore et dolore</p>
          </div>
        </div>
      </div>
    </div>

  )
}
