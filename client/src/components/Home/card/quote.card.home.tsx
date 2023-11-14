import React from 'react'
import './quote-card.css'
import moment from 'moment'
import { likeQuote } from '../../../state/actions-creators/quotes.actions-creators'
import { useAppDispatch, useAppSelector } from '../../../state/store.state'

type quoteProps = {
    loading: boolean,
    quotes?: IQuotesRes,
    error?: string | null
}
export default function RenderQuote(props: quoteProps) {
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector(state => state.login)
    const handleLikeUnlike = (quoteID: any) => {
        dispatch(likeQuote(quoteID))
    }

    const checkLike = (likedBy: any) => {
        return likedBy.includes(user?.user._id)
    }



    const renderQuotes = props.quotes?.quotesData.map((item) => {
        return (
            <div className="col-md-6 col-lg-4" key={item._id}>
                <section className="t-bq-section" id="jasper">
                    <div className="t-bq-wrapper t-bq-wrapper-boxed">
                        <div className="t-bq-quote t-bq-quote-jasper">
                            <div className="row t-bq-quote-jasper-pattern">
                                <div className="col d-flex ml-1 justify-content-start quotation">
                                    &#10077;
                                </div>
                                <div className="col mr-1 d-flex justify-content-end">
                                    <i className="engraved-postedAt">{moment(item.createdAt).fromNow()}</i>
                                </div>
                            </div>

                            <div className="t-bq-quote-jasper-userpic"></div>
                            <div className="row d-flex align-items-end t-bq-quote-jasper-base">
                                <div className="col-12 p-4 justify-content-start">
                                    <blockquote className="truncate-text" cite="Strugatsky Brothers">{item.quote}</blockquote>
                                </div>
                                <div id='card-footer'>
                                    <div className="col-12 p-2 text-center t-bq-quote-jasper-author"><cite> {item.author} </cite></div>
                                    <div className="col-12 text-center t-bq-quote-jasper-source"><span style={{ fontSize: "8pt" }}>{item.category}</span></div>
                                    <div id='interractions-btns' className="row mx-0">
                                        <div className="col-3 d-flex justify-content-center">
                                            {
                                                checkLike(item.likedBy) ?
                                                    <i onClick={() => handleLikeUnlike(item._id)} className="fa-solid fa-heart fa-2x" style={{ color: '#ff0000' }}></i>
                                                    :
                                                    <i onClick={() => handleLikeUnlike(item._id)} className="fa-light fa-heart fa-2x"></i>
                                            }
                                        </div>
                                        <div className="col-3 d-flex justify-content-center"><i className="fa-light fa-comment fa-flip-horizontal fa-2x"></i></div>
                                        <div className="col-3 d-flex justify-content-center"><i className="fa-light fa-paper-plane-top fa-flip-vertical fa-2x"></i></div>
                                        <div className="col-3 d-flex justify-content-center"><i className="fa-light fa-bookmark fa-2x"></i></div>
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
        <div className="row mx-0">
            {renderQuotes}
        </div>
    )
}
