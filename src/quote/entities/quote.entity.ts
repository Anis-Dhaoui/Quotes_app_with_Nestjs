import { Document, ObjectId } from 'mongoose';

export interface IQuote extends Document {
    readonly owner: ObjectId;
    readonly author: string;
    readonly authorPic: string;
    readonly quote: string;
    readonly category: string;
}