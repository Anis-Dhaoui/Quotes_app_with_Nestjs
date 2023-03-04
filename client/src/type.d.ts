
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



//$$$$$$$$$$$$$$$$$$$$$$$$$$// REGISTER //$$$$$$$$$$$$$$$$$$$$$$$$$$//
interface IRegisterRes {
    statusCode: number,
    message: string,
    error?: string
}

interface IRegisterReqBody {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    interests: string[]
};

//$$$$$$$$$$$$$$$$$$$$$$$$$$// LOGIN //$$$$$$$$$$$$$$$$$$$$$$$$$$//
