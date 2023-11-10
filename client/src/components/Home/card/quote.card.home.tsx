import React from 'react'
import './quote-card.css'
import moment from 'moment'

type quoteProps = {
    loading: boolean,
    quotes?: IQuotesRes,
    error?: string | null
}
export default function RenderQuote(props: quoteProps) {

    const renderQuotes = props.quotes?.quotesData.map((item) => {
        console.log(item)
        return (
            <div className="col-md-6" key={item._id}>
                <section className="t-bq-section" id="jasper">
                    <div className="t-bq-wrapper t-bq-wrapper-boxed">
                        <div className="t-bq-quote t-bq-quote-jasper">
                            <div className="t-bq-quote-jasper-pattern">
                                <div className="t-bq-quote-jasper-qmark">
                                    &#10077;
                                </div>
                            </div>

                            <div className="t-bq-quote-jasper-userpic"></div>
                            <i className="text-muted ml-1">{moment(item.createdAt).fromNow()}</i>
                            {/* <div className="t-bq-quote-jasper-base">
                                <blockquote className="t-bq-quote-jasper-text" cite="Strugatsky Brothers">
                                    {item.quote}
                                </blockquote>
                                <div className="t-bq-quote-jasper-meta">
                                    <div className="t-bq-quote-jasper-meta-info">
                                        <div className="t-bq-quote-jasper-author"><cite> {item.author} </cite></div>
                                        <div className="t-bq-quote-jasper-source"><span>{item.category} </span></div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="row d-flex align-items-end t-bq-quote-jasper-base">
                                <div className="col-12 p-4 justify-content-start">
                                    <blockquote className="truncate-text" cite="Strugatsky Brothers">{item.quote}</blockquote>
                                </div>
                                <div id='card-footer'>
                                    <div className="col-12 p-2 text-center t-bq-quote-jasper-author"><cite> {item.author} </cite></div>
                                    <div className="col-12 text-center t-bq-quote-jasper-source"><span style={{ fontSize: "8pt" }}>{item.category}</span></div>
                                    <div className="row ml-0">
                                        <div className="col-3"><i className='fa fa-heart-o'></i> Like</div>
                                        <div className="col-3"><i className='far fa-comment fa-2x'></i></div>
                                        <div className="col-3">Share</div>
                                        <div className="col-3 align-self-end">Save</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    })

    return (
        <div className="row">
            {renderQuotes}
        </div>
    )
}
