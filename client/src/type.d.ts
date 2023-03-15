
interface IQuote {
    _id: string;
    owner: string;
    author: string;
    authorPic: string;
    quote: string;
    category: string;
}

interface IQuotesRes {
    message: string,
    quotesData: IQuote[]
}

//$$$$$$$$$$$$$$$$$$$$$$$$$$// REGISTER //$$$$$$$$$$$$$$$$$$$$$$$$$$//
interface IRegisterRes {
    statusCode: number,
    message: string,
    error?: string
}

interface IRegisterReq {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    interests: string[]
};

//$$$$$$$$$$$$$$$$$$$$$$$$$$// LOGIN //$$$$$$$$$$$$$$$$$$$$$$$$$$//
interface ILoginRes {
    user: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        userPic: string,
        interests: string[],
        role: string,
    }
    access_token: string
}

interface ILoginReq {
    email: string,
    password: string
}