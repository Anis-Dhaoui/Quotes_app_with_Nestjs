interface IQuote {
    _id: string;
    owner: string;
    author: string;
    authorPic: string;
    quote: string;
    category: string;
}

interface IResponse {
    message: string,
    quotesData: IQuote[]
}