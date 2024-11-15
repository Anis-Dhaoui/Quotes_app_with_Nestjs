import React from 'react'
import QuoteCard from './QuoteCard.RenderQuotes'



type quoteProps = {
    loading: boolean,
    quotes?: any,
    error?: string | null
}
export default function RenderQuotes(props: quoteProps) {

    const renderQuotes = props.quotes?.quotesData?.map((item: any) => {
        return (
            <div className="col-md-6 col-lg-4" key={item._id}>
                <QuoteCard item={item} />
            </div>
        )
    })

    return (
        <div className="row mx-0">
            {renderQuotes}
        </div>
    )
}
