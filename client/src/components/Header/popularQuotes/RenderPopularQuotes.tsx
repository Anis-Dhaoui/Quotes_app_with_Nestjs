import React, { useEffect } from 'react'
import './style.popularQuotes.scss';
import { useAppDispatch, useAppSelector } from 'state/store.state';
import { fetchPopularQuotes } from 'state/actions-creators/quotes.actions-creators';
import Loader from 'shared/loader/loader';
import img from './authorSample.jpg';
import InterractionBtns from 'components/Interraction-btns/InterractionBtns';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

export default function RenderPopularQuotes() {

  const dispatch = useAppDispatch();
  const { popularQuotesReq, popularQuotesRes, popularQuotesErr } = useAppSelector(state => state.quotes);

  useEffect(() => {
    dispatch(fetchPopularQuotes());
  }, [dispatch])

  console.log(popularQuotesRes)

  // State for Active index 
  const [activeIndex, setActiveIndex] = React.useState(0);

  // State for Animation 
  const [animating, setAnimating] = React.useState(false);

  // Items array length 
  const itemLength = popularQuotesRes?.popularQuotes.length - 1

  // Previous button for Carousel 
  const previousButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ?
      itemLength : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  // Next button for Carousel 
  const nextButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === itemLength ?
      0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  // Carousel Item Data 
  const carouselItemData = popularQuotesRes?.popularQuotes.map((item: any) => {
    return (
      <CarouselItem
        key={"item.src"}
        onExited={() => setAnimating(false)}
        onExiting={() => setAnimating(true)}
      >
        <div className="row">
          {
            [...Array(3)].map((_, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div key={"item._id"} className='card_item'>
                  <div className='card_item-head'>
                    <img src={img} alt='img' className='rounded-circle' width={80} height={80} />
                  </div>
                  <div className='card_item-body'>
                    <p style={{ fontWeight: "bold" }}>{"item.author"}</p>
                    <blockquote className="truncate-text" cite={"item.author"}>{"item.quote"}</blockquote>
                    <span style={{ fontSize: "8pt", position: "absolute", bottom: "0", right: "45%", left: "42%", marginBottom: "8px", opacity: "0.6" }}>{"item.category"}</span>
                  </div>
                  <div style={{ width: "100%", marginTop: "-2px" }}>
                    {/* <InterractionBtns item={item} /> */}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </CarouselItem>
    );
  });

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


  // const popularQuotesList = popularQuotesRes?.popularQuotes.map((item: any) => {
  const popularQuotesList = () => {
    return (

      <div>
        <Carousel
          previous={previousButton}
          next={nextButton}
          activeIndex={activeIndex}
        >
          {/* <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={(newIndex) => {
              if (animating) return;
              setActiveIndex(newIndex);
            }}
          /> */}
          {carouselItemData}
        </Carousel>
      </div>
    )
  }

  return (
    <>
      {popularQuotesList}
    </>
    // <div className='wrapper'>
    //   <div className='carousel'>
    //     {popularQuotesList()}
    //   </div>
    // </div>

  )
}
