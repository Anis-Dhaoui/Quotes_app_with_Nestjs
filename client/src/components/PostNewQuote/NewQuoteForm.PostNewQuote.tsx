import React from "react";
import { useAppSelector } from "state/store.state";
import { Link } from "react-router-dom";
import './style.PostNewQuote.css'

function NewQuoteForm() {
    const { isAuthenticated, user } = useAppSelector(state => state.login)

    return (
        <section id="new-quote-form" className="t-bq-section">
            <div className="t-bq-wrapper t-bq-wrapper-boxed">
                <div className="t-bq-quote t-bq-quote-jasper">
                    <div className="row t-bq-quote-jasper-pattern">
                        <div className="col d-flex ml-1 justify-content-start">
                            <div className="form-timeline-header">
                                <span className="userimage"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="User" /></span>
                                <span className="username" style={{marginTop: "100px"}}>{`${user?.user.firstName} ${user?.user.lastName}`}</span>
                                {/* <span className="pull-right text-muted">18 Views</span> */}
                            </div>
                        </div>
                        {/* <div className="col mr-1 d-flex justify-content-end">
                        <i className="engraved-postedAt">{moment(props.item.createdAt).fromNow()}</i>
                    </div> */}
                    </div>

                    <div className="t-bq-quote-jasper-userpic"></div>

                    <div className="row d-flex align-items-end t-bq-quote-jasper-base">
                        <div className="col-12 p-0 justify-content-start">
                            <textarea id="quote" name="quote" style={{ width: "100%" }} rows={3} placeholder="Type your quote here" />
                        </div>

                        <div id='card-footer'>
                            <div className="col-12 p-2 text-center t-bq-quote-jasper-author">
                                <input type="text" style={{ width: "250px" }} placeholder="Author Name" />
                            </div>
                            <div className="col-12 text-center t-bq-quote-jasper-source">
                                <span style={{ fontSize: "8pt" }}>
                                    <select name="category" id="category" style={{ width: "250px", height: "29px" }}>
                                        <option value="A">AAAAAA</option>
                                        <option value="B">BBBBBB</option>
                                        <option value="C">CCCCCC</option>
                                        <option value="D">DDDDDD</option>
                                        <option value="E">EEEEEE</option>
                                    </select>
                                </span>
                            </div>
                            <div className="row t-bq-quote-jasper-pattern" style={{ height: "50px", marginTop: "17px" }}>
                                <div className="col d-flex ml-1 justify-content-start">
                                    <div className="form-timeline-header">
                                    </div>
                                </div>
                                {
                                    /* <div className="col mr-1 d-flex justify-content-end">
                                            <i className="engraved-postedAt">{moment(props.item.createdAt).fromNow()}</i>
                                        </div> */
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewQuoteForm;
