import { Document, ObjectId } from 'mongoose';
import { INTERESTS } from 'src/users/schema/interests.enum';

export interface IQuote extends Document {
    readonly owner: ObjectId;
    readonly author: string;
    readonly authorPic: string;
    readonly quote: string;
    readonly category: INTERESTS;
}