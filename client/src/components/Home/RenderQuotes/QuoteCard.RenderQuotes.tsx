import React from "react";
import InterractionBtns from 'components/Interraction-btns/InterractionBtns'
import moment from 'moment'

function QuoteCard(props: any) {
    return (
        <section className="t-bq-section" id="jasper">
            <div className="t-bq-wrapper t-bq-wrapper-boxed">
                <div className="t-bq-quote t-bq-quote-jasper">
                    <div className="row t-bq-quote-jasper-pattern">
                        <div className="col d-flex ml-1 justify-content-start quotation">
                            <div className="timeline-header">
                                <span className="userimage"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="User" /></span>
                                <span className="username"><a href="#">{`Anis Dhaoui`}</a> <small></small></span>
                                {/* <span className="pull-right text-muted">18 Views</span> */}
                            </div>
                        </div>
                        <div className="col mr-1 d-flex justify-content-end">
                            <i className="engraved-postedAt">{moment(props.item.createdAt).fromNow()}</i>
                        </div>
                    </div>

                    <div className="t-bq-quote-jasper-userpic"></div>

                    <div className="row d-flex align-items-end t-bq-quote-jasper-base">
                        <div className="col-12 p-4 justify-content-start">
                            <blockquote className="truncate-text" cite={props.item.author}>{props.item.quote}</blockquote>
                        </div>

                        <div id='card-footer'>
                            <div className="col-12 p-2 text-center t-bq-quote-jasper-author"><cite> {props.item.author} </cite></div>
                            <div className="col-12 text-center t-bq-quote-jasper-source"><span style={{ fontSize: "8pt" }}>{props.item.category}</span></div>
                            <InterractionBtns item={props.item} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default QuoteCard;
