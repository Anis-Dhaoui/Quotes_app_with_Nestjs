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

  // State for Active index 
  const [activeIndex, setActiveIndex] = React.useState(0);

  // State for Animation 
  const [animating, setAnimating] = React.useState(false);

  // Sample items for Carousel 
  const items = [
    {
      src: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190603152813/ml_gaming.png',
    },
    {
      src: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190528184201/gateexam.png',
    },
    {
      src: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190603152813/ml_gaming.png',
    },
    {
      src: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190528184201/gateexam.png',
    },
    {
      src: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190603152813/ml_gaming.png',
    },
    {
      src: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190528184201/gateexam.png',
    }
  ];

  // Items array length 
  const itemLength = items.length - 1

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
  const carouselItemData = items.map((item) => {
    return (
      <CarouselItem
        key={item.src}
        onExited={() => setAnimating(false)}
        onExiting={() => setAnimating(true)}
      >
        <div className="row">
          <div className="col-md-4 mb-3">
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
        </div>
      </CarouselItem>
    );
  });

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

<<<<<<< HEAD
  const popularQuotesList = popularQuotesRes?.popularQuotes.map((item: any, index: number) => {
    return (
      <div id={item._id} key={item._id} className='carousel__item'>
          <div className='carousel__item-head'>
            <img src={img} alt='img' className='rounded-circle' width={80} height={80} />
          </div>
          <div className='carousel__item-body'>
            <p style={{ fontWeight: "bold" }}>{item.author}</p>
            <blockquote className="truncate-text" cite={item.author}>{item.quote}</blockquote>
            <span style={{ fontSize: "8pt", position: "absolute", bottom: "0", right: "45%", left: "42%", marginBottom: "8px", opacity: "0.6" }}>{item.category}</span>
          </div>
          <div style={{ width: "100%", marginTop: "-4px" }}>
            <InterractionBtns item={item} />
          </div>
=======

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
>>>>>>> d38fc01518a1ff9855e806eb04a7cbf88a0c130b
      </div>






















      // <div key={item._id} className='carousel__item active'>
      //   <div className='carousel__item-head'>
      //     <img src={img} alt='img' className='rounded-circle' width={80} height={80} />
      //   </div>
      //   <div className='carousel__item-body'>
      //     <p style={{ fontWeight: "bold" }}>{item.author}</p>
      //     <blockquote className="truncate-text" cite={item.author}>{item.quote}</blockquote>
      //     <span style={{ fontSize: "8pt", position: "absolute", bottom: "0", right: "45%", left: "42%", marginBottom: "8px", opacity: "0.6" }}>{item.category}</span>
      //   </div>
      //   <div style={{ width: "100%", marginTop: "-2px" }}>
      // <InterractionBtns item={item} />
      //   </div>
      // </div>

      // <section className="pt-5 pb-5">
      //   <div className="container">
      //     <div className="row">
      //       <div className="col-12">
      //         <div id="carouselExampleIndicators2" className="carousel slide" data-ride="carousel">
      //           <div className="carousel-inner">
      //             <div className="carousel-item active">
      //               <div className="row">

      //                 <div className="col-md-4 mb-3">
      //                   <div className="card">
      //                     <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1532781914607-2031eca2f00d?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=7c625ea379640da3ef2e24f20df7ce8d" />
      //                     <div className="card-body">
      //                       <h4 className="card-title">Special title treatment</h4>
      //                       <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>

      //                     </div>

      //                   </div>
      //                 </div>

      //                 <div className="col-md-4 mb-3">
      //                   <div className="card">
      //                     <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=42b2d9ae6feb9c4ff98b9133addfb698" />
      //                     <div className="card-body">
      //                       <h4 className="card-title">Special title treatment</h4>
      //                       <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>

      //                     </div>
      //                   </div>
      //                 </div>

      //                 <div className="col-md-4 mb-3">
      //                   <div className="card">
      //                     <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=3d2e8a2039c06dd26db977fe6ac6186a" />
      //                     <div className="card-body">
      //                       <h4 className="card-title">Special title treatment</h4>
      //                       <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>

      //                     </div>
      //                   </div>
      //                 </div>

      //               </div>
      //             </div>
      //             <div className="carousel-item">
      //               <div className="row">

      //                 <div className="col-md-4 mb-3">
      //                   <div className="card">
      //                     <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1532771098148-525cefe10c23?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=3f317c1f7a16116dec454fbc267dd8e4" />
      //                     <div className="card-body">
      //                       <h4 className="card-title">Special title treatment</h4>
      //                       <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>

      //                     </div>

      //                   </div>
      //                 </div>
      //                 <div className="col-md-4 mb-3">
      //                   <div className="card">
      //                     <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1532715088550-62f09305f765?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ebadb044b374504ef8e81bdec4d0e840" />
      //                     <div className="card-body">
      //                       <h4 className="card-title">Special title treatment</h4>
      //                       <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>

      //                     </div>
      //                   </div>
      //                 </div>
      //                 <div className="col-md-4 mb-3">
      //                   <div className="card">
      //                     <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=0754ab085804ae8a3b562548e6b4aa2e" />
      //                     <div className="card-body">
      //                       <h4 className="card-title">Special title treatment</h4>
      //                       <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>

      //                     </div>
      //                   </div>
      //                 </div>

      //               </div>
      //             </div>
      //             <div className="carousel-item">
      //               <div className="row">

      //                 <div className="col-md-4 mb-3">
      //                   <div className="card">
      //                     <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23" />
      //                     <div className="card-body">
      //                       <h4 className="card-title">Special title treatment</h4>
      //                       <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>

      //                     </div>

      //                   </div>
      //                 </div>
      //                 <div className="col-md-4 mb-3">
      //                   <div className="card">
      //                     <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1532777946373-b6783242f211?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=8ac55cf3a68785643998730839663129" />
      //                     <div className="card-body">
      //                       <h4 className="card-title">Special title treatment</h4>
      //                       <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>

      //                     </div>
      //                   </div>
      //                 </div>
      //                 <div className="col-md-4 mb-3">
      //                   <div className="card">
      //                     <img className="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1532763303805-529d595877c5?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=5ee4fd5d19b40f93eadb21871757eda6" />
      //                     <div className="card-body">
      //                       <h4 className="card-title">Special title treatment</h4>
      //                       <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
      //                     </div>
      //                   </div>
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </section>
    )
  }

  return (
    <>
      {popularQuotesList()}
    </>
    // <div className='wrapper'>
    //   <div className='carousel'>
    //     {popularQuotesList()}
    //   </div>
    // </div>

  )
}
