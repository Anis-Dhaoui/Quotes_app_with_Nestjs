import React from 'react'
import './quote-card.css'

type quoteProps = {
    loading: boolean,
    quotes?: IQuotesRes,
    error?: string | null
}
export default function RenderQuote(props: quoteProps) {

    const renderQuotes = props.quotes?.quotesData.map((item) => {
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

                            <div className="t-bq-quote-jasper-base">
                                <blockquote className="t-bq-quote-jasper-text" cite="Strugatsky Brothers">
                                    He was neat by nature and could not stand any disorder. Maybe that's why, when he got drunk and lost his human form, he always made such a disgusting mess.
                                </blockquote>
                                <div className="t-bq-quote-jasper-meta">
                                    <div className="t-bq-quote-jasper-meta-info">
                                        <div className="t-bq-quote-jasper-author"><cite>Strugatsky Brothers</cite></div>
                                        <div className="t-bq-quote-jasper-source"><span>The Powerless of This World </span></div>
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
