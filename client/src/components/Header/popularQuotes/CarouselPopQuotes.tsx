import React, { useState } from 'react'
import { Carousel, CarouselItem } from 'reactstrap';
import img from './authorSample.jpg';
import InterractionBtns from 'components/Interraction-btns/InterractionBtns';


export default function CarouselPopQuotes({ data }: any) {
    const [activeIndex, setActiveIndex] = useState(0);
    // eslint-disable-next-line
    const [animating, setAnimating] = useState(false);

    // Chunk the items array into groups of 3 to create carousel items
    const chunkedItems = data.reduce((resultArray: any, item: any, index: number) => {
        const chunkIndex = Math.floor(index / 3);

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);
        return resultArray;
    }, []);

    // Items array length 
    const itemLength = chunkedItems?.length - 1

    // Previous button for Carousel 
    const previousButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1;
        setActiveIndex(nextIndex);
    }
    // Next button for Carousel 
    const nextButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    // Carousel Item Data 
    const carouselItems = chunkedItems.map((chunk: any, index: number) => (
        <CarouselItem
            key={index}
        >
            <div className="row">
                {
                    chunk.map((item: any, index: number) => (
                        <div key={item._id} className="col-md-4 mb-3">
                            <div className='card_item'>
                                <div className='card_item-head'>
                                    <img src={img} alt='img' className='rounded-circle' width={80} height={80} />
                                </div>
                                <div className='card_item-body'>
                                    <p style={{ fontWeight: "bold" }}>{item.author}</p>
                                    <blockquote className="truncate-text" cite={item.author}>{item.quote}</blockquote>
                                    <span style={{ fontSize: "8pt", position: "absolute", bottom: "0", right: "45%", left: "42%", marginBottom: "8px", opacity: "0.6" }}>{item.category}</span>
                                </div>
                                <div className='disabled' style={{ width: "100%", marginTop: "-2px" }}>
                                    <InterractionBtns item={item} />
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
                interval={2000}
            >
                {carouselItems}
            </Carousel>
        </div>
    )
}
