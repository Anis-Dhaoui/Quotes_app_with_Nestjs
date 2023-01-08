import { Document } from 'mongoose';
export interface IQuote extends Document {
    readonly author: string;
    readonly authorPic: string;
    readonly quote: string;
    readonly category: string;
}