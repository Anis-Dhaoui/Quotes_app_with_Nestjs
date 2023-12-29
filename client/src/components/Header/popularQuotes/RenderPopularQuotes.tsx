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
  const items = [
    { id: 1, name: 'name1' },
    { id: 2, name: 'name2' },
    { id: 3, name: 'name3' },
    { id: 4, name: 'name4' },
    { id: 5, name: 'name5' },
    { id: 6, name: 'name6' },
    { id: 7, name: 'name7' },
    { id: 8, name: 'name8' },
  ];

  useEffect(() => {
    dispatch(fetchPopularQuotes());
  }, [dispatch])

  console.log(`
    REQ: ${popularQuotesReq} \n
    RES: ${popularQuotesRes?.popularQuotes} \n
    ERR: ${popularQuotesErr}
  `)

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

  // Chunk the items array into groups of 3 to create carousel items
  const chunkedItems = items.reduce((resultArray: any, item: any, index: any) => {
    const chunkIndex = Math.floor(index / 3);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  // Carousel Item Data 
  const carouselItems = chunkedItems.map((chunk: any, item: any) => (
    <CarouselItem
      key={item.id}
      onExited={() => setAnimating(false)}
      onExiting={() => setAnimating(true)}
    >
      <div className="row">
        {
          chunk.map((item: any, index: number) => (
            <div key={index} className="col-md-4 mb-3">
              <div className='card_item'>
                <div className='card_item-head'>
                  <img src={img} alt='img' className='rounded-circle' width={80} height={80} />
                </div>
                <div className='card_item-body'>
                  <p style={{ fontWeight: "bold" }}>{item.name}</p>
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
  ));

  return (
    <div>
      <Carousel
        previous={previousButton}
        next={nextButton}
        activeIndex={activeIndex}
      >
        {carouselItems.length > 0 ? carouselItems : <p>No items to display</p>}
      </Carousel>
    </div>
  )
}





// export default function RenderPopularQuotes() {

//   const dispatch = useAppDispatch();
//   const { popularQuotesReq, popularQuotesRes, popularQuotesErr } = useAppSelector(state => state.quotes);

//   const items = [
//     { id: 1, name: 'name1' },
//     { id: 2, name: 'name2' },
//     { id: 3, name: 'name3' },
//     { id: 4, name: 'name4' },
//     { id: 5, name: 'name5' },
//     { id: 6, name: 'name6' },
//     { id: 7, name: 'name7' },
//     { id: 8, name: 'name8' },
//   ];

//   // Chunk the items array into groups of 3 to create carousel items
//   const chunkedItems = items.reduce((resultArray: any, item: any, index: any) => {
//     const chunkIndex = Math.floor(index / 3);

//     if (!resultArray[chunkIndex]) {
//       resultArray[chunkIndex] = []; // start a new chunk
//     }

//     resultArray[chunkIndex].push(item);
//     return resultArray;
//   }, []);

//   // Map through the chunked items array and generate the carousel items
//   const carouselItems = chunkedItems.map((chunk: any, index: any) => (
//     <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
//       <div className="row">
//         {chunk.map((item: any) => (
//           <div key={index} className="col-md-4 mb-3">
//             <div key={item.id} className='card_item'>
//               <div className='card_item-head'>
//                 <img src={img} alt='img' className='rounded-circle' width={80} height={80} />
//               </div>
//               <div className='card_item-body'>
//                 <p style={{ fontWeight: "bold" }}>{item.author}</p>
//                 <blockquote className="truncate-text" cite={item.author}>{item.quote}</blockquote>
//                 <span style={{ fontSize: "8pt", position: "absolute", bottom: "0", right: "45%", left: "42%", marginBottom: "8px", opacity: "0.6" }}>{item.category}</span>
//               </div>
//               <div style={{ width: "100%", marginTop: "-2px" }}>
//                 {/* <InterractionBtns item={item} /> */}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   ));


//   return (
//     <div className="col-12">
//       <div id="carouselExampleIndicators2" className="carousel slide" data-ride="carousel">
//         <div className="carousel-inner">
//           {carouselItems.length > 0 ? carouselItems : <p>No items to display</p>}
//         </div>
//       </div>
//     </div>
//   );

// }